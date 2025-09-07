import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers : { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = async (id) => {
  // was getting an error here as I wasn't sending the token to the request for deletion
  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default {
  getAll,
  create,
  update,
  setToken,
  remove
}