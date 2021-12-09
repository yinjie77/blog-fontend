import React ,{useState}from "react"
import UserService from '../services/users'
import { Form, Input, Button,message,Checkbox } from 'antd';
const CreateAccount=(props)=>{
    const [username,setUsername]=useState('')
    const [name,SetName]=useState('')
    const [password,setPassword]=useState('')

    const handleRegister=async ()=>{
        try{
            const r=await UserService.register({username,name,password})
            console.log(r)
        setUsername('')
        SetName('')
        setPassword('')
        message.success('注册成功')
        props.setModalState('登录')
        }
        catch(error){
        message.error('该账户已经被注册')
        }
        

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
        onFinish={handleRegister}
        scrollToFirstError
        style={{ width: '100%', margin: '16px 20px' }}
      >
        <Form.Item
          name="name"
          rules={[
            { required: true, message: '请输入你的昵称', whitespace: true },
            { max: 10, message: '请输入10位字符以内的昵称' },
          ]}
        >
          <Input placeholder="昵称" onChange={({target})=>{
            SetName(target.value)
           }}/>
        </Form.Item>

        <Form.Item
          name="username"
          rules={[
            {
              pattern: /\w+$/,
              message: '只能使用数字、字母和下划线组合',
            },
            { required: true, message: '请输入你的帐号', whitespace: true },
          ]}
        >
          <Input placeholder="帐号" onChange={({target})=>{
            setUsername(target.value)
           }}/>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              min: 6,
              message: '请输入大于5个字符的密码',
            },
            {
              max: 20,
              message: '请输入小于20个字符的密码',
            },
            {
              required: true,
              message: '请输入你的密码',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="密码"  onChange={({target})=>{
            setPassword(target.value)
           }}/ >
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请确认你的密码',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('确认密码与密码不一致');
              },
            }),
          ]}
        >
          <Input.Password placeholder="确认密码" />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject('请同意用户协议'),
            },
          ]}
        >
          <Checkbox>
            我已经阅读并同意{' '}
            <a
              href="#"
              style={{color:'rgb(92, 100, 164)'}}
            >
              用户协议
            </a>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{backgroundColor:'rgb(92, 100, 164)',borderColor:'rgb(92, 100, 164)'}}>
            注册
          </Button>{' '}
          或
          <Button type="link" onClick={() => props.setModalState('登录')} style={{color:'rgb(92, 100, 164)'}}>
            已经有帐号了？现在登录
          </Button>{' '}
        </Form.Item>
      </Form>
    </div>
     
    )
}

export default CreateAccount