import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from "antd-mobile";
import {connect} from "react-redux";
import {login, register} from "../../redux/user.redux";
import {Redirect} from "react-router-dom";
@connect(
    state=>state.user,
    {login}
)


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            type: 'genius',//boss

        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    register() {
        this.props.history.push('register')
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleLogin() {
        this.props.login(this.state)
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> :''}
                <Logo></Logo>
                <h2>登入页</h2>
                <WingBlank>
                    {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                    <List>
                        <InputItem
                            onChange={(v) => this.handleChange('user', v)}
                        >用户名</InputItem>
                        <InputItem
                            onChange={(v) => this.handleChange('pwd', v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.handleLogin}>登入</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login