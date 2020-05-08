//ADD EXERCISE TO WORKOUT
  //POST a new exercise to 'exercises' table if 'add_exercise_type' is 'select'
  //Add exercise set to 'sets' in state 
//ASSIGN WORKOUT
  //If no workout dates, check year_/month_/day_start and year_/month_/day_end
  //Map through workout_dates
  //
//


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

class App extends Component {

  constructor() {
    super()
    this.state = 
        {
          athletes: [],
          workouts: [],
          ex_selector: [],
          workout_selection_type: 'select',
          workout_name: '',
          workout_dates: [],
          assign_athlete_type: 'select',
          selected_athlete: '',
          current_workout: '',
          add_exercise_type: 'select',
          ex_name: 'EXERCISE NAME',
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
          sets: [],
          month_start: 'January',
          day_start: '1',
          year_start: '2020',
          month_end: 'January',
          day_end: '1',
          year_end: '2020',
          recurrance: 1,
          workout_dates: []
        }
    this.deleteSet = this.deleteSet.bind(this)
    this.moveSet = this.moveSet.bind(this)
    this.addSets = this.addSets.bind(this)
    this.changeAthleteAssignmentType = this.changeAthleteAssignmentType.bind(this)
    this.changeWorkoutType = this.changeWorkoutType.bind(this)
    this.updateSets = this.updateSets.bind(this)
  }

  componentDidMount() {
    this.setState({athletes: Athletes})
    this.setState({workouts: Workouts})
    this.setState({ex_selector: Exercises})
  }

  updateSets(workoutId) {
    let updatedSets = []
    this.state.workouts[workoutId].sets.map(set => {
      updatedSets.push(set)
    })
    this.setState({
      sets: updatedSets,
      workout_name: this.state.workouts[workoutId].name
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
      sets: updatedSets
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
            id: targetSet.id,
            ex_id: targetSet.ex_name,
            rep_type: targetSet.rep_type,
            reps: targetSet.reps,
            weight: targetSet.weight,
            sub_distance: targetSet.sub_distance,
            tempo_unit: targetSet.tempo_unit,
            tempo_time: targetSet.tempo_time,
            subrest_unit: targetSet.subrest_unit,
            subrest_time: targetSet.subrest_time,
            rest_unit: targetSet.rest_unit,
            rest_time: targetSet.rest_time,
            set_num: numberOfSets
          }
        )
      }
    })
    this.setState({sets: updatedSets})
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

    this.setState({sets: updatedSets})

  }

  changeAthleteAssignmentType(type) {
    if (type === 'select') {
      this.setState({
        selected_athlete: '',
        assign_athlete_type: type })
    }
    if (type === 'create') {
      this.setState({assign_athlete_type: type})
    }
  }

  changeWorkoutType(type) {
    if (type === 'select') {
      this.setState({
        selected_workout: '',
        workout_selection_type: type })
    }
    if (type === 'create') {
      this.setState({
        sets: [],
        workout_selection_type: type
      })
    }
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
      let newEx =
        {
          id: '',
          ex_name: this.state.ex_name,
          rep_type: this.state.rep_type,
          reps: this.state.reps,
          weight: this.state.weight,
          sub_distance: this.state.sub_distance,
          tempo_time: this.state.tempo_time * tempoMultiplier,
          subrest_time: this.state.subrest_time * subrestMultiplier,
          rest_time: this.state.rest_time,
          set_num: 1
        }
      this.setState({sets: [...this.state.sets, newEx]})
    }

    if (this.state.rest_unit == 'Minute') {
      let newEx =
        {
          ex_name: this.state.ex_name,
          rep_type: this.state.rep_type,
          reps: this.state.reps,
          weight: this.state.weight,
          sub_distance: this.state.sub_distance,
          tempo_unit: this.state.tempo_unit,
          tempo_time: this.state.tempo_time * tempoMultiplier,
          subrest_unit: this.state.subrest_unit,
          subrest_time: this.state.subrest_time * subrestMultiplier,
          rest_unit: this.state.rest_unit,
          rest_time: this.state.rest_time * 60,
          set_num: 1
        }
      this.setState({sets: [...this.state.sets, newEx]})
    }
    if (this.state.rest_unit == 'Hour') {
      let newEx = 
        {
          ex_name: this.state.ex_name,
          rep_type: this.state.rep_type,
          reps: this.state.reps,
          weight: this.state.weight,
          sub_distance: this.state.sub_distance,
          tempo_unit: this.state.tempo_unit,
          tempo_time: this.state.tempo_time * tempoMultiplier,
          subrest_unit: this.state.subrest_unit,
          subrest_time: this.state.subrest_time * subrestMultiplier,
          rest_unit: this.state.rest_unit,
          rest_time: this.state.rest_time * 360,
          set_num: 1
        }
      this.setState({sets: [...this.state.sets, newEx]})
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

        this.setState({workout_dates: [...this.state.workout_dates, workoutDates]})

      }
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
                  define={e => this.setState({ workout_name: e.target.value })}
                  name={this.state.workout_name}
                  changeWorkoutType={this.changeWorkoutType}
                  updateWorkout={this.updateSets} />
              </div>
              <div className="athlete-selection">
                <div className="athlete-selection-headline"><h3>To Athlete:</h3></div>
                <div className="select-athlete">
                  <AthleteSelection 
                      type={this.state.assign_athlete_type}
                      selectorOptions={this.state.athletes} 
                      define={e => this.setState({ selected_athlete: e.target.value })}
                      name={this.state.selected_athlete}
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
                    set={set}
                    name={this.state.ex_name}
                    moveSet={this.moveSet}
                    deleteSet={this.deleteSet}
                    addSets={this.addSets} />
                )
              })}
              <div className="assign-workout-button">
                ASSIGN WORKOUT<br />
                to {this.state.selected_athlete}
              </div>
            </div>
          </div>
          <div className='build-exercise'>
            <h2>ADD EXERCISE TO WORKOUT</h2>
            <div className='add-exercise-types'>
              <div 
                className='add-exercise-type'
                onClick={e => this.setState({add_exercise_type: 'select', ex_name: ''})}>
                  SELECT EXERCISE</div>
              <div 
                className='add-exercise-type'
                onClick={e => this.setState({add_exercise_type: 'create'})}>
                  CREATE EXERCISE</div>
            </div>
            <div className='select-exercise'>
                    <ExerciseSelection  
                      type={this.state.add_exercise_type}
                      selectorOptions={this.state.ex_selector} 
                      setSelectionAsExercise={e => this.setState({ ex_name: e.target.options[e.target.selectedIndex].text })}
                      define={e => this.setState({ ex_name: e.target.value })} 
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
              <button id="add-exercise-button" onClick={e => this.convertTempoToSec()}>ADD EXERCISE</button>
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