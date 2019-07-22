import React, { Component } from 'react'
import { Icon, Button, Card, Table ,message,Modal} from 'antd';
import LinkButton from '../../components/link-button';
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api';
import AddUpdateForm from './add-update-form';
/**
 * 分类管理
 */



export default class Category extends Component {
  
  state = {
    categorys:[],
    loading:false,
    showStatus:0
  }
  getCategorys = async() => {

    this.setState({loading:true})
    const result = await reqCategorys()
    this.setState({loading:false})
    if(result.status===0){
      const categorys = result.data
      this.setState({
        categorys
      })
    }else{
      message.error('获取分类失败~')
    }
  }
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width:150,
        render: (category) => <LinkButton onClick={
          ()=>{
            this.category = category
            this.setState({showStatus:2})
          }
        }>修改分类</LinkButton>,
      }
    ];
  }
  handleOk = () => {
    this.form.validateFields(async(err,values)=>{
      if(!err){

        

        const {categoryName} = values

        const {showStatus} = this.state

        let result
        if(showStatus === 1){
          result = await reqAddCategory(categoryName)
        }else{
          const categoryId = this.category._id
          result = await reqUpdateCategory({categoryId,categoryName})
        }
        this.form.resetFields()
        this.setState({showStatus:0})

        const action = showStatus ===1? '添加':'修改'
        if(result.status===0){
          this.getCategorys()
          message.success(action+'分类成功')
        }else{
          message.error(action+'分类失败')
        }
      }
    })
  }
  handleCancel = () => {
    this.category={}
    this.form.resetFields()
    this.setState({
      showStatus:0
    })
  }

  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
    this.getCategorys()
  }
  render() {
    const {categorys,loading,showStatus} = this.state;
    const category = this.category || {}
    const extra = (
      <Button type='primary' onClick={()=>{this.setState({showStatus:1})}}>
        <Icon type='plus' />
        添加
      </Button>
    )


    return (
      <Card extra={extra} >
        <Table
          columns={this.columns}
          dataSource={categorys}
          rowKey="_id"
          loading={loading}
          bordered={true}
          pagination={{ defaultPageSize: 3, showQuickJumper: true }}
        />
         <Modal
          title={showStatus === 1? "添加分类":"修改分类"}
          visible={showStatus !== 0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddUpdateForm setForm={form => this.form = form} categoryName={category.name}/>
        </Modal>
      </Card>
      
    )
  }
}
