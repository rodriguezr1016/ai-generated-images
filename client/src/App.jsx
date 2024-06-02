import React, {useState, useEffect, createContext, useContext} from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { Header } from './components'
const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true); // Set logged-in state based on the token
    }
  }, []);

  return (
    <MyContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
const App = () => {
  const [loggedIn, setLoggedIn] = useState(true)
  return (
    <MyProvider>
    <BrowserRouter>
      <Header />
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh - 73px)]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-post' element={<CreatePost/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </main>
    </BrowserRouter>
    </MyProvider>
  )
}

export default App
