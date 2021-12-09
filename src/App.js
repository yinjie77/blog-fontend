import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddForm from './components/addForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/singleBlog'
import CreateAccount from './components/CreateAccount'

import blogService from './services/blogs'
import usersService from './services/users'

import { initializeBlogs,setBlogs,addlike,deleteBlog } from './reducer/blogReducer'
import { setLoggedUser } from './reducer/loggedUserReducer'
import { addUsers } from './reducer/usersReducer'
import { useDispatch, useSelector } from 'react-redux'


import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import { Modal,Button,message} from 'antd';
import { YahooOutlined } from '@ant-design/icons';

import './App.css'

const App = () => {
  const dispatch = useDispatch()

  const loggedUser=useSelector(state=>state.loggedUser)
  const [users,setUsers]=useState([])
  const [modalState, setModalState] = useState('登录');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setModalState('登录'); // 回到登录状态
  };

  const matchUser = useRouteMatch('/users/:id')
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  useEffect(()=>{
    dispatch(initializeBlogs())
    const loggedUserJSON=window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON)
    {
      const user=JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(user))
      blogService.setToken(user.token)
    }
    (async()=>{
      const allUsers=await usersService.getALL()

      dispatch(addUsers(allUsers))
      setUsers(allUsers)
    })()

  },[dispatch])
  
  
 const loginout=()=>{
   if(window.localStorage.getItem('loggedBlogappUser'))
   {
     window.localStorage.removeItem('loggedBlogappUser')
     dispatch(setLoggedUser(null))
    }
    location.replace('/')

 }
 const addBlog=(blogObject,title)=>{
        dispatch(setBlogs(blogObject))
 }

 const createBlog=()=>{
  return(
    <Togglable buttonLabel='创建新博客'>
               <AddForm createBlog={addBlog} />
    </Togglable>
  )
 }
 const handleLikes = (id,likes) => {
   if(loggedUser){
    dispatch(addlike(id,likes+1))
    message.success('点赞成功')
   }
  
  else
  message.error('请先登录')
  
}
const handleRemoving = async (blog) => {
      dispatch(deleteBlog(blog.id))
      message.success('删除成功')
      location.replace('/')
}
const padding = {
  padding: 20,
  color:'black',
}


  return (
    <div >
   {/* head */}
      {loggedUser
      ?
      <div >
      <YahooOutlined style={{fontSize:'70px',color:'#5c64a4'}}/>
      <Link style={padding} to='/blogs'>博客</Link>
      <Link style={padding} to='/users'>用户</Link>
      <Link style={{padding:'20px',color:'black',marginLeft:'1100px'}} to={`/users/${loggedUser.id}`}>{loggedUser.username}</Link>
      <a href='#' onClick={loginout} style={{color:'black',padding:'20px'}}>退出登录</a>
      </div>
      :
      <div >
        <YahooOutlined style={{fontSize:'70px',color:'#5c64a4'}}/>
        <Link style={{marginLeft:'20px',fontSize:'14px',color:'black'}} to='/blogs'>博客</Link>
        <Button type="text" onClick={showModal} style={{marginLeft:'1300px'}}>
        注册 | 登录
        </Button>
        
      </div>
    }
  {/* content */}
      <Modal
        style={{ maxWidth: '400px', textAlign: 'center' }}
        title={modalState}
        visible={isModalVisible}
        footer={false}
        onCancel={handleModalCancel}
      >
        {modalState === '登录' && <LoginForm setModalState={setModalState} />}
        {modalState === '注册' && <CreateAccount setModalState={setModalState} />}
        
      </Modal>
      <div className='banner-bg'>
      <div className='contect-container'>
        <div className='contect-zone'>
          <div className="welcome-contect">欢迎</div>
          <div className="title-contect">来到yinjie77的博客系统</div>
          <div className="subtitle-contect">🏠分享学习资源—————共同学习与进步</div>
        </div>
        <div className="bg-images"></div>
      </div>
    </div>
     
      
         <div>
         <div
              style={{
                fontSize: '32px',
                textAlign: 'center',
                color: '#5c64a4',
                width:'100%',
                marginBottom:'20px'
              }}
            >
              博客
          </div>
          
            <Switch>
            <Route path="/users/:id">
              <User user={user} />
            </Route>
            <Route path='/users'>
               <Users users={users} />
            </Route>
            <Route path='/blogs/:id'>
          <SingleBlog handleLikes={handleLikes} handleRemoving={handleRemoving} loggedUser={loggedUser}/>
            </Route>
            <Route path='/'>
            <Blog/>
            {loggedUser?createBlog():null}
            </Route>
            </Switch>
         </div> 
    {/*footer*/}
    <div style={{ textAlign: 'center' ,lineHeight:'50px',backgroundColor:'rgba(239, 244, 250, 0.24)',color:'black',height:'100px',verticalAlign:'middle'}} >
        yinjie77
      <div>
      <a
          href="#"
          style={{ color: 'black' }}
        >
        QQ群-关于-联系我
        </a>
     </div>  
    </div>
    </div>
   
  )
}

export default App