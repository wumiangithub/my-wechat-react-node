import React from 'react'
import {connect} from 'react-redux'

import {List,Badge} from 'antd-mobile'

@connect(
    state => state
)
class Msg extends React.Component {
    getLast(arr) {
        return arr[arr.length - 1]
    }

    render() {
        // if(!this.props.chat.chatmsg.length)
        console.log(this.props)
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.user._id;
        const userinfo = this.props.chat.users;
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v);
        })
        // console.log(msgGroup)

        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last
        });
        //1. eslint代码校验工具
        //2. react16特有的错误处理机制
        //3. react性能优化

        return (
            <div>
                <List>
                    {chatList.map(v => {
                        const lastItem = this.getLast(v);
                        const targetId = v[0].from ==userid ? v[0].to : v[0].from;
                        const unreadNum = v.filter(vI => !vI.read && vI.to==userid).length
                        return (<Item
                                extra={<Badge text={unreadNum}></Badge>}
                                key={lastItem._id}
                                arrow='horizontal'
                                thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                             >
                                {lastItem.content}
                                <Brief>{userinfo[targetId].name}</Brief>
                            </Item>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default Msg
