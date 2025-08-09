import React from 'react'
import './SignUp.css'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'

function SignUp() {
 const [name,setName] = useState('')
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
 const [confirmPassword,setconfirmPassword] = useState('')
 const [message,setMessage] = useState('')
 const navigate = useNavigate()

 const handleSubmit = (e) => {
  e.preventDefault();

 
  if (!name || !email || !password || !confirmPassword) {
    setMessage("All fields are required");
    return;
  }


  if (password !== confirmPassword) {
    setMessage("Password must be same to confirmPassword");
    setPassword('');
    setconfirmPassword('');
    return;
  }

 
  axios.post("http://localhost:3001/account/signUp", {
    name,
    email,
    password
  })
  .then(result => {
    console.log(result);
    if(result.data.message === "SignUp successfully!"){
      setMessage("✅ SignUp successfully!");
      setTimeout(() => {
        navigate("/");
      },1000)
    }
  })
  .catch(err => {
    console.log(err);
    if(err.response?.data?.message === "Email already exist"){
      setMessage("Email already exist")
      setEmail("")
    }else{
      setMessage("SignUp failed!");
      setName("");
      setEmail("");
      setPassword("");
      setconfirmPassword("");
    }
  });
};

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
     <form onSubmit={handleSubmit}>
  <div className="signupDiv">
    <h1 className="form-heading">SignUp</h1>

    <div className="input-group">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} placeholder="Enter name"
        onChange={(e) => setName(e.target.value)} className="inputField" />
    </div>

    <div className="input-group">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)} className="inputField" />
    </div>

    <div className="input-group">
      <label htmlFor="password">Password:</label>
      <input  type="password" id="password"  value={password} placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)} className="inputField" />
    </div>

    <div className="input-group">
      <label htmlFor="password">Confirm Password:</label>
      <input type="password" id="confirmPassword" value={confirmPassword} placeholder="Enter confirm password"
        onChange={(e) => setconfirmPassword(e.target.value)} className="inputField"/>
    </div>

    <div className="form-action">
      <button type="submit" className="form-button">SignUp</button>
    </div>

    <p className="form-footer">
      Already have an account?
      <Link to="/" className="form-link"> Login</Link>
    </p>
  </div>
</form>

    </>
  )
}

export default SignUp
