import React, { useState } from 'react';
import './App.css';
import jsonData from './data/meetings.json';
import Background from './components/Background'
import Sidebar from './components/Sidebar'
import backroundImage from './images/bg-image.jpg';

function App() {

  // variables
  let times = []
  let events = []
  let date = new Date()
  let minute = date.getMinutes()
  let timer = date.getTimezoneOffset() * -1
  date.setMinutes(minute + timer)
  date.setUTCHours(0, 0, 0, 0)
  const bookings = jsonData

  // creates a timeline for the day
  const initializeDay = () => {
    for (let i = 0; i < 24; i++) {
      date.setUTCHours(i)
      date.setUTCMinutes(0)
      times.push({
        id: date.toISOString().slice(0, -5),
        Organizer: "",
        Participants: [],
        Subject: "",
        EndTime: ""
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
  // fills the timeline with events
  //MUISTA POISTAA TURHAT
  const begin = () => {
    for (let i = 0; i < bookings.length; i++) {
      let obj = bookings[i]
      let time = times.find(({ id }) => id === obj.StartTime)
      if (time !== undefined) {
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
  }

  initializeDay()
  begin()


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
  );
}

export default App;
