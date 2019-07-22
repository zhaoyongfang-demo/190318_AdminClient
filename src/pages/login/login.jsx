import React, { Component } from 'react'
import {Form,Icon,Input,Button,message} from 'antd';
import {reqLogin} from '../../api';
import {Redirect} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './login.less';
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils.js'
const Item = Form.Item;
class Login extends Component {

    login = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async(err,{username,password})=>{
          if(!err){
            const result = await reqLogin(username,password)
            if(result.status===0){
              const user = result.data
              //localStorage.setItem('user_key',JSON.stringify(user))
              storageUtils.saveUser(user);
              memoryUtils.user = user;
              
              this.props.history.replace('/')
              message.success('登录成功');
            }else{
              message.error(result.msg)
            }
          }else{
            console.log(err)
          }
        })
      };
    
      validator = (rule,value,callback)=>{
        const length = value && value.length
        const pwdReg = /^[a-zA-Z0-9_]+$/
        if(!value){
          callback('必须输入密码')
        }else if(length < 4){
          callback('密码必须大于4位')
        }else if(length > 12){
          callback('密码必须小于12位')
        }else if(!pwdReg.test(value)){
          callback('密码必须是英文、数组、下划线组成')
        }else{
          callback()
        }
      }
    
    
    render() {

        //const user = JSON.parse(localStorage.getItem('user_key')||'{}')
        //const user = storageUtils.getUser()
        const user = memoryUtils.user
        if(user._id){
            return <Redirect to="/"/>
        }

        const {getFieldDecorator} = this.props.form
        return (
            <div className='login'>
                <div className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>MyReact项目：后台管理系统</h1>
                </div>
                <section className='login-content'>
                    <h1>欢迎登陆</h1>
                    <Form onSubmit={this.login} className="login-form">
                        <Item>
                          {
                            getFieldDecorator('username',{
                              rules:[
                                {required:true,whitespace:true,message:'请输入用户名'},
                                {min:4,message:'用户名必须大于4位'},
                                {max:12,message:'用户名必须小于12位'},
                                {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数组或者下划线组成'}
                              ]
                            })(
                              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              placeholder="用户名"/>
                            )
                          }
                        </Item>
                        <Item>
                          {
                            getFieldDecorator('password',{
                              rules:[
                                {validator:this.validator},
                              ]
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"  placeholder="密码"/>
                            )
                          }
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                              登录
                            </Button>
                        </Item>
                  </Form>
                </section>
            </div>
        )
    }
}
export default Form.create()(Login);