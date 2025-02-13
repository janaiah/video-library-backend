import React from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  return (
    <div className='bg-light p-2 m-2 w-25' style={{height: '40vh'}}>
      <h3>
        User Login
        </h3>
        <form>
            <div className="form-group">
                <label for="username">Username:</label>
                <input type="text" name="username" className="form-control" />
            </div>
            <div className="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" className="form-control" />
            </div>
            <div className='mt-3'>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            </div>
            <div className='mt-2 text-center'>
            <Link to='/'>Back to Home</Link>
            </div>
        </form>
        
    </div>
  )
}

export default UserLogin
