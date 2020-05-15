import React, { Component } from 'react';
import './App.css'
import Set from './Set'
import ExerciseSelection from './ExerciseSelection'
import AthleteSelection from './AthleteSelection'
import WorkoutSelection from './WorkoutSelection'
import { Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import SingleDateSelector from './SingleDateSelector'
import RangeDateSelector from './RangeDateSelector'
import RecurringDateSelector from './RecurringDateSelector'
import ExerciseName from './ExerciseName'
import Workouts from './data/Workouts.js'
import Exercises from './data/Exercises.js'
import Athletes from './data/Athletes.js'
import About from './About'
import uuid from 'react-uuid'
import config from './config'
const API_URL=config.API_URL

class App extends Component {

  constructor() {
    super()
    this.state = 
        {
          //data
          athletes: [],
          workouts: [],
          ex_selector: [],

          //workout
          workout_selection_type: 'select',
          workout_name: '',
          selected_workout_id: '',
          sets: [],

          //athlete
          assign_athlete_type: 'select',
          selected_athlete_firstname: '',
          selected_athlete_lastname: '',
          selected_athlete_id: '',

          //exercises
          add_exercise_type: 'select',
          ex_name: 'EXERCISE NAME',
          selected_exercise_type_id: '',
          rep_type: 'TO FAILURE',
          reps: 1,
          weight: '',
          sub_distance: '',
          tempo_unit: '',
          tempo_time: '',
          subrest_unit: '',
          subrest_time: '',
          rest_unit: '',
          rest_time: '',

          //dates
          month_start: 'January',
          day_start: '1',
          year_start: '2020',
          month_end: 'January',
          day_end: '1',
          year_end: '2020',
          recurrance: 1,
          workout_dates: [new Date(2020, 0, 1)]
        }
    this.deleteSet = this.deleteSet.bind(this)
    this.moveSet = this.moveSet.bind(this)
    this.addSets = this.addSets.bind(this)
    this.changeAthleteAssignmentType = this.changeAthleteAssignmentType.bind(this)
    this.changeWorkoutType = this.changeWorkoutType.bind(this)
    this.updateSets = this.updateSets.bind(this)
    this.changeAthleteId = this.changeAthleteId.bind(this)
    this.assignWorkout = this.assignWorkout.bind(this)
  }

  componentDidMount() {
    this.setState({athletes: Athletes})
      //GET from table 'athletes' --> id, first_name, last_name
    this.setState({workouts: Workouts})
      //GET from table 'workouts' --> id, wkt_name, sets
        //'sets' references records from table 'sets' --> id, exercise_id, set_num, sub_distance, subrest_time, tempo_time, weight
          //'exercise_id' references table 'exercises' --> id, name
    this.setState({ex_selector: Exercises})
  }

  updateSets(workoutId) {

    let updatedSets = []
    let workoutName = []

    this.state.workouts.map(workout => {
      if (workout.id == workoutId) {
        workoutName.push(workout.name)
        workout.sets.map(set => {
          updatedSets.push(set)
        })
      }
    })
    this.setState({
      sets: updatedSets,
      workout_name: workoutName[0],
      selected_workout_id: workoutId
    })

  }

  deleteSet(setId) {
    let updatedSets = []
    this.state.sets.map(set => {
      if (this.state.sets.indexOf(set) !== setId) {
        updatedSets.push(set)
      }
    })
    this.setState({
      sets: updatedSets,
      workout_selection_type: 'create'
    })
  }

  addSets(setId, targetSet, numberOfSets) {
    let updatedSets = []
    this.state.sets.map(set => {
      if (this.state.sets.indexOf(set) !== setId) {
        updatedSets.push(set)
      }
      if (this.state.sets.indexOf(set) === setId) {
        updatedSets.push(
          {
            exercise_type_id: targetSet.exercise_type_id,
            rep_type: targetSet.rep_type,
            reps: targetSet.reps,
            weight: targetSet.weight,
            sub_distance: targetSet.sub_distance,
            tempo_time: targetSet.tempo_time,
            subrest_time: targetSet.subrest_time,
            rest_time: targetSet.rest_time,
            set_num: numberOfSets
          }
        )
      }
    })
    this.setState({
      sets: updatedSets,
      workout_selection_type: 'create',
      selected_workout_id: uuid()
    })
  }

  moveSet(setId, indexEdit) {
    let previousSets = []
    let subsSets = []
    
    if (indexEdit === -1) {
      this.state.sets.map(set => {
        if (this.state.sets.indexOf(set) < setId - 1) {
          previousSets.push(set)
        }
        if (this.state.sets.indexOf(set) === setId - 1) {
          subsSets.push(set)
        }
        if (this.state.sets.indexOf(set) === setId) {
          previousSets.push(set)
        }
        if (this.state.sets.indexOf(set) > setId) {
          subsSets.push(set)
        }
      })
    }

    if (indexEdit === 1) {
      this.state.sets.map(set => {
        if (this.state.sets.indexOf(set) < setId) {
          previousSets.push(set)
        }
        if (this.state.sets.indexOf(set) === setId) {
          subsSets.push(set)
        }
        if (this.state.sets.indexOf(set) === setId + 1) {
          previousSets.push(set)
        }
        if (this.state.sets.indexOf(set) > setId + 1) {
          subsSets.push(set)
        }
      })
    }

    let updatedSets = []
    previousSets.map(set => { updatedSets.push(set) })
    subsSets.map(set => { updatedSets.push(set) })

    this.setState({
      sets: updatedSets,
      workout_selection_type: 'create',
      selected_workout_id: uuid()
    })

  }

  changeAthleteAssignmentType(type) {
  
    if (type === 'create') {
      this.setState({
        assign_athlete_type: type,
        selected_athlete_firstname: '',
        selected_athlete_lastname: '',
        selected_athlete_id: uuid(),
      })
    }

    if (type === 'select')
      this.setState({
        assign_athlete_type: type,
        selected_athlete_firstname: '',
        selected_athlete_lastname: '',
        selected_athlete_id: ''
      })
    
  }

  changeWorkoutType(type) {
    console.log(type)
    if (type === 'select') {
      this.setState({
        sets: [],
        workout_selection_type: type,
        selected_workout_id: '',
        workout_name: ''
         })
    }
    if (type === 'create') {
      this.setState({
        sets: [],
        workout_selection_type: type,
        selected_workout_id: uuid(),
        workout_name: ''
      })
    }
  }

  //POST new exercise if in 'create' mode
  submitNewExercise() {
    if (this.state.add_exercise_type === 'create') {
      if (!this.state.ex_name) {
        return alert('No exercise specified!')
      } else {
        console.log('new exercise type created')
        let newExerciseType = {
          exercise_type_id: this.state.selected_exercise_type_id,
          ex_name: this.state.ex_name
        }
        this.setState({
          ex_selector: [...this.state.ex_selector, newExerciseType],

        }, 
          this.setState({ add_exercise_type: 'select', selected_exercise_type_id: '', workout_selection_type: 'create'}) 
          )
        this.convertTempoToSec()
      }
    } else {this.convertTempoToSec()}
  }

  convertTempoToSec() {
    if (!this.state.tempo_unit || this.state.tempo_unit === 'Sec') {
      let tempoMultiplier = 1
      this.convertSubrestToSec(tempoMultiplier)
    }
    if (this.state.tempo_unit === 'Minute') {
      let tempoMultiplier = 60
      this.convertSubrestToSec(tempoMultiplier)
    }
    if (this.state.tempo_unit === 'Hour') {
      let tempoMultiplier = 360
      this.convertSubrestToSec(tempoMultiplier)
    }
  }

  convertSubrestToSec(tempoMultiplier) {
    if (!this.state.subrest_unit || this.state.subrest_unit === 'Sec') {
      let subrestMultiplier = 1
      this.convertRestToSec(tempoMultiplier, subrestMultiplier)
    }
    if (this.state.subrest_unit === 'Minute') {
      let subrestMultiplier = 60
      this.convertRestToSec(tempoMultiplier, subrestMultiplier)
    }
    if (this.state.subrest_unit === 'Hour') {
      let subrestMultiplier = 360
      this.convertRestToSec(tempoMultiplier, subrestMultiplier)
    }
  }

  convertRestToSec(tempoMultiplier, subrestMultiplier) {
    if (!this.state.rest_unit || this.state.rest_unit == 'Sec') {
      let set =
        {
          exercise_type_id: this.state.selected_exercise_type_id,
          rep_type: this.state.rep_type,
          reps: this.state.reps,
          weight: this.state.weight,
          sub_distance: this.state.sub_distance,
          tempo_time: this.state.tempo_time * tempoMultiplier,
          subrest_time: this.state.subrest_time * subrestMultiplier,
          rest_time: this.state.rest_time,
          set_num: 1
        }
      this.setState({
        sets: [...this.state.sets, set],
        ex_name: '',
        selected_exercise_id: '',
        rep_type: 'TO FAILURE',
        reps: 1,
        weight: '',
        sub_distance: '',
        tempo_unit: '',
        tempo_time: '',
        subrest_unit: '',
        subrest_time: '',
        rest_unit: '',
        rest_time: ''
      })
    }

    if (this.state.rest_unit == 'Minute') {
      let set =
        {
          exercise_type_id: this.state.selected_exercise_type_id,
          rep_type: this.state.rep_type,
          reps: this.state.reps,
          weight: this.state.weight,
          sub_distance: this.state.sub_distance,
          tempo_time: this.state.tempo_time * tempoMultiplier,
          subrest_time: this.state.subrest_time * subrestMultiplier,
          rest_time: this.state.rest_time*60,
          set_num: 1
        }
      this.setState({
        sets: [...this.state.sets, set],
        ex_name: '',
        selected_exercise_id: '',
        rep_type: 'TO FAILURE',
        reps: 1,
        weight: '',
        sub_distance: '',
        tempo_unit: '',
        tempo_time: '',
        subrest_unit: '',
        subrest_time: '',
        rest_unit: '',
        rest_time: ''
      })
    }
    if (this.state.rest_unit == 'Hour') {
      let set = 
        {
          exercise_type_id: this.state.selected_exercise_type_id,
          rep_type: this.state.rep_type,
          reps: this.state.reps,
          weight: this.state.weight,
          sub_distance: this.state.sub_distance,
          tempo_time: this.state.tempo_time * tempoMultiplier,
          subrest_time: this.state.subrest_time * subrestMultiplier,
          rest_time: this.state.rest_time*360,
          set_num: 1
        }
      this.setState({
        sets: [...this.state.sets, set],
        ex_name: '',
        selected_exercise_id: '',
        rep_type: 'TO FAILURE',
        reps: 1,
        weight: '',
        sub_distance: '',
        tempo_unit: '',
        tempo_time: '',
        subrest_unit: '',
        subrest_time: '',
        rest_unit: '',
        rest_time: ''
      })
    }
  }

  handleSingleDate = (startProp, endProp, value) => {
    this.setState({
      workout_dates: [],
      [startProp]: value,
      [endProp]: value,
      recurrance: 1
    }, () => {
      this.recurrance()
    })
  }

  handleRangeDate = (dateProp, value) => {
    this.setState({
      workout_dates: [],
      [dateProp]: value,
      recurrance: 1
    }, () => {
      this.recurrance()
    })
  }

  handleRecurringDate = (dateProp, value) => {
    this.setState({
      workout_dates: [],
      [dateProp]: value
    }, () => {
      this.recurrance()
    })
  }

  setRecurrance = (startProp, value) => {
    this.setState({workout_dates: []})
    this.setState({
      [startProp]: value,
    }, () => {
      this.recurrance()
    })
  }

  recurrance() {
    
    const Months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    let startDate = new Date(
                          this.state.year_start, 
                          Months.indexOf(this.state.month_start), 
                          this.state.day_start)

    let endDate = new Date(
                        this.state.year_end, 
                        Months.indexOf(this.state.month_end), 
                        this.state.day_end)

    let dateCount = (endDate.getTime() - startDate.getTime())/(1000*60*60*24)
    
    let dates = [];
    if (startDate === endDate) {
      dates.push(startDate)
    } else {

        //Create array of all dates in range
        let dateRange = []
        for (let i = 0; i <= dateCount; i++) {
          let start = new Date(this.state.year_start, Months.indexOf(this.state.month_start), this.state.day_start) 
          let current = new Date(start.setDate(start.getDate() + i))
          dateRange.push(current)
        }

        //Create array of all dates in recurrance
        let workoutDates = []
        for (let i = 0; i <= dateRange.length; i+=this.state.recurrance) {
            workoutDates.push(dateRange[i])
        }

        let filteredWorkoutDates = workoutDates.filter(function(x) {
          return x !== undefined;
        })

        this.setState({workout_dates: filteredWorkoutDates})

      }
  }

  changeAthleteId(id, firstName, lastName) {
    this.setState({
      selected_athlete_id: id,
      selected_athlete_firstname: firstName,
      selected_athlete_lastname: lastName
    })
  }

  assignWorkout() {
    console.log('assignWorkout listening')

    if (this.state.workout_dates.length == 0) {
      alert('No workout dates selected!')
      return
    }

    //if new athlete, add athlete to database

    let newAthletePost = []
    if (this.state.assign_athlete_type === 'create') {
      if (
        !this.state.selected_athlete_firstname ||
        !this.state.selected_athlete_lastname ) {
        return alert('Athlete first and last name required!')
      } else { 
        let newAthlete = {
          id: this.state.selected_athlete_id,
          first_name: this.state.selected_athlete_firstname,
          last_name: this.state.selected_athlete_lastname
        }
        //POST new athlete to database
        newAthletePost.push(newAthlete)
      }
    }

    //if new workout, add workout to database

    let newWorkoutPost = []
    if (this.state.workout_selection_type === 'create') {
      if (!this.state.workout_name) {
        return alert('No workout specified!')
      } else { 
        let newWorkoutType = {
          id: this.state.selected_workout_id,
          workout_name: this.state.workout_name
        }
        this.setState({
          selected_workout_id: newWorkoutType.id
        }, () => newWorkoutPost.push(newWorkoutType))
      }
    }

    //map over sets (exercises), and add each to database
    
    let newExercises = []
    let newJoinEntries = []
    if (!this.state.sets) {
      return alert('No exercise specified!')
    } else {
      this.state.sets.map(set => {

        let exercise = {
          id: uuid(),
          exercise_type: set.exercise_type_id,
          rep_type: set.rep_type,
          reps: set.reps,
          resistance: set.weight,
          sub_distance: set.sub_distance,
          tempo: set.tempo_time,
          subrest: set.subrest_time,
          rest: set.rest_time,
          set_num: set.set_num,
          order: this.state.sets.indexOf(set)
        }
        newExercises.push(exercise)
        
        let joinEntry = {
          id: uuid(),
          workouts_id: this.state.selected_workout_id,
          exercises_id: exercise.id
        }
        newJoinEntries.push(joinEntry)

      })
    }

    //map over workout dates and copy over workout id


    this.state.workout_dates.map(workoutDate => {
      if ((workoutDate.getTime() - new Date().getTime) < 0) {
        return alert('One or more of your date assignments is in the past!')
      }
    })

    let newAssignments = []
    this.state.workout_dates.map(workoutDate => {

      if ((workoutDate.getTime() - new Date()) < 0) {
        alert('One or more of your assignment dates is in the past!')
        return
      }

      let assignment = {
        id: uuid(),
        date_assigned: new Date(),
        perform_on_date: workoutDate,
        athlete_id: this.state.selected_athlete_id,
        workouts_id: this.state.selected_workout_id
      }
      newAssignments.push(assignment)

    })

    console.log(`new assignments:`, newAssignments)
    console.log(`new exercises:`, newExercises)
    console.log(`new exercises:`, newJoinEntries)
    console.log(`new workout:`, newWorkoutPost)
    console.log(`new athlete:`, newAthletePost)

    newAthletePost.map(athlete => {
      fetch(`${API_URL}/athletes`, {
        method: 'POST',
        body: JSON.stringify(athlete),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
    })

    newWorkoutPost.map(workout => {
      fetch(`${API_URL}/workouts`, {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
    })
    
    newJoinEntries.map(entry => {
      fetch(`${API_URL}/assignments`, {
        method: 'POST',
        body: JSON.stringify(entry),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
    })
    
    newExercises.map(exercise => {
      fetch(`${API_URL}/exercises`, {
        method: 'POST',
        body: JSON.stringify(exercise),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
    })

    newAssignments.map(assignment => {
      fetch(`${API_URL}/assignments`, {
        method: 'POST',
        body: JSON.stringify(assignment),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
    })
      

  }

  render() {
    return (
      <>
      <header>
        <div className='header'><h1>PERSE</h1></div>
      </header>
      <nav>
        <NavLink to='/'><div className='nav-button'>ABOUT</div></NavLink>
        <NavLink to='/assign-workout'><div className='nav-button'>ASSIGN WORKOUT</div></NavLink>
        <NavLink to='/view-workouts'><div className='nav-button'>VIEW WORKOUTS</div></NavLink>
      </nav>
      <Route path='/' exact>
        <main className='App'>
          <About />
        </main>
      </Route>
      <Route path='/assign-workout'>
      <main className='App'>
        <div className="workout">
          <div className='assign-workout-headline'><h2>ASSIGN WORKOUT</h2></div>
            <div className="workout-selector-container">
              <div className="add-workout">
                <WorkoutSelection 
                  type={this.state.workout_selection_type}
                  selectorOptions={this.state.workouts}
                  define={e => this.setState({ workout_name: e.target.text, selected_workout_id: e.target.options[e.target.selectedIndex].value })}
                  name={this.state.workout_name}
                  changeWorkoutType={this.changeWorkoutType}
                  updateWorkout={this.updateSets} />
              </div>
              <div className="athlete-selection">
                <div className="athlete-selection-headline"><h3>To Athlete:</h3></div>
                <div className="select-athlete">
                  <AthleteSelection 
                    id={this.state.selected_athlete_id}
                    type={this.state.assign_athlete_type}
                    selectorOptions={this.state.athletes} 
                    define={this.changeAthleteId}
                    firstName={this.state.selected_athlete_firstname}
                    lastName={this.state.selected_athlete_lastname}
                    changeAthleteAssignmentType={this.changeAthleteAssignmentType}
                    />
                </div>
              </div>
              <div className="select-dates">
                <h3>On Date(s):</h3>
                <div className='date-type-selectors'>
                  <NavLink to='/assign-workout/single'><div 
                    id='single' 
                    className='date-type-selector'
                    onClick={e => this.setState({ workout_dates: [] })}
                  >SINGLE</div></NavLink>
                  <NavLink to='/assign-workout/range'><div 
                    id='range' 
                    className='date-type-selector'
                    onClick={e => this.setState({ workout_dates: [] })}
                  >RANGE</div></NavLink>
                  <NavLink to='/assign-workout/recurring'><div 
                    id='recurring' 
                    className='date-type-selector'
                    onClick={e => this.setState({ workout_dates: [] })}
                  >RECURRING</div></NavLink>
                </div>
              </div>
              
              <div className='date-assignment-container'>
                <Route path='/assign-workout/single'>
                  <div 
                    id='single-date-assignment'
                    className='date-assignment'>
                      <SingleDateSelector 
                        selectedMonth={this.state.month_start} 
                        selectedDay={this.state.day_start} 
                        selectedYear={this.state.year_start} 
                        handleSingleDate={this.handleSingleDate}/>
                  </div>
                </Route>
                <Route path='/assign-workout/range'>
                  <div 
                    id='range-date-assignment'
                    className='date-assignment'>
                      <RangeDateSelector 
                        selectedStartMonth={this.state.month_start} 
                        selectedStartDay={this.state.day_start} 
                        selectedStartYear={this.state.year_start} 
                        selectedEndMonth={this.state.month_end} 
                        selectedEndDay={this.state.day_end} 
                        selectedEndYear={this.state.year_end} 
                        handleRangeDate={this.handleRangeDate}/>
                  </div>
                </Route>
                <Route path='/assign-workout/recurring'>
                  <div 
                    id='recurring-date-assignment'
                    className='date-assignment'>
                      <RecurringDateSelector 
                        setRecurrance={this.setRecurrance}
                        recurrance={this.state.recurrance} 
                        selectedStartMonth={this.state.month_start} 
                        selectedStartDay={this.state.day_start} 
                        selectedStartYear={this.state.year_start} 
                        selectedEndMonth={this.state.month_end} 
                        selectedEndDay={this.state.day_end} 
                        selectedEndYear={this.state.year_end} 
                        handleRecurringDate={this.handleRecurringDate} />
                  </div>
                </Route>
              </div>
            </div>
        </div>
        <div className="assignment-spec">
          <div className="build-workout">
            <div className="sets">
              {this.state.sets.map((set, idx) => {
                return(
                  <Set 
                    key={idx}
                    id={idx}
                    exerciseTypes={this.state.ex_selector}
                    set={set}
                    newExerciseName={this.state.ex_name}
                    addExerciseType={this.state.add_exercise_type}
                    moveSet={this.moveSet}
                    deleteSet={this.deleteSet}
                    addSets={this.addSets} />
                )
              })}
              <div className="assign-workout-button"
                onClick={this.assignWorkout}>
                ASSIGN WORKOUT<br />
                to {this.state.selected_athlete_firstname} {this.state.selected_athlete_lastname}
              </div>
            </div>
          </div>
          <div className='build-exercise'>
            <h2>ADD EXERCISE TO WORKOUT</h2>
            <div className='add-exercise-types'>
              <div 
                className='add-exercise-type'
                onClick={e => this.setState({add_exercise_type: 'select', ex_name: '', selected_exercise_id: ''})}>
                  SELECT EXERCISE</div>
              <div 
                className='add-exercise-type'
                onClick={e => this.setState({add_exercise_type: 'create', ex_name: '', selected_exercise_id: uuid()})}>
                  CREATE EXERCISE</div>
            </div>
            <div className='select-exercise'>
                    <ExerciseSelection  
                      type={this.state.add_exercise_type}
                      selectorOptions={this.state.ex_selector} 
                      setSelectionAsExercise={e => this.setState({ ex_name: e.target.options[e.target.selectedIndex].text, selected_exercise_type_id: e.target.options[e.target.selectedIndex].value })}
                      define={e => this.setState({ ex_name: e.target.value, selected_exercise_type_id: uuid() })} 
                      name={this.state.ex_name} />
            </div>
            <h2>EXERCISE SPEC</h2>
            <div className="rep-type">
              <ExerciseName name={this.state.ex_name} />
              <div className="set-reps">
                <h4>Rep Type:</h4>
                  <select id="rep-type" onChange={e => this.setState({ rep_type: e.target.value })}>
                    <option>TO FAILURE</option>
                    <option>SET MULTIPLE</option>
                    <option>SINGLE DISTANCE (m)</option>
                    <option>TIME (min)</option>
                  </select>
                  <input id="rep-number" type="number" value={this.state.reps} placeholder="10" onChange={e => this.setState({ reps: e.target.value })} />
              </div>
            </div>
            <div className="rep-spec">
              <div className="add-weight">
                <h4>Add Weight (kg):</h4><input id="weight-number" type="number" value={this.state.weight} placeholder="60" onChange={e => this.setState({ weight: e.target.value })} />
              </div>
              <div className="rep-distance">
                <h4>Sub Distance (m):</h4><input id="rep-distance" type="number" value={this.state.distance} placeholder="400" onChange={e => this.setState({ sub_distance: e.target.value })} />
              </div>
              <div className="intensity-spec">
                <div className="tempo-spec">
                  <h4>Tempo (reps/time):</h4>
                    <select className="intensity-time-selector" onChange={e => this.setState({ tempo_unit: e.target.value })}>
                      <option>NONE</option>
                      <option>Sec</option>
                      <option>Minute</option>
                      <option>Hour</option>
                    </select>
                    <input className="intensity-time-input" type="number" value={this.state.tempo_time} placeholder="10" onChange={e => this.setState({ tempo_time: e.target.value })} />
                </div>
                <div className="subrest-spec">
                  <h4>Sub Rest (sec):</h4>
                    <select className="intensity-time-selector" onChange={e => this.setState({ subrest_unit: e.target.value })}>
                      <option>NONE</option>
                      <option>Sec</option>
                      <option>Minute</option>
                      <option>Hour</option>
                    </select>
                  <input className="intensity-time-input" type="number" value={this.state.subrest_time} placeholder="10" onChange={e => this.setState({ subrest_time: e.target.value })} />
                </div>
              </div>
            </div>
            
            <div className="rest-spec">
              <div className="rest-editor">
                <div className="rest-spec-header-container"><h3>Rest:</h3></div>
                <select className="rest-selector" onChange={e => this.setState({ rest_unit: e.target.value })}>
                  <option>NONE</option>
                  <option>Sec</option>
                  <option>Minute</option>
                  <option>Hour</option>
                </select>
                <input className="rest-input" type="number" value={this.state.rest_time} placeholder="10" onChange={e => this.setState({ rest_time: e.target.value })} />
              </div>
              <button id="add-exercise-button" onClick={e => this.submitNewExercise()}>ADD EXERCISE</button>
            </div>
          
          </div>
        </div>
      </main>
      </Route>
      </>
    );
  }
  
}

export default App;