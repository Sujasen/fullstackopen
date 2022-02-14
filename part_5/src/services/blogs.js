import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken =>{
  token = `bearer ${newToken}`
}


const postBlog = async dataPacket => {
  
  const config = {
      headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, dataPacket, config)
  return response.data

}

const putBlog = async dataPacket => {
  const config = {
    headers: { Authorization : token }
  }

  const newBlog = {
    author: dataPacket.author,
    likes: dataPacket.likes,
    title: dataPacket.title,
    url: dataPacket.url
  }
  
  const putUrl = baseUrl + '/' + dataPacket.id;
  const response = await axios.put(putUrl, newBlog, config)
  

  return response.data
}

export default { getAll, postBlog, setToken, putBlog }