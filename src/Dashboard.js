import React from 'react'
import {BrowserRouter, Link, Route,Redirect} from "react-router-dom";
import {connect} from "react-redux";
import { logout } from './Auth.redux.js'
import App from './App';

function Two() {
    return <h2>two Page</h2>
}

function Three() {
    return <h2>three Page</h2>
}
//两个reducer  每个reducer都有一个state
//合并reducer
@connect(
    state=>state.auth,
    {logout}
)

class Dashboard extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        const redirectToLogin = <Redirect to='/login'></Redirect>
        const app = (
            <div>
                {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
                <ul>
                    <li>
                        <Link to="/dashboard/">首页</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/two">two</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/three">three</Link>
                    </li>
                </ul>
                <Route path='/dashboard/' exact component={App} ></Route>
                <Route path='/dashboard/two' component={Two} ></Route>
                <Route path='/dashboard/three' component={Three} ></Route>
            </div>
        )

        return this.props.isAuth ? app: redirectToLogin
    }
}


export default Dashboard