import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'
//import qs from 'qs'
const BASE = ''
export const reqLogin = (username,password) => (

    ajax.post(BASE + '/login',{username,password})
)
export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {
      const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
      // 发送jsonp请求
      jsonp(url, {}, (err, data) => {
        console.log('jsonp()', err, data)
        // 如果成功了
        if (!err && data.status==='success') {
          // 取出需要的数据
          const {dayPictureUrl, weather} = data.results[0].weather_data[0]
          resolve({dayPictureUrl, weather})
        } else {
          // 如果失败了
          message.error('获取天气信息失败!')
        }
  
      })
    })
  }

