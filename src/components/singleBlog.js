import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import { makeComment } from '../reducer/blogReducer'
import { Button,Card,Comment ,List,Form,Input,message,Popconfirm,Affix} from 'antd';
import {LikeOutlined,CommentOutlined} from '@ant-design/icons';
const SingleBlog=({handleLikes,handleRemoving,loggedUser})=>{
    const dispatch=useDispatch()
    const blogs=useSelector(state=>state.blogs)
    const id = useParams().id
    const blog = blogs.find((blog) => blog.id === id)
    const [comment,setComment]=useState('')
    const handleComment=(e)=>{
            if(loggedUser){
                dispatch(makeComment(comment,blog.id))
                setComment('')
              console.log(e)
            }
            else
            message.error('请先登录')
            
    }
    if(!blog)
    return null

   
    return(
        <div>
            <Affix offsetTop={0}>
                <Button type="primary" onClick={()=>document.body.scrollTop = document.documentElement.scrollTop = 700} style={{backgroundColor:'rgb(92, 100, 164)',borderColor:'rgb(92, 100, 164)'}}>
                    顶部
                </Button>
            </Affix>
            
            <h1 style={{textAlign:'center',color:'rgb(92, 100, 164)'}}>{blog.title}</h1>
            <div>
                <Card bodyStyle={{whiteSpace:'pre-line'}} title={<div style={{color:'rgb(92, 100, 164)'}}>作者：{blog.author}<div>内容</div></div>} extra={<div>
                    <span style={{marginRight:'10px'}}>
                    <LikeOutlined style={{marginTop:'-5px',marginRight:'10px'}}/>{blog.likes}
                    </span>
                    <Button type="primary" onClick={()=>handleLikes(blog.id,blog.likes)} style={{backgroundColor:'rgb(92, 100, 164)',borderColor:'rgb(92, 100, 164)'}}>
                        点赞
                    </Button>
                    {loggedUser?.id===blog.user?<Popconfirm title="你确定要删除这个博客吗" onConfirm={()=>handleRemoving(blog)} okText="是" cancelText="否"><Button>删除博客</Button></Popconfirm> :null}
                </div>} hoverable='true'>
                {blog.url}
                </Card>
                <Affix offsetBottom={0}>
                <Button type="primary" onClick={()=>document.body.scrollTop = document.documentElement.scrollTop = document.body.scrollHeight} style={{backgroundColor:'rgb(92, 100, 164)',borderColor:'rgb(92, 100, 164)'}}>
                    底部
                </Button>
            </Affix>
            </div>
            <h2 style={{textAlign:'center',color:'rgb(92, 100, 164)'}}>评论</h2>
            <List
                itemLayout="horizontal"
                 dataSource={blog?blog.comments.map(x=>({avatar:'https://joeschmoe.io/api/v1/random',content:(<p>{x}</p>)})):null}
                renderItem={x=>(
                    <li>
                        <Comment
                            avatar={x.avatar}
                            content={x.content}
                        />
                    </li>
                )}          
            >
            </List>
            
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
                     onFinish={handleComment}
                    style={{ width: '100%', margin: '10px 14px' }}
                >
                    <Form.Item
                    name="title"
                    rules={[{ required: true, message: '请输入评论' }]}
                    >
                    <Input
                        prefix={<CommentOutlined />}
                        placeholder="评论"
                        id='comment'
                        onChange={(e)=>setComment(e.target.value)}
                    />
                    </Form.Item>
                <Button type="primary" htmlType="submit" style={{color:'white',backgroundColor:'rgb(92, 100, 164)'}}>添加</Button>
                </Form>
            </div>
            
            
        </div>
    )
}
export default SingleBlog