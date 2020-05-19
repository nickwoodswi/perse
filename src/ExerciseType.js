import React, { Component } from 'react'

class ExerciseType extends Component {
    static defaultProps = {
        types: []
      }
    render() {
        return(
            this.props.types.map(type => {
                if (type.exercise_types_id == this.props.typeId) {
                    return(
                        <>{type.exercise_types_name}</>
                    )
                }
            })
        )
    }
}

export default ExerciseType