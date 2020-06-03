import React, {Component} from 'react'
import './WorkoutSelection.css'

class WorkoutSelection extends Component {
    static defaultProps = {
        type: 'select',
        selectorOptions: []
      }
    render() {
        if (this.props.type === 'select') {
            return(
                <>
                <div className="select-workout-type">
                    <label htmlFor="workout-selector">Select A Workout</label>
                    <select id="workout-selector" className="workout-selector" onChange={e => this.props.updateWorkout(e.target.value)}>
                        <option>SELECT WORKOUT</option>
                        {this.props.selectorOptions.map((option, idx) => {
                            return(
                                <option key={idx} value={option.workouts_id}>{option.workouts_name}</option>
                            )
                        })}
                    </select>
                    OR
                    <div 
                        className="select-workout-type-toggle"
                        onClick={e => this.props.changeWorkoutType('create')}>+ADD NEW WORKOUT</div>
                </div>
                </>
            )
        }
        if (this.props.type === 'create') {
            return(
                <>
                <div className="select-workout-type">
                    <label htmlFor="workout-name-input">Name Workout</label>
                    <input 
                        onChange={e => this.props.define(e.target.value)}
                        id="workout-name-input" 
                        type="text" 
                        value={this.props.name} 
                        placeholder="New Workout Name" />
                    OR
                    <div 
                        className="select-workout-type-toggle"
                        onClick={e => this.props.changeWorkoutType('select')}>SELECT WORKOUT</div>
                </div>
                </>
            )
        }
    }
}

export default WorkoutSelection
