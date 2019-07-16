import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

export default class Admin extends Component {
    render() {
       // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
       const user = memoryUtils.user
        if (!user._id) {
            //this.props.history.replace('/login')
            return <Redirect to="/login" />
        }
        return (
            <div>
                hello,{user.username}
            </div>
        )
    }
}
