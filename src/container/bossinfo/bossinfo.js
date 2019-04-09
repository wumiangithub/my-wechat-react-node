import React from 'react'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {NavBar, List, InputItem, TextareaItem,Button} from "antd-mobile";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
@connect(
    state=>state.user,
    {update}
)

class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company:'',
            money:'',
            desc:""
        }
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    selectAvatar(){

    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirecTo;
        return (
            <div>
                {redirect&& redirect!=path? <Redirect to={this.props.redirecTo}></Redirect>:null}
                <NavBar
                    mode="dark">Boss完善信息页面
                </NavBar>
                <AvatarSelector
                    selectAvatar={(imgname)=>{
                        this.setState({
                            avatar:imgname
                        })
                    }}
                ></AvatarSelector>
                <List>
                    <InputItem onChange={(v) => this.onChange('title', v)}>
                        招聘职位
                    </InputItem>
                    <InputItem onChange={(v) => this.onChange('company', v)}>
                        公司名称
                    </InputItem>
                    <InputItem onChange={(v) => this.onChange('money', v)}>
                        职位薪资
                    </InputItem>
                    <TextareaItem
                        onChange={(v) => this.onChange('desc', v)}
                        rows={3}
                        autoHeight
                        title='职位要求'
                    >

                    </TextareaItem>
                    <Button
                        onClick={()=>{
                            console.log(777)
                            this.props.update(this.state)
                        }}
                        type="primary">保存</Button>
                </List>
            </div>
        )
    }
}

export default BossInfo
