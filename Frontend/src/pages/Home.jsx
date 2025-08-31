import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [allnotes, setAllNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [text, setText] = useState('');
  const [message,setMessage] = useState('')

  const API_URL = import.meta.env.VITE_API_URL;  // Vite uses import.meta.env

  // Fetch notes on component mount
  const fetchNotes = () =>{
    const token = localStorage.getItem("token");

    axios.get(`${API_URL}/notes/home`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(result => {
      const notes = result.data.notes.map((note,index) => ({
        ...note,pinned:false,
        originalIndex: index
      }));
      setAllNotes(notes);
      setFilteredNotes(notes);
      console.log("All notes rendered!")
    })
    .catch(err =>{
     console.log("Error fetching notes:", err)
     setMessage("Error fetching notes")
    });
  }

  useEffect(() => {
    fetchNotes()
  }, []);

  // Live search filter
  useEffect(() => {
    if (text.trim() === '') {     
      setFilteredNotes(allnotes); // Show all notes if input is empty
    } else {
      const filtered = allnotes.filter(note =>
        note.title.toLowerCase().includes(text.toLowerCase()) ||
        note.body.toLowerCase().includes(text.toLowerCase()) ||
        note.tag.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [text]);

  // Edit note
  const editNotes = (id) => {
    const found = allnotes.find(note => note._id === id);
    if (found) {
      navigate(`/editNotes/${id}`);
    }
  };

  // Delete note
  const deleteNotes = (id) => {
    const token = localStorage.getItem("token");

    axios.delete(`${API_URL}/notes/deleteNotes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setMessage("✅ Note deleted");
      setAllNotes(prev => prev.filter(note => note._id !== id));
        fetchNotes()
   
    })
    .catch(err => console.log("Error deleting note:", err));
  };

  const pinnedNotesHandle = (_id) => {

  const updatedNotes = allnotes.map(note => {
  if (note._id === _id) {
    let newPinnedValue;

    if (note.pinned === true) {
      newPinnedValue = false;
    } else {
      newPinnedValue = true;
    }

    // Copying all properties of the note (...note)
    const updatedNote = { ...note, pinned: newPinnedValue };
    return updatedNote;
  } else {
    return note;
  }
});

const sortedNotes = [...updatedNotes].sort((a, b) => {
  if (a.pinned === b.pinned) {
    return a.originalIndex - b.originalIndex; // original order
  }
  return b.pinned - a.pinned; // pinned first
});

  setAllNotes(sortedNotes);
  setFilteredNotes(sortedNotes); 
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
    <div className="homeDiv">
      {/* Add Note Button */}
      <div className="add-notes-container">
        <button className="add-notes-btn" onClick={() => navigate("/addNotes")}>
          Add Notes
        </button>
      </div>

      {/* Search Input */}
      <div className="searchContainer">
        
        <input type="text" placeholder="Search notes here..." value={text} className="searchInput"
        onChange={(e) => setText(e.target.value)} />
      </div>

      {/* Notes Display */}
      <div className="notesContainer">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (// Show filtered or all notes
            <div className="note-card" key={index}>
              <div style = {{display:"flex",justifyContent:"space-between",marginTop:"9px"}}>
              <h2>{note.title}</h2>
              <span style = {{marginTop:"10px", transform: note.pinned ? "rotate(-45deg)" : "rotate(0deg)"}} 
              onClick = {() => pinnedNotesHandle(note._id)}>📌</span>
              </div>
              <p>{note.body}</p>  
              <p className="note-tag">{note.tag}</p>
              <div className="iconDiv">
                <span onClick={() => editNotes(note._id)}>✏️</span>
                <span onClick={() => deleteNotes(note._id)}>🗑️</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-notes-message">No notes found.</p>
        )}
      </div>
    </div>
    </>
  );
}

export default Home;
