import request from 'superagent-bluebird-promise'
import jwt from 'jsonwebtoken'

const LOGIN_REQUEST = 'thoughtshare-fe/auth/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'thoughtshare-fe/auth/LOGIN_SUCCESS'
const LOGIN_FAIL = 'thoughtshare-fe/auth/LOGIN_FAIL'
const LOGIN_SYNC = 'thoughtshare-fe/auth/LOGIN_SYNC'
const LOGOUT = 'thoughtshare-fe/auth/LOGOUT'
const SET_TOKEN = 'thoughtshare-fe/auth/SET_TOKEN'


const initialState = {
  token: null,
  currentUser: null,
  isLoading: false,
  error: null
}

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        currentUser: payload.currentUser,
        error: null,
        isLoading: false
      }
    case LOGIN_FAIL:
      return {
        ...state,
        error: payload,
        isLoading: false
      }
    case LOGIN_SYNC:
      return {
        ...state,
        token: payload.token,
        currentUser: payload.currentUser
      }
    case LOGOUT:
      return {
        ...state,
        token: null,
        currentUser: null
      }
    default:
      return state
  }
}

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

function loginSuccess(token, currentUser) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      currentUser
    }
  }
}

function loginFail(err) {
  return {
    type: LOGIN_FAIL,
    payload: err
  }
}

export const login = (username, password) => dispatch => {
  dispatch(loginRequest())

  request
    .post('http://localhost:4000/api/login')
    .type('application/json')
    .send({
      username,
      password
    })
    .then(res => {
      const { token } = res.body.data
      const decoded = jwt.decode(token)
      const currentUser = JSON.parse(decoded.sub)
      localStorage.setItem('token', token)
      dispatch(loginSuccess(token, currentUser))
    })
    .catch(err => {
      dispatch(loginFail(err))
    })
}

export const loginSync = (token) => {
  const decoded = jwt.decode(token)
  const currentUser = JSON.parse(decoded.sub)
  return {
    type: LOGIN_SYNC,
    payload: {
      token,
      currentUser
    }
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  return {
    type: LOGOUT
  }
}
