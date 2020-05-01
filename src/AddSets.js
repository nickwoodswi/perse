import React, { Component } from 'react'
import './AddSets.css'

class AddSets extends Component {
    render() {
        return(
            <input className="set-number-input"
                type="number" 
                value={this.props.targetSet.set_num}
                onChange={e => this.props.addSets(this.props.setId, this.props.targetSet, e.target.value)}/>
        )
    }
}

export default AddSets