import React, { Component } from 'react'
import MonthDayCounts from './MonthDayCounts'
import './RecurringDateSelector.css'
import RecurranceIndicator from './RecurranceIndicator'

class RecurringDateSelector extends Component{
    render() {
        const months = Object.keys(MonthDayCounts)
        const startDays = MonthDayCounts[this.props.selectedStartMonth]
        const endDays = MonthDayCounts[this.props.selectedEndMonth]
        return(
            <>
            <div className="range-date-divider">RECURRING EVERY:</div>
            <div className="recurrence-selectors">
                <div 
                    className="recurrence-selector"
                    onClick={() => this.props.setRecurrance('recurrance', 1)}>DAY</div>
                <div 
                    className="recurrence-selector"
                    onClick={() => this.props.setRecurrance('recurrance', 2)}>2nd DAY</div>
                <div 
                    className="recurrence-selector"
                    onClick={() => this.props.setRecurrance('recurrance', 3)}>3rd DAY</div>
                <div 
                    className="recurrence-selector"
                    onClick={() => this.props.setRecurrance('recurrance', 7)}>WEEK</div>
            </div>
            <div className="recurrence-indicator">
                <RecurranceIndicator 
                    recurrance={this.props.recurrance} />
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