import React, { Component } from 'react'
import './AddSets.css'

class AddSets extends Component {
    static defaultProps = {
        targetSet: {}
      }
    render() {
        return(
            <>
            <label htmlFor="set-number-input">Number of Sets</label>
            <input id="set-number-input" className="set-number-input"
                type="number" 
                value={this.props.targetSet.set_num}
                onChange={e => this.props.addSets(this.props.setId, this.props.targetSet, e.target.value)}/>
            </>
        )
    }
}

export default AddSets