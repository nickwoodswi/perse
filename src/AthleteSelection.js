import React, { Component } from 'react'
import './AthleteSelection.css'

class AthleteSelection extends Component {
    render() {
        if (this.props.type === 'select') {
            return(
                <>
                <div className="assignment-type">
                    <select className="athlete-selector" onChange={this.props.define}>
                        {this.props.selectorOptions.map(option => {
                            return(
                                <option>{option.first_name} {option.last_name}</option>
                            )
                        })}
                    </select>
                    OR
                    <div 
                        className="assignment-type-toggle"
                        onClick={e => this.props.changeAthleteAssignmentType('create')}>+ADD NEW ATHLETE</div>
                </div>
                </>
            )
        }
        if (this.props.type === 'create') {
            return(
                <>
                <div className="assignment-type">
                    <input 
                        onChange={this.props.define}
                        id="assignment-name-input" 
                        type="text" 
                        value={this.props.name} 
                        placeholder="New Athlete Name" />
                    OR
                        <div 
                            className="assignment-type-toggle"
                            onClick={e => this.props.changeAthleteAssignmentType('select')}>SELECT ATHLETE</div>
                </div>
                </>
            )
        }
    }
}

export default AthleteSelection