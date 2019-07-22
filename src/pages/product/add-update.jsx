import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Select,
  Button,
  message
}from 'antd'
import {reqCategorys, reqAddUpdateProduct} from '../../api'
import PicturesWall from './pictures-wall'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'
import RichTextEditor from './rich-text-editor'

const Item = Form.Item
const Option = Select.Option

class ProductAddUpdate extends Component {



  state = {
    categorys:[]
  }
  
  constructor(props){
    super(props);
    this.pwRef = React.createRef()
    this.editorRef = React.createRef()
  }

  getCategorys = async () => {
    const result = await reqCategorys()
    if(result.status === 0){
      const categorys = result.data
      this.setState({ categorys })
    }
  }

  validatePrice = (rule,value,callback) => {
    if(value===''){
      callback()
    }else if (value * 1 <= 0 ){
      callback('价格必须大于0')
    }else{
      callback()
    }
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async(err,values)=>{
      if(!err){
        const {name,desc,price,categoryId} = values
        console.log('发送请求',name,desc,price,categoryId)

        const imgs = this.pwRef.current.getImgs()
        console.log('imgs',imgs)

        const detail = this.editorRef.current.getDetail()
        console.log('detail',detail)

        const product = {name,desc,price,categoryId,imgs,detail}
        if(this.isUpdate){
          product._id = this.product._id
        }
        const result = await reqAddUpdateProduct(product)
        if(result.status===0){
          message.success(`${this.isUpdate ? '修改':'添加'}商品成功`)
          this.props.history.replace('/product')
        }else{
          message.error(result.msg)
        }
      }
    })
  }

  componentWillMount(){
    this.product = memoryUtils.product
    this.isUpdate = !!this.product._id
  }

  componentDidMount(){
    this.getCategorys()
  }

  render() {
    const {categorys} = this.state
    const {isUpdate,product} = this
    const {getFieldDecorator} = this.props.form

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"/>
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )

    const formLayout = {
      labelCol:{ span:2 },
      wrapperCol:{ span:8 }
    }

    return (
      <Card title={title}>
        <Form {...formLayout} onSubmit={this.handleSubmit}>
          <Item label="商品名称">
            {getFieldDecorator('name',{
              initialValye:product.name,
              rules:[
                {required:true,message:'必须输入商品名称！'}
              ],
            })(<Input placeholder="商品名称"/>)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator('desc',{
              initialValye:product.desc,
              rules:[
                {required:true,message:'必须输入商品描述！'}
              ],
            })(<Input placeholder="商品描述"/>)}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator('price',{
              initialValye:product.price,
              rules:[
                {required:true,message:'必须输入商品价格！'},
                {validator:this.validatePrice}
              ],
            })(<Input placeholder="商品价格" type="number" addonAfter="元"/>)}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator('categoryId',{
              initialValye:product.categoryId || '',
              rules:[
                {required:true,message:'必须输入商品分类！'}
              ],
            })(
              <Select>
                <Option value=''>未选择</Option>
                {
                  categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                }
              </Select>
            )}
          </Item>
          <Item label="商品图片">
            <PicturesWall ref={this.pwRef} imgs={product.imgs}/>
          </Item>
          <Item label="商品详情" wrapperCol={{span:20}}>
            <RichTextEditor ref={this.editorRef} detail = {product.detail}/>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)