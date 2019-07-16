import axios from 'axios'
import qs from 'qs'


axios.interceptors.request.use(function(config){
    const {method,data} = config
    if(method.toLowerCase()==='post' && typeof data === 'object'){
        config.data = qs.stringify(data)
    }
    return config;
})

axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
  }, function (error) {
    // Do something with response error
    //return Promise.reject(error);
    return new Promise(()=>{})
  });





export default axios