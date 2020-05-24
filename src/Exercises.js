import React, { Component } from 'react'
import Weight from './Weight'
import Distance from './Distance'
import Reps from './Reps'
import Tempo from './Tempo'
import Rest from './Rest'
import Subrest from './Subrest'
import ExerciseType from './ExerciseType'
import './Exercises.css'


class Exercises extends Component {
    static defaultProps = {
        join: []
      }
    render() {

        let spec = []
        this.props.join.map(entry => {
            if (entry.workouts_id == this.props.workoutId) {
                
                let workoutExerciseId = entry.exercises_id

                this.props.exercises.map(exercise => {
                
                    if (workoutExerciseId == exercise.exercises_id) {

                        let exObj = {
                            type: exercise.exercise_types_id,
                            rep_type: exercise.rep_type,
                            reps: exercise.reps,
                            weight: exercise.resistance,
                            rest: exercise.rest,
                            sets: exercise.set_num,
                            set_order: exercise.set_order,
                            sub_distance: exercise.sub_distance,
                            subrest: exercise.subrest,
                            tempo: exercise.tempo
                        }
                        spec.push(exObj)
                    }
                })

            }
        })

        let orderedExercises = []
        spec.map(exercise => {
            if (!exercise.set_order) {
                orderedExercises.unshift(exercise)
            } else {
                orderedExercises.splice(exercise.set_order, 0, exercise)
            }
        })

            
                return (
                    orderedExercises.map((exercise, idx) => {
                        return(
                        <>
                        <div className="view-workout">
                            <div className="workout-order">{idx + 1}</div>
                            <div className="exercises">
                                <div className="exercise-type">{exercise.sets} set(s) <ExerciseType types={this.props.exTypes} typeId={exercise.type} /> <Reps reptype={exercise.rep_type} reps={exercise.reps} /></div>
                                <Weight weight={exercise.weight} />
                                <Distance distance={exercise.sub_distance} />
                                <Tempo speed={exercise.tempo} />
                                <Subrest time={exercise.subrest} />
                                <div className="set-rest"><Rest rest={exercise.rest} /></div>
                            </div>
                        </div>
                        </>
                        )
                    })
                )
    }
}

export default Exercises