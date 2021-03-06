import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from "antd-mobile";
import {connect} from "react-redux";
import {register} from "../../redux/user.redux";
import {Redirect} from "react-router-dom";
import imoocForm from '../../component/imoocForm/imooc-form'
@connect(
    state=>state.user,
    {register}
)
//继承imoocForm 高阶组件写法
@imoocForm
class Register extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     user: '',
        //     pwd: '',
        //     repeatpwd: "",
        //     type: 'genius',//boss
        // }
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount() {
        //设置默认值
        this.props.handleChange('type','genius')
    }

    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }

    handleRegister() {
        console.log(this.state);
        this.props.register(this.props.state)
    }


    render() {
        const RadioItem = Radio.RadioItem;

        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> :''}
                <Logo></Logo>
                <List>
                    {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                    <InputItem
                        onChange={(v) => this.props.handleChange('user', v)}
                    >用户名</InputItem>
                    <InputItem
                        onChange={(v) => this.props.handleChange('pwd', v)}
                    >密码</InputItem>
                    <InputItem
                        onChange={(v) => this.props.handleChange('repeatpwd', v)}
                    >确认密码</InputItem>
                    <RadioItem
                        checked={this.props.state.type == 'genius'}
                        onChange={() => this.props.handleChange('type', 'genius')}
                    >牛人</RadioItem>
                    <RadioItem
                        checked={this.props.state.type == 'boss'}
                        onChange={() => this.props.handleChange('type', 'boss')}
                    >BOSS</RadioItem>
                </List>
                <WingBlank>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register
