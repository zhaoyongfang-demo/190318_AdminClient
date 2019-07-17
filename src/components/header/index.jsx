import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {formateDate} from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import {reqWeather} from '../../api'
import { Modal } from 'antd'
import './index.less'


class Header extends Component {
    state = {
        currentTime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:'',
    }
    logout=()=>{
        Modal.confirm(
            {
                title: '确认退出吗？',
                onOk:() => {
                  console.log('OK');
                  storageUtils.removeUser()
                  memoryUtils.user={}
                  this.props.history.replace('/login')
                },
                onCancel() {
                  console.log('Cancel');
                },
              }
        )
    }
    getTitle = () => {
        let title
        const path = this.props.location.pathname
        menuList.forEach(item => {
            if (item.key===path) {
                title = item.title
            } else if(item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                if(cItem){
                    title = cItem.title
                }
            }
            
        })
        return title
    }

    getWeather = async () =>{
        const {dayPictureUrl,weather} = await reqWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    componentDidMount(){
        this.intervalId = setInterval(() => {
            this.setState({
                currentTime:formateDate(Date.now())
            })
        }, 1000);

        this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    render() {
        const {currentTime,dayPictureUrl,weather} = this.state
        const user = memoryUtils.user
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    欢迎，{user.username} &nbsp; &nbsp;
                    <a href="##" onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
