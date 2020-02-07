import React, { useState, useRef } from 'react'

const Background = ({ eventList }) => {
    const [upcomingEvents, setUpcomingEvents] = useState(eventList)
    const [roomInUse, setRoomInUse] = useState(false)
    const [firstTime, setFirstTime] = useState(0)
    const currentEvent = useRef()

    const removeUpComingEvents = (list) => {
        list.shift()
        setUpcomingEvents(list)
    }
    const updateCurrentEvent = (event) => {
        currentEvent.current = event
    }
    const updateRoomInUse = (inUse) => {
        setRoomInUse(inUse)
    }

    const beginTimer = (event) => {
        updateCurrentEvent(event)
        updateRoomInUse(true)
        removeUpComingEvents(upcomingEvents)
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
        <div>
            <div className="a">
                <div>
                    <p className="currentMeeting">CURRENT MEETING</p>
                    {roomInUse && < h1 className="currentMeeting" > {currentEvent.current.Subject} </h1>}
                    {roomInUse && <p className="time">{new Date(currentEvent.current.id).toString().substring(15, 21)}{new Date(currentEvent.current.EndTime).toString().substring(15, 21)}</p>}
                    {roomInUse && <p className="currentMeeting">{currentEvent.current.Organizer}</p>}
                </div>
            </div>
            <div className="bottomCenter">
                <div className="gridContainer">
                    {upcomingEvents.map(event => (
                        <button className="item">{event.Subject}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Background