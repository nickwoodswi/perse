import React, { Component } from 'react'

class Distance extends Component {
    render() {
        if (!this.props.distance) {
            return(
                <></>
            )
        }
        else {
            return(
                <> {this.props.distance}m</>
            )
        }
    }
}

export default Distance