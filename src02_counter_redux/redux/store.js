/* 
redux最核心的管理对象: store
*/
import {createStore} from 'redux'
import reducer from './reducer'

const store = createStore(reducer)
export default store