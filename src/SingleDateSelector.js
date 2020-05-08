import React, { Component } from 'react'
import MonthDayCounts from './MonthDayCounts.js'
// see RangeDateSelector.css for applicable styling

class SingleDateSelector extends Component{
    render() {
        const months = Object.keys(MonthDayCounts)
        const days = MonthDayCounts[this.props.selectedMonth]
        return(
            <>
            <div className="date-selector">
                <select 
                    key="start-month-selector" 
                    className="month-selector" 
                    onChange={e => this.props.handleSingleDate('month_start', 'month_end', e.target.value)}>
                        {months.map((month, idx) => {
                            return(
                                <option key={idx}>{month}</option>
                            )
                        })}
                </select>
                
                <select 
                    key="start-day-selector" 
                    className="day-selector" 
                    onChange={e => this.props.handleSingleDate('day_start', 'day_end', e.target.value)}>
                    <>{days}</>
                </select>
            
                <select 
                    key="start-year-selector" 
                    className="year-selector" 
                    onChange={e => this.props.handleSingleDate('year_start', 'year_end', e.target.value)}>
                        <option>2020</option>
                        <option>2021</option>
                </select>
            </div>
            </>
        )
    }
}

export default SingleDateSelector