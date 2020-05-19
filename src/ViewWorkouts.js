import React, { Component } from 'react'
import Workout from './Workout'

class ViewWorkout extends Component {
    render() {
        return(
            <>

            <h1>ATHLETES</h1>
            <select 
                className="athlete-selector" 
                onChange={e => this.props.changeAthleteView(e.target.options[e.target.selectedIndex].value)}>
                    <option>VIEW WORKOUTS BY ATHLETE</option>
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
                            <h3>{assignment.perform_on_date}</h3>
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

            </>
        )
    }
}

export default ViewWorkout