import {useEffect, React, useState} from 'react';
import * as jwtDecode from 'jwt-decode';
import { MyProvider, useMyContext } from '../App';
import { Card } from '../components';
const Profile = () => {
    const [posts, setPosts] = useState(null)
    const [userId, setUserId] = useState(null)
    const token = localStorage.getItem('token');
    const RenderCards = ({data, title}) => {
      if(data?.length > 0){
      return data.map((post) => <Card key ={post._id} {...post}/>)
      }
      return(
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
      )
        
    };
    useEffect(() => {
     if(token) {
      try {
        const decodedToken = jwtDecode.jwtDecode(token)
        const userId = decodedToken.userId;
        setUserId(userId)
        console.log(userId)
      } catch (error) {
        console.log('FU',error)
      }
     }
    }, [])
    const fetchUserPosts = async () => {
      const decodedToken = jwtDecode.jwtDecode(token)
      const userId = decodedToken.userId;
      const response = await fetch(`http://localhost:8080/api/v1/post/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data.data)
        const array = [{id: '1234', name: 'rene'}]
        setPosts(data.data);
        // console.log(data.data)
        console.log(posts)
      } else {
        console.error('failed to fetch posts')
      }
    };

   useEffect(() => {
     fetchUserPosts()
   }, [])
   
    



  return (
    <div>
    {/* Other profile content */}
    <h2>Your Posts</h2>
    <div>
    <RenderCards 
       data={posts}
       title="No Posts Found"/>
    </div>
    
  </div>
    
  )
}

export default Profile