import React, { Component } from 'react'
import './ExerciseSelection.css'

class ExerciseSelection extends Component {
    static defaultProps = {
        selectorOptions: [],
        type: 'select'
      }
    render() {
        if (this.props.type === 'select') {
            return(
                <>
                <label htmlFor="exercise-selector">Select Exercise</label>
                <select id="exercise-selector" className="exercise-selector" onChange={this.props.setSelectionAsExercise}>
                    <option>SELECT EXERCISE</option>
                    {this.props.selectorOptions.map((option, idx) => {
                        return(
                            <option key={idx} value={option.exercise_types_id}>{option.exercise_types_name}</option>
                        )
                    })}
                </select>
                </>
            )
        }
        if (this.props.type === 'create') {
            return(
                <>
                <label htmlFor="ex-name-input">Add Exercise</label>
                <input 
                    className='exercise-selector'
                    onChange={this.props.define}
                    id="ex-name-input" 
                    type="text" 
                    value={this.props.name} 
                    placeholder="New Exercise Name" />
                </>
            )
        }
    }
}

export default ExerciseSelection