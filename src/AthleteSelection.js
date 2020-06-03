import React, { Component } from 'react'
import './AthleteSelection.css'

class AthleteSelection extends Component {
    static defaultProps = {
        type: 'select',
        selectorOptions: []
      }
    render() {
        if (this.props.type === 'select') {
            return(
                <>
                <div className="assignment-type">
                    <label htmlFor="athlete-selector">Select Athlete For Assignment</label>
                    <select id="athlete-selector" className="athlete-selector" 
                        onChange={e => this.props.define(e.target.value, e.target.options[e.target.selectedIndex].attributes.getNamedItem('firstname').nodeValue, e.target.options[e.target.selectedIndex].attributes.getNamedItem('lastname').nodeValue )}>
                        <option>SELECT ATHLETE</option>
                        {this.props.selectorOptions.map((option, idx) => {
                            return(
                                <option key={idx} firstname={option.first_name} lastname={option.last_name} value={option.athletes_id}>{option.first_name} {option.last_name}</option>
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
                    <label htmlFor="assignment-name-input">Create Athlete First Name</label>
                    <input 
                        onChange={e => this.props.define(this.props.id, e.target.value, this.props.lastName)}
                        id="assignment-name-input" 
                        type="text" 
                        value={this.props.firstName} 
                        placeholder="First Name" />
                    <label htmlFor="assignment-name-input">Create Athlete Last Name</label>
                    <input 
                        onChange={e => this.props.define(this.props.id, this.props.firstName, e.target.value)}
                        id="assignment-name-input" 
                        type="text" 
                        value={this.props.lastName} 
                        placeholder="Last Name" />
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