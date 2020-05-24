import React, { Component } from 'react'
import Recurrance from './Recurrance'
import './AssignButton.css'

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
            <div className="assignment-preview">
                <ul>
                    <li>Assigning <b>"{this.props.workoutName}"</b></li>
                    <li>to <b><i>{this.props.firstName} {this.props.lastName}</i></b></li>
                    <Recurrance recurrance={this.props.recurrance} />
                    <li>from <b><i>{this.props.monthStart} {this.props.dayStart}, {this.props.yearStart}</i></b></li>
                    <li>thru <b><i>{this.props.monthEnd} {this.props.dayEnd}, {this.props.yearEnd}</i></b></li>
                </ul>
            </div>
            <button className="assign-workout-button" onClick={this.props.assignWorkout}>
                ASSIGN WORKOUT
            </button>
            </>
        )
        
        }
    }
}

export default AssignButton