import React, { Component } from 'react'

class Reps extends Component {
    render() {
        if (this.props.reptype === 'TO FAILURE') {
            return(<> (TO FAILURE)<br/></>)
        }
        if (this.props.reptype === 'SET MULTIPLE') {
            return(<> <b>x {this.props.reps}</b><br/></>)
        }
        if (this.props.reptype === 'SINGLE DISTANCE (m)') {
            return(<> <b>{this.props.reps}m</b><br/></>)
        }
        if (this.props.reptype === 'TIME (min)') {
            return(<> <b>{this.props.reps}min</b></>)
        }
    }
}

export default Reps