import React, { useEffect, useState } from 'react'
import './EditNotes.css'
import axios from "axios"
import { useParams,useNavigate } from 'react-router-dom'

function EditNotes() {
     const {id} = useParams()
     const [editData,seteditData] = useState({title:"",body:"",tag:""})
     const [originalData,setoriginalData] = useState({title:"",body:"",tag:""})
     const [message,setMessage] = useState('')

     const API_URL = import.meta.env.VITE_API_URL;  // Vite uses import.meta.env
     
     const navigate = useNavigate()
     const token = localStorage.getItem("token")

const editNotesData = (id) => {
  if(editData.title === originalData.title && editData.body === originalData.body &&
    editData.tag === originalData.tag){
    setMessage("Nothing update")
    setTimeout(() => {
        navigate("/home")
    },1000)
  }
  else{
    
   axios.put(`${API_URL}/notes/editNotes/${id}`,editData,{headers:{Authorization:`Bearer ${token}`}})
   .then(() => {
      setMessage("✅ Notes Updated!")
      setTimeout(() => {
        navigate("/home")
      },1000)
  })
  .catch(err => console.log(err))
  }
}

useEffect(() => {
 axios.get(`${API_URL}/notes/editNotes/${id}`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
 .then(result => {
       seteditData({
        title:result.data.title,
        body:result.data.body,
        tag:result.data.tag
       })
       setoriginalData({
        title:result.data.title,
        body:result.data.body,
        tag:result.data.tag
       })
})
 .catch(err => {
  console.log(err);
  setMessage("Error fetching notes")
 })
},[id,navigate])

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
      <div className='notesDiv' style = {{ height: "400px",width: "370px"}}> 
        <h1 className='form-heading'>Edit Notes</h1>
         <div className='input-group'>
            <label>Title:</label>
            <input type = "text" placeholder='Enter title..' name = "title" className='input-fields'
             onChange={(e) => seteditData({...editData,title:e.target.value})} value={editData.title} style = {{fontSize:"15px"}}/>
         </div>

           <div className='input-group'>
            <label>Body:</label>
            <textarea type = "text" placeholder='Enter body..' name = "body" className='input-fields'
        onChange={(e) => seteditData({...editData,body:e.target.value})} style = {{height:"70px",fontSize:"15px"}}  value={editData.body}/>
         </div>

         <div className='input-group'>
            <label>Tag:</label>
            <input type = "text" placeholder='Enter tag..' name = "tag" className='input-fields' value={editData.tag}
             onChange={(e) => seteditData({...editData,tag:e.target.value})} style = {{marginBottom:"2px",fontSize:"15px"}}  />
         </div>

     <div className="form-action">
      <button type="submit" className="form-button" onClick = {() => editNotesData(id)} >Update</button>
    </div>
        
       </div>
      
    </>
  )
}

export default EditNotes
