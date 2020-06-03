import React, { Component } from 'react'
import MonthDayCounts from './MonthDayCounts'
import './RangeDateSelector.css'

class RangeDateSelector extends Component{
    render() {
        const months = Object.keys(MonthDayCounts)
        const startDays = MonthDayCounts[this.props.selectedStartMonth]
        const endDays = MonthDayCounts[this.props.selectedEndMonth]
        return(
            <>
            <div className="range-date-selector">
                <div className="date-selector">
                    <label htmlFor="start-month-selector">Select Start Month</label>
                    <select id="start-month-selector"
                        key="start-month-selector" 
                        className="month-selector" 
                        onChange={e => this.props.handleRangeDate('month_start', e.target.value)}>
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
                        onChange={e => this.props.handleRangeDate('day_start', e.target.value)}>
                        <>{startDays}</>
                    </select>
                    <label htmlFor="start-year-selector">Select Start Year</label>
                    <select 
                        id="start-year-selector"
                        key="start-year-selector" 
                        className="year-selector" 
                        onChange={e => this.props.handleRangeDate('year_start', e.target.value)}>
                            <option>SELECT YEAR</option>
                            <option>2020</option>
                            <option>2021</option>
                    </select>
                </div>

                <div className="range-date-divider">THRU</div>

                <div className="date-selector">
                    <label htmlFor="end-month-selector">Select End Month</label>
                    <select 
                        id="end-month-selector"
                        key="end-month-selector" 
                        className="month-selector" 
                        onChange={e => this.props.handleRangeDate('month_end', e.target.value)}>
                            {months.map((month, idx) => {
                                return(
                                    <option key={idx}>{month}</option>
                                )
                            })}
                    </select>
                    <label htmlFor="end-day-selector">Select End Day</label>
                    <select 
                        id="end-day-selector"
                        key="end-day-selector" 
                        className="day-selector" 
                        onChange={e => this.props.handleRangeDate('day_end', e.target.value)}>
                        <>{endDays}</>
                    </select>
                    <label htmlFor="end-year-selector">Select End Year</label>
                    <select 
                        id="end-year-selector"
                        key="end-year-selector" 
                        className="year-selector" 
                        onChange={e => this.props.handleRangeDate('year_end', e.target.value)}>
                            <option>2020</option>
                            <option>2021</option>
                    </select>
                </div>
            </div>
            </>
        )
    }
}

export default RangeDateSelector