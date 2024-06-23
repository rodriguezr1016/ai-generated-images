import {useEffect, React, useState} from 'react';
import * as jwtDecode from 'jwt-decode';
import { MyProvider, useMyContext } from '../App';
import { Card } from '../components';
import { PostCard } from '../components';
const Profile = () => {
 
    const [posts, setPosts] = useState(null);
    const [likes, setLikes] = useState(null);
    const [postsLoading, setPostsLoading] = useState(true); // Loading state for posts
  const [likesLoading, setLikesLoading] = useState(true); // Loading state for likes

    const [userId, setUserId] = useState(null);
    const token = localStorage.getItem('token');
    const RenderCards = ({data, title}) => {
      if(data?.length > 0){
      return data.map((post) => <Card key ={post._id} {...post}/>)
      }
      return(
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
      )
        
    };
    const PostRenderCards = ({data, title}) => {
      if(data?.length > 0){
      return data.map((post) => <PostCard key ={post._id} {...post}/>)
      }
      return(
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}
</h2>
      )
        
    };
    const fetchUserPosts = async () => {
      try {
        const decodedToken = jwtDecode.jwtDecode(token);
        const userId = decodedToken.userId;
  
        const response = await fetch(`https://ai-generated-images-xqv7.onrender.com/api/v1/post/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
  
        if (response.ok) {
          const result = await response.json();
          setPosts(result.data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setPostsLoading(false); // Set loading to false once data is fetched
      }
    };
  
    const fetchUserLikes = async () => {
      try {
        const decodedToken = jwtDecode.jwtDecode(token);
        const userId = decodedToken.userId;
  
        const response = await fetch(`https://ai-generated-images-xqv7.onrender.com/api/v1/post/${userId}/likes`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('Fetched Likes:', result); // Log the fetched data
          setLikes(result.data); // Directly setting the likes data
        } else {
          console.error('Failed to fetch likes');
        }
      } catch (error) {
        console.error('Error fetching user likes:', error);
      } finally {
        setLikesLoading(false); // Set loading to false once data is fetched
      }
    };
  
    useEffect(() => {
      fetchUserPosts();
      fetchUserLikes();
    }, []);
  
   if(!likesLoading)(
    console.log(likes)
   )
  
   
    // console.log(likes)



  return (
    <div className=''>
    {/* Other profile content */}
    <h1 className="font-extrabold text-[#222328] text-[32px]">Your Posts</h1>
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 mb-20">
    <PostRenderCards 
       data={posts}
       title="No Posts Found"/>
    </div>
    <h1 className="font-extrabold text-[#222328] text-[32px]">Your Likes</h1>
    {likesLoading ? (
        <p>Loading likes...</p>
      ) : (<div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 mb-20"> <RenderCards 
      data={likes}
      title="No Posts Found"/>
      </div>
      )}

    
  </div>
    
  )
}

export default Profile