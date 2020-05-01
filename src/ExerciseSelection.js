import React, { Component } from 'react'

class ExerciseSelection extends Component {
    render() {
        if (this.props.type === 'select') {
            return(
                <select onChange={this.props.setSelectionAsExercise}>
                    {this.props.selectorOptions.map(option => {
                        return(
                            <option value={option.id}>{option.ex_name}</option>
                        )
                    })}
                </select>
            )
        }
        if (this.props.type === 'create') {
            return(
                <input 
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