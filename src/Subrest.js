import React, { Component } from 'react'

class Subrest extends Component {
    render() {
        if (!this.props.time) {
            return(
                <></>
            )
        }
        else {
            return(
                <> {this.props.time}sec rest</>
            )
        }
    }
}

export default Subrest