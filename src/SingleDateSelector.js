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
                <label htmlFor="start-month-selector">Select Month</label>
                <select 
                    id="start-month-selector"
                    key="start-month-selector" 
                    className="month-selector" 
                    onChange={e => this.props.handleSingleDate('month_start', 'month_end', e.target.value)}>
                        {months.map((month, idx) => {
                            return(
                                <option key={idx}>{month}</option>
                            )
                        })}
                </select>
                <label htmlFor="start-day-selector">Select Start Day</label>
                <select 
                    id="start-day-selector"
                    key="start-day-selector" 
                    className="day-selector" 
                    onChange={e => this.props.handleSingleDate('day_start', 'day_end', e.target.value)}>
                    <>{days}</>
                </select>
                <label htmlFor="start-year-selector">Select Start Year</label>
                <select 
                    id="start-year-selector"
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