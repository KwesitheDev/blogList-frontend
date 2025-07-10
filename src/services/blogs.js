import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, newObject,config)
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const  remove = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`)
  return res.data
}
export default { getAll,setToken,update,create, remove }