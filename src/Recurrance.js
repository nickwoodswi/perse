import React, { Component } from 'react'

class Recurrance extends Component {
    static defaultProps = {
        recurrance: 1
      }
    render() {
        if (this.props.recurrance == 1) {
            return(<li>>>Every day</li>)
        }
        if (this.props.recurrance == 2) {
            return(<li>>>Every other day</li>)
        }
        if (this.props.recurrance == 3) {
            return(<li>>>Every 3 days</li>)
        }
        if (this.props.recurrance == 7) {
            return(<li>>>Every week</li>)
        }
    }
}

export default Recurrance