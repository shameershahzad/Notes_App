import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate()

    const handleLogout = (e) => {
        localStorage.removeItem("token");
        navigate("/")
    }

  return (
    <>
      <div className='navbar'>
            <h1 className="navbar-title"><big>🗒</big><i>NuBook</i></h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </>
  )
}

export default Navbar
