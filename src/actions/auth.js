import { AUTH } from '../constants/actionTypes.js'
import * as api from '../api/index.js'

export const signin = (formData, navigation) => async (dispatch) => {
  try {
    // log in the user
    console.log('action is performed')
    const { data } = await api.signIn(formData)
    console.log(data)
    dispatch({ type: AUTH, data })
    navigation('/')
  } catch (error) {
    console.log(error)
  }
}

export const signup = (formData, navigation) => async (dispatch) => {
  try {
    // signup the user
    const { data } = await api.signUp(formData)

    dispatch({ type: AUTH, data })

    navigation('/')
  } catch (error) {
    console.log(error)
  }
}
