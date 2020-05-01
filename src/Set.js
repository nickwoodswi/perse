import React, {Component} from 'react'
import './Set.css'
import AddSets from './AddSets'
import Weight from './Weight'
import Distance from './Distance'
import Reps from './Reps'
import Tempo from './Tempo'
import Rest from './Rest'
import Subrest from './Subrest'
import Exercises from './data/Exercises'

class Set extends Component {
    render() {
        const setExerciseName = []
        if (!this.props.set.id) {
            let nameObj = {
                ex_name: this.props.name
            }
            setExerciseName.push(nameObj)
        }
        else {
            Exercises.map(exercise => {
                if (exercise.id === this.props.set.id) {
                    setExerciseName.push(exercise)
                }
            })
        }
        return(
            <div className="set">
                <div className="set-number">
                    <AddSets 
                        setId={this.props.id}
                        targetSet={this.props.set}
                        addSets={this.props.addSets} />
                </div>
                <div className="set-spec">
                    <b>{setExerciseName[0].ex_name}</b> <Reps reptype={this.props.set.rep_type} reps={this.props.set.reps} />
                    <Weight weight={this.props.set.weight} />
                    <Distance distance={this.props.set.sub_distance} />
                    <Tempo speed={this.props.set.tempo_time} />
                    <Subrest time={this.props.set.subrest_time} />
                    <Rest rest={this.props.set.rest_time} />
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