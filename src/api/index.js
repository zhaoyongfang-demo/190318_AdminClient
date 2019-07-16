import ajax from './ajax'
//import qs from 'qs'
const BASE = ''
export const reqLogin = (username,password) => (
    // ajax({
    //     method:'post',
    //     url:BASE + '/login',
    //     data:{
    //         username,
    //         password
    //     }
    //     //data:qs.stringify({username,password})
    // })
    ajax.post(BASE + '/login',{username,password})
)

// const name = 'admin'
// const pwd = 'admin'
// reqLogin(name,pwd).then(response =>{
//     //const result = response.data
//     console.log('请求成功了',result)
// },error =>{
//     console.log('请求失败了',error)
// })