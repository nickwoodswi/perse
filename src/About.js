import React, { Component } from 'react'

class About extends Component {
    render() {
        return(
            <>
            <div className='about-perse-container'>
                <div className='about-perse'>
                <div className="perse-summary"><p><b>Perse</b> is an easy-to-use workout record and builder for coaches, athletes, and personal trainers.</p></div>

                <p>Previously built workouts are stored in the Perse database for quick assignment. Select one, and assign it to an athlete on a single date, a range of dates, or on recurring dates.</p>

                <p>Trying something new or leveling up? Build a new workout by selecting and adding exercises from those already added to the database. Or, name and add your own exercise before setting intensity by weight, distance, speed, tempo, and/or rest.</p>

                <p>Review the programs you've set by viewing workouts assigned to any athlete in the system.</p>

                <p>Perse was originally built with ReactJS for Mike Woods, a former Olympic speedskater and current youth speedskating coach for U.S. Speedskating.</p>

                <p>©2020 Nick Woods, nick.woods.wi@gmail.com</p>
                </div>
            </div>
            </>
        )
    }
}

export default About