import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import './index.css'
import reducers from './reducer'
import './config';
import Authroute from './component/authroute/authroute'
import axios from 'axios'


import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'


import Login from './container/login/login'
import Register from './container/register/register'


const reduxDevtools = window.devToolsExtension ? window.devToolsExtension(): ()=>{} ;
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevtools
));  //创建了一个store


function Boss(){
     return <h2>BOSS页面</h2>
}




//使用Provider
ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
               <div>
                   <Authroute></Authroute>
                   <Route path='/boss' component={Boss}></Route>
                   <Route path='/login' component={Login}></Route>
                   <Route path='/register' component={Register}></Route>
               </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)


axios.get('/user/list',).then(res=>{
    if(res.status == 200 && res.data.code === 0){

    }else{

    }
})




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
