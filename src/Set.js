import React, {Component} from 'react'
import './Set.css'
import AddSets from './AddSets'
import Weight from './Weight'
import Distance from './Distance'
import Reps from './Reps'
import Tempo from './Tempo'
import Rest from './Rest'
import Subrest from './Subrest'

class Set extends Component {
    render() {
        let exerciseName = []
        this.props.exerciseTypes.map(exerciseType => {
            if (exerciseType.exercise_types_id == this.props.set.exercise_types_id) {
                exerciseName.push(exerciseType.exercise_types_name)
            }
        })
        return(
            <div className="set">
                <div className="exercise-summary">
                    <div className="set-number">
                        <AddSets 
                            setId={this.props.id}
                            targetSet={this.props.set}
                            addSets={this.props.addSets} />
                    </div>
                    <div className="set-spec">
                        <b>{this.props.set.exercise_types_name}</b> <Reps reptype={this.props.set.rep_type} reps={this.props.set.reps} />
                        <Weight weight={this.props.set.weight} />
                        <Distance distance={this.props.set.sub_distance} />
                        <Tempo speed={this.props.set.tempo_time} />
                        <Subrest time={this.props.set.subrest_time} />
                        <Rest rest={this.props.set.rest_time} />
                    </div>
                </div>
                <div className="set-edit-buttons">
                    <button 
                        onClick={() => this.props.moveSet(this.props.id, -1)}
                        className="move-set-button">
                            UP</button>
                    <button 
                        onClick={() => this.props.moveSet(this.props.id, 1)}
                        className="move-set-button">
                            DOWN</button>
                    <button 
                        onClick={() => this.props.deleteSet(this.props.id)} 
                        className="delete-set-button">
                            DELETE</button>
                </div>
            </div>
        )
    }
}

export default Set