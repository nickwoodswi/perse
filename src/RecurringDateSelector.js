import React, { Component } from 'react'
import MonthDayCounts from './MonthDayCounts'
import './RecurringDateSelector.css'

class RecurringDateSelector extends Component{
    render() {
        const months = Object.keys(MonthDayCounts)
        const startDays = MonthDayCounts[this.props.selectedStartMonth]
        const endDays = MonthDayCounts[this.props.selectedEndMonth]
        return(
            <>
            <div className="range-date-divider">RECURRING EVERY:</div>
            <div className="recurrence-selector">
                <select className="recurrence-selector" onChange={e => this.props.setRecurrance('recurrance', e.target.value)}>
                    <option value="0">SELECT RECURRANCE</option>
                    <option value="1">DAY</option>
                    <option value="2">SECOND DAY</option>
                    <option value="3">THIRD DAY</option>
                    <option value="7">WEEK</option>
                </select>
            </div>
            <div className="range-date-divider">STARTING</div>
            <div className="range-date-selector">
                <div className="date-selector">
                    <select 
                        key="start-month-selector" 
                        className="month-selector" 
                        onChange={e => this.props.handleRecurringDate('month_start', e.target.value)}>
                            {months.map((month, idx) => {
                                return(
                                    <option key={idx}>{month}</option>
                                )
                            })}
                    </select>
                    
                    <select 
                        key="start-day-selector" 
                        className="day-selector" 
                        onChange={e => this.props.handleRecurringDate('day_start', e.target.value)}>
                        <>{startDays}</>
                    </select>
                
                    <select 
                        key="start-year-selector" 
                        className="year-selector" 
                        onChange={e => this.props.handleRecurringDate('year_start', e.target.value)}>
                            <option>SELECT YEAR</option>
                            <option>2020</option>
                            <option>2021</option>
                    </select>
                </div>

                <div className="range-date-divider">THRU</div>

                <div className="date-selector">
                    <select 
                        key="end-month-selector" 
                        className="month-selector" 
                        onChange={e => this.props.handleRecurringDate('month_end', e.target.value)}>
                            {months.map((month, idx) => {
                                return(
                                    <option key={idx}>{month}</option>
                                )
                            })}
                    </select>

                    <select 
                        key="end-day-selector" 
                        className="day-selector" 
                        onChange={e => this.props.handleRecurringDate('day_end', e.target.value)}>
                        <>{endDays}</>
                    </select>

                    <select 
                        key="end-year-selector" 
                        className="year-selector" 
                        onChange={e => this.props.handleRecurringDate('year_end', e.target.value)}>
                            <option>SELECT YEAR</option>
                            <option>2020</option>
                            <option>2021</option>
                    </select>
                </div>
            </div>
            </>
        )
    }
}

export default RecurringDateSelector