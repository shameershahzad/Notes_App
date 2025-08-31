import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'
import './AddNotes.css'
import { useNavigate } from 'react-router-dom';


function AddNotes() {
  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');
  const [tag,setTag] = useState('');
  const [message,setMessage] = useState('')
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_URL;  // Vite uses import.meta.env

  const submitNotes = () => {
      const token = localStorage.getItem("token");
    axios.post(`${API_URL}/notes/addNotes`,{title,body,tag},
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(result => {
        if(!tag || !body || !title ){
            setMessage("All fields must be filled.")
            return;
        }
        if(result.data.message === "Notes Added!"){
            console.log(result.data)
            setMessage("✅ Notes added!")
            setTimeout(() => {
              navigate("/home")
            },1000)
        }
        else{
            setMessage("Notes not added")
        }
    })
    .catch(err => console.log(err))
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
       <div className='notesDiv' style = {{height:"400px",width: "370px"}}> 
        <h1 className='form-heading'>Add Notes</h1>
         <div className='input-group'>
            <label>Title:</label>
            <input type = "text" placeholder='Enter title..' name = "title" className='inputField'
             onChange={(e) => setTitle(e.target.value)} value={title} style = {{fontSize:"15px"}}/>
         </div>

           <div className='input-group'>
            <label>Body:</label>
            <textarea type = "text" placeholder='Enter body..' name = "body" className='inputField'
             onChange={(e) => setBody(e.target.value)} style = {{height:"70px",fontSize:"15px"}}  value={body}/>
         </div>

         <div className='input-group'>
            <label>Tag:</label>
            <input type = "text" placeholder='Tag must start with #' name = "tag" className='inputField'
             onChange={(e) => setTag(e.target.value)} style = {{marginBottom:"15px",fontSize:"15px"}}  value={tag}/>
         </div>

     <div className="form-action">
      <button type="submit" className="form-button" onClick = {submitNotes}>Add</button>
    </div>
        
       </div>
      
    </>
  )
}

export default AddNotes
