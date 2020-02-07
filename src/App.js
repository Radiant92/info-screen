import React, { useState } from 'react';
import './App.css';
import jsonData from './data/meetings.json';
import Background from './components/Background'
import Sidebar from './components/Sidebar'
import backroundImage from './images/bg-image.jpg';


function App() {
  const [update, setUpdate] = useState(false)

  //all times.
  let times = []

  //all events.
  let events = []

  //for date manipulation.
  let date = new Date()
  let minute = date.getMinutes()
  let timer = date.getTimezoneOffset() * -1
  date.setMinutes(minute + timer)
  date.setUTCHours(0, 0, 0, 0)

  //jsonData.
  const bookings = jsonData

  // creates a timeline for the day.
  const initializeDay = () => {
    for (let i = 0; i < 24; i++) {
      date.setUTCHours(i)
      date.setUTCMinutes(0)
      times.push({
        id: date.toISOString().slice(0, -5),
        Organizer: "",
        Participants: [],
        Subject: "",
        EndTime: "",
        Description: ""
      })
      date.setUTCMinutes(30)
      times.push({
        id: date.toISOString().slice(0, -5),
        Organizer: "",
        Participants: [],
        Subject: "",
        EndTime: "",
        Description: ""
      })
    }
  }

  // fills the timeline with events and filters out redundant times.
  //DOESNT WORK IF EVENT GOES PAST MIDNIGHT
  const begin = () => {
    let today = new Date()
    for (let i = 0; i < bookings.length; i++) {
      let obj = bookings[i]
      let eventDay = new Date(obj.StartTime)
      let time = times.find(({ id }) => id === obj.StartTime)
      let compareDate1 = today.getDay() + today.getMonth() + today.getFullYear()
      let compareDate2 = eventDay.getDay() + eventDay.getMonth() + eventDay.getFullYear()

      if (time !== undefined && compareDate1 === compareDate2) {
        times = times.filter(t => t.id <= obj.StartTime || t.id >= obj.EndTime)
        time.Subject = obj.Subject
        time.Organizer = obj.Organizer
        time.EndTime = obj.EndTime
        if (obj.Participants !== null) {
          time.Participants = obj.Participants
        }
        time.Description = obj.Description
        events.push(time)
      }
    }
    let tomorrow = new Date().setHours(24, 0, 0, 0) - today
    let newDay = setTimeout(function () { startNextDay() }, tomorrow)
  }
  initializeDay()
  begin()

  const startNextDay = () => {
    initializeDay()
    begin()
    setUpdate(!update)
  }

  return (
    <div>
      <div className="background">
        <img className="background" src={backroundImage} alt=""></img>
      </div>
      <div className="center">
        <Background eventList={events} />
      </div >
      <div className="rigthSide">
        <Sidebar times={times} />
      </div>
    </div>
  )
}

export default App;
