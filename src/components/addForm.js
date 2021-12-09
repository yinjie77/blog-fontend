import React ,{useState}from "react";
import { Form, Input, Button,message } from 'antd';
import {EditOutlined,UserOutlined} from '@ant-design/icons';
const { TextArea } = Input;
const AddForm=({createBlog})=>{
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  const addBlog=()=>{
    
    createBlog(
        {
            title:title,
            author:author,
            url:url
        }
    ) 
    console.log('aaaa')
    setTitle('')
    setAuthor('')
    setUrl('')
    location.replace('/')
    message.success('创建成功')
  }
    return(
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Form
        initialValues={{ remember: true }}
         onFinish={addBlog}
        style={{ width: '100%', margin: '10px 14px' }}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input
            prefix={<EditOutlined />}
            placeholder="标题"
            allowClear='true'
            onChange={({target})=>{
              setTitle(target.value)
            }}
          />
        </Form.Item>
        <Form.Item
          name="author"
          rules={[{ required: true, message: '请输入文章作者' }]}
        >
          <Input
            prefix={<UserOutlined />}
            allowClear='true'
            placeholder="作者(原创或转载）"
            onChange={({target})=>{
              setAuthor(target.value)
            }}
          />
        </Form.Item>

        <Form.Item
          name="content"
          rules={[{ required: true, message: '请输入文章内容' }]}
        >
         <TextArea 
         allowClear='true'
         showCount='true'
        autoSize={{minRows:5}}
         placeholder="内容（转载请在文末附上原创链接）"
         onChange={({target})=>{
           setUrl(target.value)
         }}
         rows={20}
         />
        </Form.Item>
      <Button type="primary" htmlType="submit" style={{color:'white',backgroundColor:'rgb(92, 100, 164)'}}>创建</Button>
      </Form>
    </div>
    )

}
export default AddForm