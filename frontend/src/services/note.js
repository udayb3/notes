import axios from 'axios'

const baseURL= 'http://localhost:3001/api/notes'

const getAll= () =>  {
  return axios
    .get( baseURL )
    .then( ( res ) =>{
      return res.data;
    })
}

const createOne= ( newObject ) => { 
  return axios
    .post( baseURL, newObject )
    .then( ( res ) => {
      return res.data;
    })

}

const updateOne= ( id, newObject ) => {
  return axios
    .put( `${baseURL}/${id}`,newObject )
    .then( ( res ) =>{
      return res.data;      
    } )
}

export default { 
  getAll: getAll, 
  createOne: createOne, 
  updateOne: updateOne,
  baseURL: baseURL
}
