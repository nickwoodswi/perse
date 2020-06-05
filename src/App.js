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
import Workouts from './data/Workouts.js'
import Exercises from './data/Exercises.js'
import Athletes from './data/Athletes.js'
import Assignments from './data/Assignments.js'
import ExerciseTypes from './data/ExerciseTypes.js'
import Join from './data/Join.js'
import About from './About'
import uuid from 'react-uuid'
import config from './config'
import ViewWorkouts from './ViewWorkouts'
import AssignButton from './AssignButton'
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
          exercises: [],
          join: [],
          assignments: [],

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
          ex_name: '',
          selected_exercise_type_id: '',
          rep_type: 'TO FAILURE',
          reps: '',
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
          workout_dates: [new Date(2020, 0, 1)],

          //view
          viewing_athlete_id: '',
        }
    this.deleteSet = this.deleteSet.bind(this)
    this.moveSet = this.moveSet.bind(this)
    this.addSets = this.addSets.bind(this)
    this.changeAthleteAssignmentType = this.changeAthleteAssignmentType.bind(this)
    this.changeWorkoutType = this.changeWorkoutType.bind(this)
    this.updateSets = this.updateSets.bind(this)
    this.changeAthleteId = this.changeAthleteId.bind(this)
    this.assignWorkout = this.assignWorkout.bind(this)
    this.changeWorkoutName = this.changeWorkoutName.bind(this)
    this.changeAthleteView = this.changeAthleteView.bind(this)
  }

  componentDidMount() {
    // uncomment code to use static data for testing
    // //static
    // // this.setState({assignments: Assignments})
    // // this.setState({athletes: Athletes})
    // // this.setState({workouts: Workouts})
    // // this.setState({ex_selector: ExerciseTypes})
    // // this.setState({exercises: Exercises})
    // // this.setState({join: Join})
    this.updateData()
  //fetches
    }
    
    updateData = () => {
    //gets previously-entered athletes (id, name) from the database and puts them in state
      //used to make assignments
    fetch(`${API_URL}/athletes`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ athletes: data })
    })

    //gets previously-entered workout types (id, name) from the database and puts them in state
      //used to assign previously-entered workouts
    fetch(`${API_URL}/workouts`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ workouts: data })
    })

    //gets previously-entered exercise types (id, name) from the database and puts them in state
      //used to create new exercises
    fetch(`${API_URL}/exercise-types`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ ex_selector: data })
    })

    //gets previously-entered exercises (id, exercise_type, variables) from the database and puts them in state
      //used to create new workouts from a "template", or preview workout assignments
    fetch(`${API_URL}/exercises`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ exercises: data })
    })

    //gets all entries in the workout-exercise type join table
      //used to display previously-stored workouts, and save relationship between workout and exercises when creating new workouts
    fetch(`${API_URL}/join`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ join: data })
    })

    fetch(`${API_URL}/assignments`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(data => {
      const sorted = data.sort(function(a, b){
        return new Date(a.perform_on_date) - new Date(b.perform_on_date)
      })
      this.setState({assignments: sorted})
    })
    // .then(data => {
    //   this.setState({ assignments: data })
    // })

  }

  //adds exercises to workout cart when previously-submitted workout is selected
  updateSets(workoutId) {

    //initializes the selected workout name
    let workoutName = []
    //map over the workouts in state and set the workout name when it matches the selected id
    this.state.workouts.map(workout => {
      if (workout.workouts_id == workoutId) {
        workoutName.push(workout.workouts_name)
      }
    })

    //initializes a list of exercise ids in the selected workout
    let exerciseIds = []
    //maps over the join entries and creates a list of exercise entries that match the selected workout id
    this.state.join.map(entry => {
      if (entry.workouts_id == workoutId) {
        exerciseIds.push(entry.exercises_id)
      }
    })

    //initializes a list of exercises
    let exercises = []
    //maps over the exercise ids list (line 201) and for each item, adds any exercises matching the id in state to the list of exercises
    exerciseIds.map(id => {
      this.state.exercises.map(exercise => {
        if (id == exercise.exercises_id) {
          exercises.push(exercise)
        }
      })
    })

    //initializes a list of exercise sets in the workout cart
    let updatedSets = []
    //maps over the list of exercises (line 209), and for each item, adds the exercise to this list
    exercises.map(exercise => {
      this.state.ex_selector.map(type => {
        if (exercise.exercise_types_id == type.exercise_types_id) {
          let set = {
            exercise_types_name: type.exercise_types_name,
            exercise_types_id: type.exercise_types_id,
            rep_type: exercise.rep_type,
            reps: exercise.reps,
            weight: exercise.resistance,
            rest: exercise.rest,
            set_num: exercise.set_num,
            set_order: exercise.set_order,
            sub_distance: exercise.sub_distance,
            subrest: exercise.subrest,
            tempo: exercise.tempo
          }
          updatedSets.push(set)
        }
      })
    })

    //sets the updated exercises, workout name, and selected workout id in state to display to the user
    this.setState({
      sets: updatedSets,
      workout_name: workoutName[0],
      selected_workout_id: workoutId
    })

  }

  //removes an exercise set from the workout cart
  deleteSet(setId) {
    let updatedSets = []
    this.state.sets.map(set => {
      if (this.state.sets.indexOf(set) !== setId) {
        updatedSets.push(set)
      }
    })
    //updates sets in state, and sets the client to "create" mode for the workout
    this.setState({
      sets: updatedSets,
      workout_selection_type: 'create'
    })
  }

  //multiplies a set in the workout cart using left-side number input
  addSets(setId, targetSet, numberOfSets) {
    //initializes a list of updated sets
    let updatedSets = []
    //map over the sets currently in state and create a new updated list by changing set_num for the matching set ids
    this.state.sets.map(set => {
      if (this.state.sets.indexOf(set) !== setId) {
        updatedSets.push(set)
      }
      if (this.state.sets.indexOf(set) === setId) {
        updatedSets.push(
          {
            exercise_types_id: targetSet.exercise_types_id,
            exercise_types_name: targetSet.exercise_types_name,
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
    //updates sets in state, puts client in "create" mode, and creates a new workout ID
    this.setState({
      sets: updatedSets,
      workout_selection_type: 'create',
      selected_workout_id: uuid()
    })
  }

  //changes set order
  moveSet(setId, indexEdit) {
    //initializes 
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

  //switches client into creating or selecting an athlete assignment
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

  //switches client into creating a new workout type or assigning an old one
  changeWorkoutType(type) {
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

  //sets the workout name
  changeWorkoutName(value) {
    this.setState({
      workout_name: value
    })
  }

  //POST new exercise if in 'create' mode
  submitNewExercise() {

    if (this.state.selected_exercise_type_id == '') {
      alert('No exercise selected or created!')
      return
    }

    if (this.state.selected_exercise_type_id == 'SELECT EXERCISE') {
      alert('No exercise selected!')
      return
    }
    
    if (this.state.add_exercise_type === 'create') {
      if (!this.state.ex_name) {
        return alert('No exercise specified!')
      } else {
        
        let newExerciseType = {
          exercise_types_id: this.state.selected_exercise_type_id,
          exercise_types_name: this.state.ex_name,
          new_exercise_type: 'new'
        }
        
        this.setState( 
          { ex_selector: [...this.state.ex_selector, newExerciseType] }, 
          this.setState({ add_exercise_type: 'select', selected_exercise_type_id: '', workout_selection_type: 'create'}) 
        )
        
        this.convertTempoToSec()

      }
    } else {this.convertTempoToSec()}
  }

  //converts minutes/hours to seconds if selected for tempo, subrest, and rest
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
          exercise_types_id: this.state.selected_exercise_type_id,
          exercise_types_name: this.state.ex_name,
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
        rep_type: '',
        reps: '',
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
          exercise_types_id: this.state.selected_exercise_type_id,
          exercise_types_name: this.state.ex_name,
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
        rep_type: '',
        reps: '',
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
          exercise_types_id: this.state.selected_exercise_type_id,
          exercise_types_name: this.state.ex_name,
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

  //sets start and end dates equally if user is assigning a single date
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

  //sets start or end dates if user is assigning a range of dates
  handleRangeDate = (dateProp, value) => {
    this.setState({
      workout_dates: [],
      [dateProp]: value,
      recurrance: 1
    }, () => {
      this.recurrance()
    })
  }

  //sets start or end dates if user is assigning a recurrance over a date range
  handleRecurringDate = (dateProp, value) => {
    this.setState({
      workout_dates: [],
      [dateProp]: value
    }, () => {
      this.recurrance()
    })
  }

  //sets the recurrance if date range has already been set
  setRecurrance = (startProp, value) => {
    this.setState({workout_dates: []})
    this.setState({
      [startProp]: value,
    }, () => {
      this.recurrance()
    })
  }

  //creates assignment dates when recurrance and date range have been set
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

    //creates start and end date objects by getting an index number from the Months list above using the month listed in state
    let startDate = new Date(
                          this.state.year_start, 
                          Months.indexOf(this.state.month_start), 
                          this.state.day_start)

    let endDate = new Date(
                        this.state.year_end, 
                        Months.indexOf(this.state.month_end), 
                        this.state.day_end)

    //counts the number of days between the start date and end date
    let dateCount = (endDate.getTime() - startDate.getTime())/(1000*60*60*24)
    
    //initializes a list of assignment dates
    let dates = [];
    //if the start date is the same as the end date, push just the single date into the list of assignment dates
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
        for (let i = 0; i < dateRange.length; i+=parseInt(this.state.recurrance)) {
            workoutDates.push(dateRange[i])
        }

        let filteredWorkoutDates = workoutDates.filter(function(x) {
          return x !== undefined;
        })

        this.setState({workout_dates: filteredWorkoutDates})

      }
  }

  //set the selected athlete in state
  changeAthleteId(id, firstName, lastName) {
    this.setState({
      selected_athlete_id: id,
      selected_athlete_firstname: firstName,
      selected_athlete_lastname: lastName
    })
  }

  //change the athlete being viewed in the "view workouts" view
  changeAthleteView(id) {
    this.setState({ viewing_athlete_id: id })
  }

  //displays the exercise builder when the user opts to add a new exercise to a workout
  displayBuilder() {
    document.getElementById('exercise-builder-hidden').classList.toggle('exercise-builder')
  }

  //assigns a workout to an athlete on a single date, or range of dates with recurrance
  assignWorkout() {

  //validation
    //workout name is required
    if (!this.state.workout_name) {
      alert('No workout created or selected!')
      return
    }
    
    //athlete selection is required
    if (!this.state.selected_athlete_id) {
      alert('No athlete selected!')
      return
    }

    //assignment dates are required
    if (this.state.workout_dates.length == 0) {
      alert('No workout dates selected!')
      return
    }

    //exercises in the workout are required
    if (this.state.sets.length == 0) {
      alert('No exercises selected!')
      return
    }

    //if new athlete, create a new athlete object for posting to database

    let newAthletePost = []
    if (this.state.assign_athlete_type === 'create') {
      if (
        !this.state.selected_athlete_firstname ||
        !this.state.selected_athlete_lastname ) {
        return alert('Athlete first and last name required!')
      } else { 
        let newAthlete = {
          athletes_id: this.state.selected_athlete_id,
          first_name: this.state.selected_athlete_firstname,
          last_name: this.state.selected_athlete_lastname
        }
        newAthletePost.push(newAthlete)
      }
    }

    //if new workout, create new workout type to add to database

    let newWorkoutPost = []
    if (this.state.workout_selection_type === 'create') {
      if (!this.state.workout_name) {
        return alert('No workout specified!')
      } else { 
        let newWorkoutType = {
          workouts_id: this.state.selected_workout_id,
          workouts_name: this.state.workout_name
        }
        newWorkoutPost.push(newWorkoutType)
      }
    }

    //if new exercise type, create a new exercise type object to add to database

    let newExerciseTypes = []
    this.state.ex_selector.map(type => {
      if (type.new_exercise_type == 'new') {
        let newExerciseType = {
          exercise_types_id: type.exercise_types_id,
          exercise_types_name: type.exercise_types_name
        }
        newExerciseTypes.push(newExerciseType)
      }
    })


    //create new exercise spec entries, and add them to the exercises table 
    //create new join table entries to store relationships between exercises/workout
    
    let newExercises = []
    let newJoinEntries = []
    if (!this.state.sets) {
      return alert('No exercise specified!')
    } else {
      this.state.sets.map(set => {

        let exercisesId = uuid()

        let exercise = {
          exercises_id: exercisesId,
          exercise_types_id: set.exercise_types_id,
          rep_type: set.rep_type,
          reps: set.reps,
          resistance: set.weight,
          sub_distance: set.sub_distance,
          tempo: set.tempo_time,
          subrest: set.subrest_time,
          rest: set.rest_time,
          set_num: set.set_num,
          set_order: this.state.sets.indexOf(set)
        }
        newExercises.push(exercise)
        
        let joinEntry = {
          id: uuid(),
          workouts_id: this.state.selected_workout_id,
          exercises_id: exercisesId
        }
        newJoinEntries.push(joinEntry)

      })
    }

    //create an assignment entry for each date in the workout_dates array in state

    let newAssignments = this.state.workout_dates.map(workoutDate => {

      if ((workoutDate.getTime() - new Date()) < 0) {
        alert('One or more of your assignment dates is in the past!')
        return
      }

      let assignment = {
        id: uuid(),
        date_assigned: new Date(),
        perform_on_date: workoutDate,
        athletes_id: this.state.selected_athlete_id,
        workouts_id: this.state.selected_workout_id
      }
      return assignment
      
    })

    // uncomment to use static data for testing

    // this.setState({assignments: [...this.state.assignments, ...newAssignments]})

    // // //static
    // // newAthletePost.map(athlete => {
    // //   this.setState({athletes: [...this.state.athletes, athlete]})
    // // })
    //post any new athletes
    let promises = []
    promises = promises.concat(

      newAthletePost.map(athlete => 
        fetch(`${API_URL}/athletes`, {
          method: 'POST',
          body: JSON.stringify(athlete),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => response.json())
      ),
    // //static
    // newWorkoutPost.map(workout => {
    //   this.setState({workouts: [...this.state.workouts, workout]})
    // })

    //post an new workouts
      newWorkoutPost.map(workout => 
        fetch(`${API_URL}/workouts`, {
          method: 'POST',
          body: JSON.stringify(workout),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => response.json())
      ),

    // //static
    // newJoinEntries.map(entry => {
    //   this.setState({join: [...this.state.join, entry]})
    // })
    
    //post join entries
      newJoinEntries.map(entry => 
        fetch(`${API_URL}/join`, {
          method: 'POST',
          body: JSON.stringify(entry),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => response.json())
      ),

    // //static
    // newExercises.map(exercise => {
    //   this.setState({exercises: [...this.state.exercises, exercise]})
    // })
    
    //post new exercises
      newExercises.map(exercise => 
        fetch(`${API_URL}/exercises`, {
          method: 'POST',
          body: JSON.stringify(exercise),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => response.json())
      ),

    // //static
    // newAssignments.map(assignment => {
    //   this.setState({assignments: [...this.state.assignments, assignment]})
    // })

    //post new assignments
      newAssignments.map(assignment => 
        fetch(`${API_URL}/assignments`, {
          method: 'POST',
          body: JSON.stringify(assignment),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => response.json())
      ),

    // //static
    // newExerciseTypes.map(type => {
    //   this.setState({ex_selector: [...this.state.ex_selector, type]})
    // })

    //post new exercise types
      newExerciseTypes.map(type => 
        fetch(`${API_URL}/exercise-types`, {
          method: 'POST',
          body: JSON.stringify(type),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => response.json())
        //reset state after submission
        .then(this.setState({

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
          ex_name: '',
          selected_exercise_type_id: '',
          rep_type: 'TO FAILURE',
          reps: '',
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
          workout_dates: [new Date(2020, 0, 1)],

          //view
          viewing_athlete_id: ''
        }))
      )
    )
    Promise.all(promises)
    .then(data => {
      window.location.href="/view-workouts"
    })

  }

  render() {
    return (
      <>
      <header>
        <div className='header'><h1>PERSE</h1></div>
        <img id="app-logo" src={require('./images/hanging-knee-raises-crossfit-silhouette.png')} alt="chinup-silhouette"/>
      </header>
      <nav>
        <NavLink to='/'><div className='nav-button'>ABOUT</div></NavLink>
        <NavLink to='/assign-workout'><div className='nav-button'>ASSIGN</div></NavLink>
        <NavLink to='/view-workouts'><div className='nav-button'>VIEW</div></NavLink>
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
                  define={this.changeWorkoutName}
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
                  >RECUR</div></NavLink>
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
            <div id="sets" className="sets">
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
              <AssignButton 
                dayEnd={this.state.day_end}
                dayStart={this.state.day_start}
                monthEnd={this.state.month_end}
                monthStart={this.state.month_start}
                recurrance={this.state.recurrance}
                firstName={this.state.selected_athlete_firstname}
                lastName={this.state.selected_athlete_lastname}
                workoutName={this.state.workout_name} 
                yearEnd={this.state.year_end}
                yearStart={this.state.year_start}
                assignWorkout={e => this.assignWorkout()} />
            </div>
          </div>
          <div className='build-exercise'>
            <button className="display-exercise-builder" onClick={e => this.displayBuilder()}>+ADD EXERCISE TO WORKOUT</button>
            <div id="exercise-builder-hidden" className="exercise-builder-hidden">
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
              <div className="rep-type">
                <div className="set-reps">
                  <h4>Rep Type:</h4>
                    <label htmlFor="rep-type">Rep Type</label>
                    <select id="rep-type" onChange={e => this.setState({ rep_type: e.target.value })}>
                      <option>Select Rep Type</option>
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
                  <h4>Add Weight (kg):</h4><label htmlFor="weight-number">Add Weight</label><input id="weight-number" type="number" value={this.state.weight} placeholder="60" onChange={e => this.setState({ weight: e.target.value })} />
                </div>
                <div className="rep-distance">
                  <h4>Sub Distance (m):</h4><label htmlFor="rep-distance">Sub Distance</label><input id="rep-distance" type="number" value={this.state.distance} placeholder="400" onChange={e => this.setState({ sub_distance: e.target.value })} />
                </div>
                <div className="intensity-spec">
                  <div className="tempo-spec">
                    <h4>Tempo (reps/time):</h4>
                      <label htmlFor="tempo-type-selector">Tempo</label>
                      <select id="tempo-type-selector" className="intensity-time-selector" onChange={e => this.setState({ tempo_unit: e.target.value })}>
                        <option>NONE</option>
                        <option>Sec</option>
                        <option>Minute</option>
                        <option>Hour</option>
                      </select>
                      <label htmlFor="time-input">Tempo Input</label><input id="time-input" className="intensity-time-input" type="number" value={this.state.tempo_time} placeholder="10" onChange={e => this.setState({ tempo_time: e.target.value })} />
                  </div>
                  <div className="subrest-spec">
                    <h4>Sub Rest (sec):</h4>
                      <label htmlFor="subrest-type-selector">Sub Rest</label>
                      <select id="subrest-type-selector" className="intensity-time-selector" onChange={e => this.setState({ subrest_unit: e.target.value })}>
                        <option>NONE</option>
                        <option>Sec</option>
                        <option>Minute</option>
                        <option>Hour</option>
                      </select>
                    <label htmlFor="time-input">Sub Rest Time</label>
                    <input id="time-input" className="intensity-time-input" type="number" value={this.state.subrest_time} placeholder="10" onChange={e => this.setState({ subrest_time: e.target.value })} />
                  </div>
                </div>
              </div>
              
              <div className="rest-spec">
                <div className="rest-editor">
                  <div className="rest-spec-header-container"><h3>Rest:</h3></div>
                  <label htmlFor="rest-selector">Rest Selector</label>
                  <select id="rest-selector" className="rest-selector" onChange={e => this.setState({ rest_unit: e.target.value })}>
                    <option>NONE</option>
                    <option>Sec</option>
                    <option>Minute</option>
                    <option>Hour</option>
                  </select>
                  <label htmlFor="add-rest">Add Rest</label>
                  <input id="add-rest" className="rest-input" type="number" value={this.state.rest_time} placeholder="10" onChange={e => this.setState({ rest_time: e.target.value })} />
                </div>
                <a href="#sets"><button id="add-exercise-button" onClick={e => this.submitNewExercise()}>ADD EXERCISE</button></a>
              </div>
            </div>
          </div>
        </div>
      </main>
      </Route>
      <Route path='/view-workouts'>
        <main className='App'>
          <ViewWorkouts
            athletes={this.state.athletes}
            workouts={this.state.workouts}
            exTypes={this.state.ex_selector}
            exercises={this.state.exercises}
            join={this.state.join}
            assignments={this.state.assignments} 
            viewingAthleteId={this.state.viewing_athlete_id}
            changeAthleteView={this.changeAthleteView}
            updateData={this.updateData} />
        </main>
      </Route>
      </>
    );
  }
  
}

export default App;