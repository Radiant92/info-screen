import React, { useState } from 'react'
import personIcon from '../icons/person.png'
const Dropdown = ({ participants }) => {
    const [open, setOpen] = useState(false)

    const HandleOpenClicked = () => {
        setOpen(!open)
    }
    return (
        <div className="dropdown">
            <button className="dropdownButton" onClick={HandleOpenClicked}>
                <div className="alignIcon">
                    <img src={personIcon} alt=""></img>
                    <h2>PARTICIPANTS</h2>
                    <h2> ({participants.length})</h2>
                </div>
            </button>
            {open && <div>
                {participants.map(person => (
                    <div>
                        <p>{person.Name}</p>
                        <p>{person.Title}</p>
                    </div>
                ))}
            </div>}
        </div>
    )
}
export default Dropdown