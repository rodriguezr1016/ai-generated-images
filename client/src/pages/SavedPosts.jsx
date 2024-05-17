import {React, useState} from 'react';
import { MyProvider, useMyContext } from '../App';

const SavedPosts = () => {
    const {setLoggedIn, loggedIn} = useMyContext();
    setLoggedIn(true)
  return (
    <div>{loggedIn ? (<>hello world</>): ('hello')}</div>
    
  )
}

export default SavedPosts