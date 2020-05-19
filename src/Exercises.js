import React, { Component } from 'react'
import Weight from './Weight'
import Distance from './Distance'
import Reps from './Reps'
import Tempo from './Tempo'
import Rest from './Rest'
import Subrest from './Subrest'
import ExerciseType from './ExerciseType'


class Exercises extends Component {
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
        console.log(`exercises:`, orderedExercises)

            
                return (
                    orderedExercises.map(exercise => {
                        return(
                        <>
                        {exercise.sets} set(s) <ExerciseType types={this.props.exTypes} typeId={exercise.type} /> <Reps reptype={exercise.rep_type} reps={exercise.reps} /><br/>
                        <Weight weight={exercise.weight} />
                        <Distance distance={exercise.sub_distance} />
                        <Tempo speed={exercise.tempo} />
                        <Subrest time={exercise.subrest} />
                        <Rest rest={exercise.rest} />
                        <br/>
                        </>
                        )
                    })
                )
    }
}

export default Exercises