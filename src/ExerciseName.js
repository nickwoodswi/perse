import React, { Component } from 'react'
import './ExerciseName.css'

class ExerciseName extends Component {
    render() {
        if (this.props.name === 'EXERCISE NAME') {
            return(<></>)
        }
        else {
            return(
                <>
                <div className="ex-indicator">
                    <h4>Adding</h4>
                    <h3>"{this.props.name}"</h3>
                    <h4>to workout</h4>
                </div>
                </>
            )
        }
    }
}

export default ExerciseName