import Note from './components/Note.jsx'
import Error from './components/Error.jsx'
import { useState, useEffect } from 'react'
import noteService from './services/note.js'

const App= ( )=>{
  const [ notes, setNotes ]= useState( [] )
  const [ new_note, setNewNote ]= useState( "" )
  const [ showNotes, setShowNotes ]= useState(true)
  const [ errorMsg, setErrorMsg ]= useState(null)

  const hook= ()=>{
    noteService
      .getAll()
      .then( ( ini_notes ) => {
        setNotes( ini_notes )
      });
      console.log( 'rendererd notes successfully' )
  }
  useEffect( hook, [] )

  const notes_to_show= showNotes? notes : notes.filter( notes=> notes.important )

  const addNote= ( event )=>{
    event.preventDefault()
    const my_new_note= {
      id: notes.length+1,
      content: new_note,
      important: Math.random()<0.5
    }

    // sending the new note to the server
    noteService
      .createOne( my_new_note )
      .then( ( new_note ) => {
        setNotes( notes.concat( new_note  ) )
        setNewNote( '' )
      })
    
  }

  const handleNoteChange= (event)=>{
    setNewNote( event.target.value )
  }

  const handleImportanceChange= ( noteId )=>{

    const note = notes.find( n => n.id === noteId )
    const changedNote = { ...note, important: !note.important }

    noteService
      .updateOne( changedNote, noteId )
      .then( ( data ) => {
        setNotes( notes.map(n => n.id === noteId ? data : n) )
      })
      .catch( ()=>{
        setErrorMsg(`Note ${note.content} was already removed from the server`)
        setTimeout( () =>{
            setErrorMsg(null)
          },5000)
        setNotes( notes.filter( n => n.id !== noteId ) )
      })
    
  }

  return (
    <div>
      <h1>My Notes</h1>
      <Error message={errorMsg}/>
      <div>
        <button
          onClick={ ()=>setShowNotes( !showNotes ) }
        >Show { showNotes?'Important':'All' }</button>
      </div>
      <ul>
        { notes_to_show.map( note =>
        <Note key={note.id} note={note} toggleImportance={ ()=>handleImportanceChange(note.id) } />
        )}  
      </ul>
      <form onSubmit={addNote}>
        <input value={new_note} onChange={ handleNoteChange } placeholder='Enter something'/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App;