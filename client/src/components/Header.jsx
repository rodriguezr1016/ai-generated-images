import React, {useState, useEffect, createContext, useContext} from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import {logo} from '../assets'
import {profile} from '../assets'
import { MyProvider, useMyContext } from '../App';
const Header = () => {
  // const [showAlert, setShowAlert] = React.useState(true)
  // useEffect(() => {
  //   if (showAlert) {
  //     alert('Try logging in to save posts and more!');
  //     setShowAlert(false); // Prevent the alert from showing again
  //   }
  // }, []);
    const {loggedIn, setLoggedIn} = useMyContext()
    const handleLogout = () => {
      localStorage.removeItem('token'); // Remove the token
      setLoggedIn(false); // Update the logged-in state
      window.location.reload
    };
  return (
    <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to={'/'}>
          <img src={logo} alt="logo" className='w-28 object-contain'/>
        </Link>
        <div className='flex gap-5 items-center'>
        <Link className='group' to={loggedIn ? '/profile': '/login'}>
          <img src={profile} alt="" /> 
          {loggedIn ? (
            <div className='group-hover:flex relative -mx-1.5 text-xs text-[#222328] hidden'>
            Profile
          </div>
          ): (<div className='group-hover:flex relative -mx-1 text-xs text-[#222328] hidden'>
            Login
          </div>)}
        </Link>
        {loggedIn ? (<button className='font-inter font-medium bg-green-700 text-white px-4 py-2 rounded-md' onClick={handleLogout}>Logout</button>) : (<></>)}
        <Link to={'/create-post'} className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
          Create
        </Link>

        </div>
      </header>
  )
}

export default Header