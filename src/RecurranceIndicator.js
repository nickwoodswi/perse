import React, { Component } from 'react'

class RecurranceIndicator extends Component {
    static defaultProps = {
        recurrance: 1
      }
    render() {
        if (this.props.recurrance == 0) {
            return(<></>)
        }
        if (this.props.recurrance == 1) {
            return(<>DAY</>)
        }
        if (this.props.recurrance == 2) {
            return(<>2nd DAY</>)
        }
        if (this.props.recurrance == 3) {
            return(<>3rd DAY</>)
        }
        if (this.props.recurrance == 7) {
            return(<>WEEK</>)
        }
    }
}

export default RecurranceIndicator