import React, { Component } from 'react'
import Exercises from './Exercises'
import './Workout.css'

class Workout extends Component {
    static defaultProps = {
        workouts: []
      }
    render() {
        return(
            this.props.workouts.map(workout => {
                if (workout.workouts_id == this.props.workoutId) {
                    return (
                        <>
                        <div className="workout-name"><h4>{workout.workouts_name}</h4></div>
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