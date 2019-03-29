import React from 'react'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../../component/navlink/navlink'
import {Switch,Route} from 'react-router-dom'
import {connect} from "react-redux";
import Boss from '../../component/boss/boss'
@connect(
    state => state,
)


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {pathname} = this.props.location;
        const user = this.props.user;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type == 'boss'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type == 'genius'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ];
        return (
            <div>
                <NavBar className='fixd-header' mode='dard'>{navList.find(v => v.path == pathname).title}</NavBar>
                <div style={{marginTop: 45}}>
                    <Switch>
                        {
                            navList.map(v => (
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }

                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}



function Genius() {
    return <h2>牛人列表</h2>
}

function Msg() {
    return <h2>msg</h2>
}


function User() {
    return <h2>个人中心</h2>
}

export default Dashboard
