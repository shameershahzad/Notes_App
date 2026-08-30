import React, { useEffect, useState } from 'react'
import "./ForgotPassword.css"
import axios from 'axios'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

function ForgotPassword() {
    const [updatePassword,setupdatePassword] = useState('')
    const [message,setMessage] = useState('')
    const nav = useNavigate()
    const {email} = useParams()
    const location = useLocation()
    const resetToken = location.state?.resetToken

    const API_URL = import.meta.env.VITE_API_URL;  // Vite uses import.meta.env


    useEffect(() => {
        if(message){
            const timeout = setTimeout(() => setMessage(''),3000)
            return () => clearTimeout(timeout)
        }
    },[message])

    useEffect(() => {
        if(!resetToken){
            setMessage("Please verify your email again")
            const timeout = setTimeout(() => nav("/"),1500)
            return () => clearTimeout(timeout)
        }
    },[resetToken, nav])

    const handleUpdatePass = () => {
        if(!updatePassword.trim()){
            setMessage("Please enter a new password")
            return
        }
        axios.put(`${API_URL}/account/updatePassword/${email}`,{newPassword:updatePassword, resetToken})
        .then(result => {
            if(result){
                setMessage("✅ Password updated!")
                setTimeout(() => {
                   nav("/")
                },1000)
            }
        })
        .catch(err => setMessage(err?.response?.data?.message || "Something went wrong"))
    }
  return (
    <>
     {message && <h2 style = {{textAlign:"center",color:message.startsWith("✅") ? "green":"red"}}>{message}</h2>}
    <div className='forgotPassDiv'>
     <h1 className='Form-Title'>Forgot Password</h1>
     <input type = "password" value = {updatePassword} className='Input-Field' placeholder='Forgot Password...'
     onChange={(e) => setupdatePassword(e.target.value)} /> 
       <button className='updateBtn' onClick={handleUpdatePass}>Update Password</button>
    </div>
    </>
  )
}

export default ForgotPassword
