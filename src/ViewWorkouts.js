import React, { Component } from 'react'
import Workout from './Workout'
import './ViewWorkouts.css'

class ViewWorkout extends Component {
    static defaultProps = {
        athletes: [],
        assignments: []
      }

    render() {
        return(
            <div className="view-workouts">
                <div className="view-workouts-headline"><h2>VIEW SCHEDULED WORKOUTS BY ATHLETE:</h2></div>
                <label htmlFor="view-workouts-by-athlete">Select Athlete to View</label>
                <select 
                    id="view-workouts-by-athlete"
                    className="athlete-selector" 
                    onChange={e => this.props.changeAthleteView(e.target.options[e.target.selectedIndex].value)}>
                        <option>SELECT ATHLETE</option>
                        {this.props.athletes.map((athlete, idx) => {
                            return(
                                <option key={idx} value={athlete.athletes_id}>{athlete.first_name} {athlete.last_name}</option>
                            )
                        })}
                </select>

                <div className="athlete-workouts">
                    {this.props.assignments.map(assignment => {
                        if (assignment.athletes_id == this.props.viewingAthleteId) {
                            return(
                            <>
                            <div className="assignment">
                                <div className="workout-date"><h3>{assignment.perform_on_date.toString().substring(0,16)}</h3></div>
                                <Workout 
                                    workoutId={assignment.workouts_id}
                                    workouts={this.props.workouts} 
                                    join={this.props.join} 
                                    exercises={this.props.exercises} 
                                    exTypes={this.props.exTypes} />
                            </div>
                            </>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default ViewWorkout