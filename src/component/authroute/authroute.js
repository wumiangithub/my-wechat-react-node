import React from 'react'
import axios from 'axios'
import {withRouter} from "react-router-dom";
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'

@withRouter
@connect(
    null,
    {loadData}
)


class AuthRoute extends React.Component {
    constructor(props) {
        super(props)
        // console.log(this.props)
    }

    componentDidMount() {
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname) > -1) {
            return null
        }

        //获取用户信息
        axios.get('/user/info').then(res => {
            if (res.status == 200) {
                if (res.status == 200) {
                    if (res.data.code == 0) {
                        //有登入信息的
                        // console.log(res.data)
                        this.props.loadData(res.data.data);
                    } else {

                        this.props.history.push('/login')
                    }
                }
            }
        })

        //    是否登入

    }

    render() {
        return null
    }
}

export default AuthRoute
