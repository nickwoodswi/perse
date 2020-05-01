import React, { Component } from 'react'

class Rest extends Component {
    render() {
        if (!this.props.rest) {
            return(
                <></>
            )
        }
        else {
            return(
                <> ({this.props.rest}sec rest)</>
            )
        }
    }
}

export default Rest