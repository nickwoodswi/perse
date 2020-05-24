import React, { Component } from 'react'

class Recurrance extends Component {
    static defaultProps = {
        recurrance: 1
      }
    render() {
        if (this.props.recurrance == 1) {
            return(<li><b>EVERY DAY</b></li>)
        }
        if (this.props.recurrance == 2) {
            return(<li><b>EVERY OTHER DAY</b></li>)
        }
        if (this.props.recurrance == 3) {
            return(<li><b>EVERY THREE DAYS</b></li>)
        }
        if (this.props.recurrance == 7) {
            return(<li><b>EVERY WEEK</b></li>)
        }
    }
}

export default Recurrance