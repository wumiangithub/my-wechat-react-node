import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from "antd-mobile";
import {connect} from "react-redux";
import {login, register} from "../../redux/user.redux";
import {Redirect} from "react-router-dom";




// 属性继承  反向代理  高阶组件
// function WrapperHello(Comp) {
//
//     // class WrapComp extends Comp{
//     // 		componentDidMount(){
//     // 			console.log('高阶组件新增的生命周期，加载完成')
//     // 		}
//     // 		render(){
//     // 			return <Comp></Comp>
//     // 		}
//     // }
//
//     // class WrapComp extends React.Component {
//     //
//     //     render() {
//     //         return (<div>
//     //             <p>这是HOC高阶组件特有的元素</p>
//     //             <Comp name='text' {...this.props}></Comp>
//     //         </div>)
//     //     }
//     // }
//
//     // return WrapComp
// }

// @WrapperHello


@connect(
    state => state.user,
    {login}
)


class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.login)
        this.state = {
            user: 'gggg',
            pwd: '',
            type: 'genius',//boss

        };
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        console.log(this.props)
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
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : ''}
                <Logo></Logo>
                <h2>登入页</h2>
                <WingBlank>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <List>
                        <InputItem
                            onChange={(v) => this.handleChange('user', v)}
                        >用户名</InputItem>
                        <InputItem
                            onChange={(v) => this.handleChange('pwd', v)}
                            type='password'
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
