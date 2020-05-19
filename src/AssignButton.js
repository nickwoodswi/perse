import React, { Component } from 'react'
import Recurrance from './Recurrance'

class AssignButton extends Component {
    render() {
        if (!this.props.dayEnd ||
            !this.props.dayStart || 
            !this.props.monthEnd ||
            !this.props.monthStart ||
            !this.props.firstName ||
            !this.props.lastName ||
            !this.props.workoutName ||
            !this.props.yearEnd ||
            !this.props.yearStart ||
            !this.props.recurrance) {
                return(<></>)
        } else {

        return(
            <>
            <div className="assign-workout-button" onClick={this.props.assignWorkout}>
                ASSIGN WORKOUT
            </div>
            <div className="assignment-preview">
                <li>Assigning Workout {this.props.workoutName} to</li>
                <li>{this.props.firstName} {this.props.lastName}</li>
                <li>From {this.props.monthStart} {this.props.dayStart}, {this.props.yearStart}</li>
                <li>thru {this.props.monthEnd} {this.props.dayEnd}, {this.props.yearEnd}</li>
                <Recurrance recurrance={this.props.recurrance} />
            </div>
            </>
        )
        
        }
    }
}

export default AssignButton