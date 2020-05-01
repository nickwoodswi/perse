import React, { Component } from 'react'

class Weight extends Component {
    render() {
        if (!this.props.weight) {
            return(
                <></>
            )
        }
        else {
            return(
                <> {this.props.weight}kg</>
            )
        }
    }
}

export default Weight