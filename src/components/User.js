import React from 'react'
import { Link } from 'react-router-dom'
import { List} from 'antd';
const User=({user})=>{ 
    if(!user){
        return null
    }
    return (
        
        <div>
             <h1 style={{textAlign:'center',color:'rgb(92, 100, 164)'}}>{user.username}</h1>
            <List
                itemLayout="horizontal"
                dataSource={user.blogs}
                renderItem={item => (
                
                <List.Item>
                    <List.Item.Meta
                    title={<Link to={`/blogs/${item.id}`} style={{marginLeft:'500px',fontSize:'20px',color:'rgb(92, 100, 164)'}}>{item.title}</Link>}
                    />
                </List.Item>
                )}
            />
        </div>
    )
}

export default User