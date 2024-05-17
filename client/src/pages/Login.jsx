import React from 'react'
import { MyProvider, useMyContext } from '../App';
const Login = () => {
    const {setLoggedIn} = useMyContext();
  return (
    <div>Login</div>
  )
}

export default Login