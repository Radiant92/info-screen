import React, { useState, useRef } from 'react'
import backroundImage from '../images/bg-image.jpg';

const Background = ({ eventList }) => {
    const [upcomingEvents, setUpcomingEvents] = useState(eventList)
    // const [currentEvent, setCurrentEvent] = useState(null)
    const [roomInUse, setRoomInUse] = useState(false)
    const [firstTime, setFirstTime] = useState(0)
    const currentEvent = useRef()

    const removeUpComingEvents = (list) => {
        list.shift()
        setUpcomingEvents(list)
    }
    const updateUpComingEvents = (list) => {
        setUpcomingEvents(list)
    }
    const updateCurrentEvent = (event) => {
        // setCurrentEvent(event)
        currentEvent.current = event
        console.log(currentEvent.current)
    }
    const updateRoomInUse = (inUse) => {
        setRoomInUse(inUse)
    }

    const beginTimer = (event) => {
        updateCurrentEvent(event)
        updateRoomInUse(true)
        let timeLeft = new Date(event.EndTime) - new Date()
        if (timeLeft > 0) {
            setTimeout(function () { endTimer() }, timeLeft)
        } else {
            setTimeout(function () { endTimer() }, 0)
        }
    }
    const endTimer = () => {
        updateCurrentEvent(null)
        updateRoomInUse(false)
        if (upcomingEvents.length > 0) {
            let nextEvent = upcomingEvents[0];
            removeUpComingEvents(upcomingEvents)
            let timeLeft = new Date(nextEvent.id) - new Date()
            if (timeLeft > 0) {
                setTimeout(function () { beginTimer(nextEvent) }, timeLeft)
            } else {
                setTimeout(function () { beginTimer(nextEvent) }, 0)
            }
        }
    }
    if (firstTime === 0) {
        setFirstTime(1)
        endTimer()
    }

    return (
        <div className="App">
            <img src={backroundImage} className="App-backround" alt="backround" />
            <div className="a">
                <h1>current meeting</h1>
                {roomInUse && < h1 > {currentEvent.current.Subject} </h1>}
                <ul>
                    {upcomingEvents.map(item => (
                        <div>
                            <p>{item.Subject}</p>
                        </div>
                    ))}
                </ul>
                <p>{upcomingEvents.length}</p>

            </div>
        </div>
    )
}

export default Background