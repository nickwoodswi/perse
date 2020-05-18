import React, { Component } from 'react'
import Exercises from './Exercises'

class Workout extends Component {

    render() {
        return(
            this.props.workouts.map(workout => {
                if (workout.workouts_id == this.props.workoutId) {
                    return (
                        <>
                        <h4>{workout.workouts_name}</h4>
                        <Exercises 
                            workoutId={this.props.workoutId}
                            join={this.props.join} 
                            exercises={this.props.exercises} 
                            exTypes={this.props.exTypes} />
                        </>
                    )
                }
            })
        )
    }
}

export default Workout