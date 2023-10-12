// import everything from  actions as api
import {
  FETCH_BY_SEARCH,
  FETCH_ALL,
  CREATE,
  UPDATE,
  LIKE,
  DELETE,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from '../constants/actionTypes.js'
import * as api from '../api/index.js'

//Action Creators are the function that return actions
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    console.log('in action getpost is executed')
    const { data } = await api.fetchPost(id)

    console.log(data)

    dispatch({ type: FETCH_POST, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log('get post error')
    console.log(error)
  }
}

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    console.log('in action getpost is executed')
    const { data } = await api.fetchPosts(page)

    console.log(data)

    dispatch({ type: FETCH_ALL, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log('get post error')
    console.log(error)
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery)
    console.log(data)

    dispatch({ type: FETCH_BY_SEARCH, payload: data }) // from here we are doing a basically thing that we calling reducer
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    console.log('form is in action')
    const { data } = await api.createPost(post)
    console.log(data)

    dispatch({ type: CREATE, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log('error occur during api call')
    console.log(error)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)

    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)
    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id)

    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    console.log(error)
  }
}
