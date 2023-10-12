import axios from 'axios'

const API = axios.create({ baseURL: 'https://pdqa-project-production.up.railway.app/' })

API.interceptors.request.use((req) => {
  console.log(JSON.parse(JSON.stringify(req.headers)))

  if (localStorage.getItem('profile'))
    req.headers.Authorizaton = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`

  // console.log(JSON.parse(JSON.stringify(req.headers?.Authorization)));

  console.log(req.headers.Authorizaton)
  return req
})

export const fetchPosts = (page) => API.get(`/post?page=${page}`)

export const fetchPost = (id) => API.get(`/post/${id}`)

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/post/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags
    }`,
  )

export const createPost = (newPost) => API.post('/post', newPost)

export const updatePost = (id, updatedPost) =>
  API.patch(`/post/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/post/${id}`)

export const likePost = (id) => API.patch(`/post/${id}/likePost`)

export const signIn = (formData) => API.post('/user/signin', formData)

export const signUp = (formData) => API.post('/user/signup', formData)
