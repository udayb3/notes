const express= require('express')
const cors= require('cors')

// creating an instance of express
const app= express()
app.use( cors() )
app.use( express.json() )

let NOTES= [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: true
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: false
  },
  {
    id: "4",
    content: "Let us check if the post works",
    important: true
  },
  {
    id: "5",
    content: "lets add another",
    important: false
  },
  {
    id: 6,
    content: "lets add other",
    important: true
  },
]


const generateId = () => {
  // note that array can not be directly given as a parameter to the Math.max method so spread ... syntax is used.
  const maxId = NOTES.length > 0
    ? Math.max( ...NOTES.map(n => Number(n.id)) )
    : 0;
    
  return String(maxId + 1)
}

// endpoints
app.get( '/', ( req, res ) => {
  res.send('<h1>Hello world</h1>')
})

app.get( '/api/notes', ( req, res ) => {
  res.json(NOTES)
})

app.get( '/api/notes/:id', (req, res) =>{
  const id= req.params.id
  const note= NOTES.find( ( note ) => note.id==id )
  if ( note ) {
    res.json(note)
  } 
  else {
    res.statusMessage= " The Note is not available."
    res.status( 404 ).end()
  }
})

app.post( '/api/notes', ( req, res ) => {

  const body= req.body;
  if ( !body.content ) {
    return res.status( 400 ).json(
      { 'Error': 'Content is missing' }
    )
  }

  const note= {
    ...body,
    content: body.content,
    important: body.important || false,
    id: generateId()
  }

  NOTES= NOTES.concat( note )
  res.json( note );
})

app.delete( '/api/notes/:id', ( req, res ) => {
  const id= req.params.id;
  NOTES= NOTES.filter( ( note ) => note.id!==id )
  res.status( 204 ).send()
})

const PORT= process.env.PORT || 3001
app.listen( PORT, () =>{
  console.log(`Server is running at Port ${PORT}`);
  
})