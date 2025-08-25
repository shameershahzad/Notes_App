import React from 'react'
import './Login.css'
import {Link,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'

function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message,setMessage] = useState('');

    
  const navigate = useNavigate()
  
const handleSubmit = (e) => {
  e.preventDefault()

  axios.post(`${process.env.REACT_APP_API_URL}/account/`,{email,password})
  .then(result => {
 
       console.log(result.data);

    if(result.data.token){
      localStorage.setItem("token",result.data.token)
    }

    
    if(result.data.message === "Success"){
      setMessage("✅ Login Successfully!")
      setTimeout(() => {
        navigate("/home")
      },1000)
    }
  })
  .catch(err => {
    console.log(err);
    if(err?.response?.data?.message === "No user found"){
       setMessage("User not found. Please sign up to create an account.")
      setTimeout(() => {
        navigate("/signUp")
      },1500)
    }else if(err?.response?.data?.message === "Incorrect password"){
      setMessage("Password is incorrect");
      setPassword("")
    }
    else{
      setMessage("Login Failed!")
       setEmail("")
       setPassword("")
    }
  })
}

const handleForgotPass = () => {
     if(!email){
      setMessage("Please enter email to forgot password")
     }else{
        axios.post(`${process.env.REACT_APP_API_URL}/account/verifyEmail`,{email})
        .then((result) => {
                if(result.data.message === "Email found" ){
                  setMessage("✅ Email Verified")
                  setTimeout(() => {
                    navigate(`/forgotPassword/${email}`)
                  },1500)
                }
        })
        .catch((err) => {
          if(err.response?.data?.message === "Email doesn't exist"){
            setMessage("Email doesn't exist!")
            setEmail("")
          }
        })
     }
  }

useEffect(() => {
   if (message) {
     const timeout = setTimeout(() => setMessage(''), 3000);
     return () => clearTimeout(timeout);
   }
 }, [message]);

  return (
    <>
    {message && <h2 style = {{textAlign:"center",marginTop:"20px",
      color:message.startsWith("✅") ? "#4CAF50": "red"}}>{message}</h2>}
     <form onSubmit = {handleSubmit}>
    <div className="loginDiv">
    <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Login</h1>

    <div className="input-group">
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" placeholder="Enter name" className="input-fields"
        onChange={(e) => setEmail(e.target.value)}  />
    </div>

    <div className="input-group">
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)} className="input-fields"
      />
    </div>
    <span style={{ color: "white", display: "block", textAlign: "right", marginRight: "10px",marginTop:"-15px",
      cursor:"pointer" }} onClick = {handleForgotPass}> Forgot Password</span>
  
    <div style={{ textAlign: "center" }}>
      <button type="submit"  className="loginBtn"> Login </button>
    </div>

    <p style={{ textAlign: "center", color: "#fff" }}>
      Don't have an account?{" "}
      <Link to="/SignUp" style={{ color: "white", textDecoration: "underline" }}>Sign Up </Link>
    </p>
  </div>
</form>

    </>
  )
}

export default Login
