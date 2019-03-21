import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import reducers from './reducer'
import './index.css';
import './config'
import Dashboard from './Dashboard';
import Auth from './Auth';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension(): ()=>{} ;
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevtools
));  //创建了一个store


//手动链接方式
// function render (){
//     ReactDOM.render(<App store={store} addSync={addSync} add={add} cut={cut}/>, document.getElementById('root'));
// }
// render();
// store.subscribe(render)




//使用Provider
ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>

                <Switch>
                    <Route path="/login"   component={Auth}></Route>
                    <Route path="/dashboard" component={Dashboard}></Route>
                    <Redirect to='/dashboard'></Redirect>
                </Switch>

            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)






// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
