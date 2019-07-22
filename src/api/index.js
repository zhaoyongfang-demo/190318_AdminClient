import ajax from './ajax'
import jsonp from 'jsonp'

const BASE ='';


export const reqLogin = (username,password) => ajax.post(BASE+'/login', {username, password})

export function reqWeather(city) {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  return new Promise((resolve, reject) => {
    jsonp(url, {
      param: 'callback'
    }, (error, response) => {
      if (!error && response.status === 'success') {
        const {dayPictureUrl, weather} = response.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        alert('获取天气信息失败')
      }
    })
  })
}

export const reqCategorys = () => ajax(BASE+'/manage/category/list')
export const reqAddCategory = (categoryName) => ajax.post(BASE+'/manage/category/add',{categoryName})
export const reqUpdateCategory= ({categoryId,categoryName}) => ajax.post(BASE+'/manage/category/update',{categoryId,categoryName})

export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info',{
  params:{
    categoryId
  }
})

export const reqProducts = (pageNum,pageSize) => ajax(BASE+'/manage/product/list',{params:{pageNum,pageSize}})

export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType}) => ajax(BASE + '/manage/product/search',{params:{pageNum,pageSize,[searchType]:searchName}})

export const reqProduct = (productId) => ajax(BASE+'/manage/product/info',{
  params:{
    productId
  }
})

export const reqUpdateStatus = (productId,status) => ajax(BASE+'/manage/product/updateStatus',
{
  method:'POST',
  data:{
    productId,
    status
  }
})

export const reqDeleteImg = (name) => ajax.post(BASE+'/manage/img/delete',{name})

export const reqAddUpdateProduct = (product) => ajax.post(
  BASE + '/manage/product/'+(product._id ? 'update':'add'),
  product
)

export const reqRoles = () => ajax(BASE + '/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax.post(BASE + '/manage/role/add', {
  roleName
})
// 更新角色
export const reqUpdateRole = (role) => ajax.post(BASE + '/manage/role/update', role)

// 获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax.post(BASE + '/manage/user/delete', {
  userId
})
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax.post(BASE + '/manage/user/' + (user._id ? 'update' : 'add'), user)