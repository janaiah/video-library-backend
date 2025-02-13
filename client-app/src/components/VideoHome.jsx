import React from 'react'
import { Link } from 'react-router-dom'

const VideoHome = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
      <Link className='btn btn-light' to="/admin-login">Admin Login</Link>
      <Link className='btn btn-warning ms-2'  to="/user-login">User Login</Link>
    </div>
  )
}

export default VideoHome
