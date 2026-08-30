import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import './Layout.css'

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
