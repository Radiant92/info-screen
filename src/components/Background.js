import React, { useState, useRef } from 'react'

const Background = ({ eventList }) => {
    const [upcomingEvents, setUpcomingEvents] = useState(eventList)
    const [roomInUse, setRoomInUse] = useState(false)
    const [firstTime, setFirstTime] = useState(0)
    const [updateRender, setUpdateRender] = useState(0)
    const currentEvent = useRef()
    const currentPercentage = useRef()

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
        updateTimeLeft()
        removeUpComingEvents(upcomingEvents)
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
            let timeLeft = new Date(nextEvent.id) - new Date()
            if (timeLeft > 0) {
                setTimeout(function () { beginTimer(nextEvent) }, timeLeft)
            } else {
                setTimeout(function () { beginTimer(nextEvent) }, 0)
            }
        }
    }
    const updateTimeLeft = () => {
        let totalTime = new Date(currentEvent.current.EndTime) - new Date(currentEvent.current.id)
        let time = new Date() - new Date(currentEvent.current.id)
        let percentage = 100;
        if ((totalTime > 0 && time > 0) && time < totalTime) {
            percentage = (time / totalTime) * 100
        }
        if (percentage >= 0 && percentage < 100) {
            let timeLeftTimer = setTimeout(function () { updateTimeLeft() }, 60000)
            setUpdateRender(percentage)
        }
        percentage = percentage.toFixed()
        currentPercentage.current = percentage + "%"
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
                    {roomInUse &&
                        <div className="timeAndBar"><p className="time">{new Date(currentEvent.current.id).toString().substring(15, 21)} </p>
                            <div className="bar">
                                <span className="bar" style={{ width: currentPercentage.current }}> </span>
                            </div>
                            <p className="time">{new Date(currentEvent.current.EndTime).toString().substring(15, 21)}</p>
                        </div>}

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
        </div >
    )
}

export default Background