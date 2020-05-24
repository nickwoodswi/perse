import React, { Component } from 'react'
import './Rest.css'

class Rest extends Component {
    render() {
        if (!this.props.rest) {
            return(
                <><div className="set-rest"><i>(No rest after set)</i></div></>
            )
        }
        else {
            return(
                <><div className="set-rest"><i>({this.props.rest}sec rest after set)</i></div></>
            )
        }
    }
}

export default Rest