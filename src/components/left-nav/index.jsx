import React, { Component } from 'react'
import { Link,withRouter} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import { Menu, Icon } from 'antd';
import './index.less'
const { SubMenu } = Menu;
 class LeftNav extends Component {
    getMenuNodes2 = (menuList) => {
        const menuNodes = this.getMenuNodes2(menuList)
        const path = this.props.location.pathname
        return menuList.reduce((pre,item)=>{
            if (item.children) {
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ) 
            } else {
                const cItem = item.children.find(cItem=>cItem.key===path)
                if(cItem){
                    this.openKey = item.key
                }
                pre.push(
                    <SubMenu
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {
                        menuNodes
                    }
                </SubMenu>
                )
            }
            return pre
        },[])
    }
    getMenuNodes = (menuList) => {

        return menuList.map((item) => {
            //console.log(item)
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
            return (
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {
                        this.getMenuNodes(item.children)
                    }
                </SubMenu>
            )
        })
    }

    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        const selectKey = this.props.location.pathname
        return (
            <div className="left-nav">
                <header>
                    <Link className="left-nav-link" to="/home">
                        <img src={logo} alt="logo" />
                        <h1>硅谷后台</h1>
                    </Link>
                    <Menu
                        selectedKeys={[selectKey]}
                        defaultOpenKeys={[this.openKey]}
                        mode="inline"
                        theme="dark"
                    >
                        {
                            this.menuNodes
                        }
                    
                    </Menu>
                </header>
            </div>
        )
    }
}

export default withRouter(LeftNav)
