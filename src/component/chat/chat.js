import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from "../../utils";

@connect(
    state => state,//this.props包括整个redux
    // state => state.chat,//this.props只包括chat.redux
    {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg()
        }

        this.fixCarouse();
        const to = this.props.match.params.user;
        this.props.readMsg(to)
    }

    //组件被移除或者被影藏
    componentWillUnmount() {
        console.log('WillUnmount')
    }

    fixCarouse() {
        setTimeout(function () {
            window.dispatchEvent(new Event("resize"))
        }, 0)
    }

    handleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        // const msg = this.props.msg;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg});
        this.setState({
            text: '',
            showEmoji: false
        })
    }

    render() {
        const emoji = '😂 👍 😏 😪 😎 😓 🤟 🧑 🤷 🙏 😂 👍 😏 😪 😎 😓 🤟 🧑 🤷 🙏 😂 👍 😏 😪 😎 😓 🤟 🧑 🤷 🙏 😂 👍 😏 😪 😎 😓 🤟 🧑 🤷 🙏 😂 👍 😏 😪 😎 😓 🤟 🧑 🤷 🙏'.split(' ').filter(v => v).map(v => ({text: v}));

        const userid = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid == chatid);
        if (!users[userid]) {
            return null
        }
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type='left'/>}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`);
                    return v.from === userid ?
                        (
                            <List key={v._id}>
                                <Item
                                    thumb={<img src={avatar} alt=''/>}
                                >
                                    {v.content}
                                </Item>
                            </List>

                        )
                        :
                        (
                            <List key={v._id}>
                                <Item
                                    extra={<img src={avatar} alt=''/>}
                                    className='chat-me'>
                                    {v.content}
                                </Item>
                            </List>
                        )
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={
                                v => {
                                    this.setState({text: v})
                                }
                            }
                            extra={
                                <div>
                                    <span
                                        style={{marginRight: 15}}
                                        onClick={() => {
                                            this.setState({
                                                showEmoji: !this.state.showEmoji
                                            })
                                            this.fixCarouse()
                                        }}
                                    >😂</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>

                            }
                        >信息</InputItem>
                    </List>
                    {
                        this.state.showEmoji ? <Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el => {
                                // console.log(el)
                                this.setState({
                                    text: this.state.text + el.text
                                })
                            }
                            }
                        /> : null
                    }

                </div>
            </div>
        )
    }
}


export default Chat
