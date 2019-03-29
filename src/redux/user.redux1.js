import axios from 'axios'
import {getRedirectPath} from "../utils";

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'

const initState = {
    redirectTo: "",
    isAuth: "",
    msg: "",
    user: "",
    pwd: "",
    type: ""
}


//reducer
export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: "", redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: true}
        case LOGIN_SUCCESS:
            return {...state, msg: "", redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
        case AUTH_SUCCESS:
            return {...state, msg: "", redirectTo: getRedirectPath(action.payload),  ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}


function authSuccess(obj) {
    const {pwd,...data} = obj;
    return {type:AUTH_SUCCESS,payload:data}
}

function registerSuccess(data) {
    console.log(data);
    return {type: REGISTER_SUCCESS, payload: data}
}


function loginSuccess(data) {
    return {type: LOGIN_SUCCESS, payload: data}

}


function errorMsg(msg) {
    return {type: ERROR_MSG, msg}
}


export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo}
}


export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}


export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }


    return dispatch => {
        axios.post('/user/login', {user, pwd}).then(res => {
            if (res.status == 200 && res.data.code === 0) {
                // dispatch(loginSuccess(res.data.data))
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }


}


export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }

    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同')
    }

    return dispatch => {
        axios.post('/user/register', {user, pwd, type}).then(res => {
            if (res.status == 200 && res.data.code === 0) {
                // dispatch(registerSuccess({user, pwd, type}))
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }


}