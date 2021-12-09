import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button} from 'antd';
const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} style={{color:'white',backgroundColor:'rgb(92, 100, 164)'}}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} style={{color:'white',backgroundColor:'rgb(92, 100, 164)',marginLeft:'14px'} }>取消</Button>
      </div>
    </div>
  )
}
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default Togglable