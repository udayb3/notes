const express= require( 'express' )
const morgan= require( 'morgan' )
const cors= require('cors');

const app= express();
app.use( cors() );
app.use( express.static('dist') )
app.use( express.json() );
app.use( morgan( ( tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res( req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' ')
}));

const generateId= ()=>{
  let val= Math.max( ...(persons.map( person => Number(person.id) ) ) )
  return String(val+1);
}

let persons= [
  { 
    id: "1",
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: "2",
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: "3",
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: "4",
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

// get the main page of the application
app.get( '/', ( req, res ) => {
  res.send( '<h1>Phonebook</h1>' )
})

// get the json data of people in the phonebook
app.get( '/api/persons', ( req, res ) => {
  res.json( persons );
})

// getting the info about the phonebook
app.get( '/info', ( req, res ) => {
  const today= new Date()
  const showDate=  today.toString(); 
  
  res.send(
    `
      <h1>Phonebook has ${persons.length} people.</h1>
      <h1>${showDate}</h1>
    `
  )
})

// get an individual person with his id
app.get( '/api/persons/:id', ( req, res ) => {
  const id= req.params.id;
  const person= persons.find( ( person ) => person.id===id )
  if ( !person ) {
    res.statusMessage= "Sorry, this person is not saved in the phonebook"
    return res.status(404).end();
  }
  res.json( person );
})

// post the details of a new person
app.post( '/api/persons', ( req, res ) => {
  const body= req.body;
  
  if ( !( body.name && body.number ) ) {
    return res.status( 400 ).json(
      { Error: 'Data is missing' }
    )
  }

  const isName= persons.find( ( person ) => person.name === body.name )
  if ( isName ) {
    return res.status( 400 ).json(
      { Error: 'Name must not be same' }
    )
  }

  const person= {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons= persons.concat( person )
  res.json( person )
})

// deleting a particular person
app.delete( '/api/persons/:id', ( req, res ) => {
  const id= req.params.id;
  persons= persons.filter( ( person ) => person.id!==id )
  res.status( 204 ).send()
})

// setting up the listening to the server
const PORT=  process.env.PORT || 3001
app.listen( PORT, () =>{
  console.log(`Server is running at Port ${PORT}`);
})
