import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { List,Skeleton} from 'antd';
import {LikeOutlined} from '@ant-design/icons';

const Blog = () => {
  
 const blogs=useSelector(state=>state.blogs)
 blogs.sort((a,b)=>(a.likes>b.likes?-1:1))
 
 return (
   <div >
     {blogs.length==0?
     <Skeleton active paragraph={{ rows: 10 }}/>
     :
      <List
    itemLayout="horizontal"
    dataSource={blogs}
    renderItem={item => (
      
      <List.Item>
        <List.Item.Meta
          title={<Link to={`/blogs/${item.id}`} style={{marginLeft:'500px',fontSize:'20px',color:'rgb(92, 100, 164)'}}>{item.title}</Link>}
          description={<div style={{marginLeft:'500px'}}><LikeOutlined /><span>{item.likes}</span></div>}
        />
      </List.Item>
    )}
  />}
   </div>
  
 )
}
  
export default Blog