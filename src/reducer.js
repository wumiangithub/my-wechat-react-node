
// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { counter } from './store'
import { auth } from './Auth.redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'
import { chat } from './redux/chat.redux'


export default combineReducers({counter,auth,user,chatuser,chat})

