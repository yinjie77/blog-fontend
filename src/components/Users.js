import React from 'react'
import { Link } from 'react-router-dom'
import { Table} from 'antd';
const Users=({users})=>{
users.forEach(x=>x.count=x.blogs.length)
const columns=[
    {
        title:'用户名',
        dataIndex:'username',
        render:text=>{
            const a=users.filter(x=>x.username==text)
            return(
                    <Link to={`/users/${a[0].id}`}style={{fontSize:'20px',color:'rgb(92, 100, 164)'}}>{a[0].username}(点击查看用户所发博客)</Link>
            )
        }
    },
    {
        title:'发博数',
        dataIndex:'count',
    },
]

    return(
        <div>
            
            <h1 style={{textAlign:'center',color:'rgb(92, 100, 164)'}}>用户信息统计</h1>
            <div >
                <Table columns={columns} dataSource={users}/>
            </div>
        </div>
    )
}

export default Users