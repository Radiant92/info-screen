import React, { useState } from 'react'
import timeIcon from '../icons/time.png'
import personIcon from '../icons/person.png'
import descriptionIcon from '../icons/description.png'

const Sidebar = ({ times }) => {
    const [sidebar, setSidebar] = useState([])
    const [showBar, setShowBar] = useState(false)
    const [appointmentDate, setAppointmentDate] = useState("")
    const [appointmentTime, setAppointmentTime] = useState("")
    let days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
    let months = ['TAMMI', 'HELMI', 'MAALIS', 'HUHTI', 'TOUKO', 'KESÄ', 'HEINÄ', 'ELO', 'SYYS', 'LOKA', 'MARRAS', 'JOULU']
    //BUTTONS START
    const handleButtonOpen = (item) => {
        setSidebar(item)
        let appointment = new Date(item.id)
        let day = appointment.getDay()
        let end = new Date(item.EndTime)
        setAppointmentDate(days[day] + ", " + appointment.getDate() + "." + appointment.getMonth() + "." + appointment.getFullYear())
        setAppointmentTime(appointment.toString().substring(15, 21) + " TO " + end.toString().substring(15, 21))
        setShowBar(true)
    }
    const handleButtonClose = () => {
        setShowBar(false)
    }
    //BUTTONS END
    return (
        <div>
            {
                !showBar &&
                <div className="sidebar">
                    <p className="roomName">Conference room</p>
                    <h2> {months[new Date().getMonth()]} TODAY</h2>
                    <ul>
                        {times.map(item => (
                            <div>

                                <button className="buttonBox" onClick={() => handleButtonOpen(item)}>
                                    <p className="subjectName">{item.Subject}</p>
                                    <p className="organizerName">{item.Organizer}</p>
                                </button>
                                <p className="time">{item.id.slice(11, -3)}</p>
                                <div className="line" />
                            </div>
                        ))}
                    </ul>
                </div>
            }
            {
                showBar &&
                <div className="sidebar">
                    <button className="buttonBackBox" onClick={handleButtonClose}>{sidebar.Subject}</button>

                    <div className="alignIcon">
                        <img src={timeIcon}></img>
                        <p>{appointmentDate}</p>
                    </div>
                    <div className="alignIcon">
                        <img src={timeIcon}></img><p>{appointmentTime}</p>
                    </div>


                    <div className="dropdown">
                        <button className="dropdownButton">
                            <div className="alignIcon">
                                <img src={personIcon}></img><h2>PARTICIPANTS</h2>
                            </div>
                        </button>
                        <div>
                            {sidebar.Participants.map(partisipant => (
                                <div className="dropdownContent">
                                    <h4>{partisipant.Name}</h4>
                                    <h5>{partisipant.Title}</h5>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="alignIcon">
                            <img src={descriptionIcon}></img><h2>DESCRIPTION</h2>
                        </div>
                        <p>{sidebar.Description}</p>

                    </div>
                </div>
            }
        </div>
    )
}
export default Sidebar