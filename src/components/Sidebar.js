import React, { useState } from 'react'
import timeIcon from '../icons/time.png'
import descriptionIcon from '../icons/description.png'
import Dropdown from './Dropdown'

const Sidebar = ({ times }) => {
    const [sidebar, setSidebar] = useState([])
    const [showBar, setShowBar] = useState(false)
    const [appointmentDate, setAppointmentDate] = useState("")
    const [appointmentTime, setAppointmentTime] = useState("")
    let days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
    let months = ['TAMMI', 'HELMI', 'MAALIS', 'HUHTI', 'TOUKO', 'KESÄ', 'HEINÄ', 'ELO', 'SYYS', 'LOKA', 'MARRAS', 'JOULU']
    //BUTTONS START
    const handleButtonOpen = (event) => {
        setSidebar(event)
        let appointment = new Date(event.id)
        let day = appointment.getDay()
        let end = new Date(event.EndTime)
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
                    <h2 className="monthToday"> {months[new Date().getMonth()]} TODAY</h2>
                    <div className="buttonsAndTimes">
                        <ul>
                            {times.map(item => (
                                <div>
                                    <div className="buttonTime">
                                        <p className="eventTime"> {item.id.substring(11, 16)} </p>
                                        {item.Subject !== "" &&
                                            <button className="buttonBox" onClick={() => handleButtonOpen(item)}>
                                                <p className="subjectName">{item.Subject}</p>
                                                <p className="organizerName">{item.Organizer}</p>
                                            </button>
                                        }
                                        <div className="line" />
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            }
            {
                showBar &&
                <div className="sidebar-opened">
                    <button className="buttonBackBox" onClick={handleButtonClose}>{sidebar.Subject}</button>
                    <div className="alignIcon">
                        <img src={timeIcon} alt=""></img>
                        <p>{appointmentDate}</p>
                    </div>
                    <div className="alignIcon">
                        <img src={timeIcon} alt=""></img><p>{appointmentTime}</p>
                    </div>
                    <Dropdown participants={sidebar.Participants} />
                    <div>
                        <div className="alignIcon">
                            <img src={descriptionIcon} alt=""></img><h2>DESCRIPTION</h2>
                        </div>
                        <p>{sidebar.Description}</p>
                    </div>
                </div>
            }
        </div >
    )
}
export default Sidebar