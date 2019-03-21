import React from 'react'
import {connect} from "react-redux";
import { login ,getUserData} from './Auth.redux';
import {BrowserRouter, Link, Route,Redirect} from "react-router-dom";


//两个reducer  每个reducer都有一个state
//合并reducer
@connect(
    state=>state.auth,
    {login,getUserData}
)

class Auth extends React.Component{
    componentDidMount() {
        this.props.getUserData()
    }


    constructor(props){
        super(props)
        this.state = {
            data:{}
        }
    }
    render() {
        return(
            <div>
                <h2>我的名字是{this.props.user},年龄{this.props.age}</h2>
                { this.props.isAuth? <Redirect to='/dashboard' /> : null}
                <h2>你没有权限，需要登录才能看</h2>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}


export default Auth