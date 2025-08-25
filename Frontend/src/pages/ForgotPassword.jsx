import React, { useEffect, useState } from 'react'
import "./ForgotPassword.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const [updatePassword,setupdatePassword] = useState('')
    const [message,setMessage] = useState('')
    const nav = useNavigate()

    useEffect(() => {
        if(message){
            const timeout = setTimeout(() => setMessage(''),3000)
            return () => clearTimeout(timeout)
        }
    },[message])

    const handleUpdatePass = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/account/updatePassword`,{password:updatePassword})
        .then(result => {
            if(result){
                setMessage("✅ Password updated!")
                setTimeout(() => {
                   nav("/")
                },1000)
            }
        })
        .catch(err => console.log("Error:",err))
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
