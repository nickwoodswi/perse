import React, { Component } from 'react'
import './ExerciseSelection.css'

class ExerciseSelection extends Component {
    render() {
        if (this.props.type === 'select') {
            return(
                <select className="exercise-selector" onChange={this.props.setSelectionAsExercise}>
                    {this.props.selectorOptions.map((option, idx) => {
                        return(
                            <option key={idx} value={option.exercise_types_id}>{option.exercise_types_name}</option>
                        )
                    })}
                </select>
            )
        }
        if (this.props.type === 'create') {
            return(
                <input 
                    className='exercise-selector'
                    onChange={this.props.define}
                    id="ex-name-input" 
                    type="text" 
                    value={this.props.name} 
                    placeholder="New Exercise Name" />
            )
        }
    }
}

export default ExerciseSelection