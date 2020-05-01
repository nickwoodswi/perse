import React, { Component } from 'react'

class Tempo extends Component {
    render() {
        if (!this.props.speed){
            return(
                <></>
            )
        }
        else {
            return(
                <> {this.props.speed}sec/rep</>
            )
        }
    }
}

export default Tempo