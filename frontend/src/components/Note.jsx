
const Note= ( { note, toggleImportance} )=>{
  const label= note.important
    ?'make irrelevant'
    :'make relevant';

  return ( 
    <>
      <li>{note.content} <button onClick={toggleImportance}>{label}</button> </li>
    </>
  )
}

export default Note;