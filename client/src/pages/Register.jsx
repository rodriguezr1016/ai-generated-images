import React, {useContext} from 'react'
import { useMyContext } from '../App';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const {setLoggedIn, loggedIn} = useMyContext();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://ai-generated-images-xqv7.onrender.com/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
          }),
        });
        if(response.ok) {
            const userData = await response.json();
            setLoggedIn(true);
            // navigate('/')

        } else {
            console.error('Registration failed')
        }
    }
  return (
    <div>
        <h1 className="font-extrabold text-center text-[#222328] text-[32px]">Register</h1>
        <form className='flex flex-wrap justify-center items-center gap-2 mb-2' onSubmit={handleSubmit}>
      <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-3/4 p-3' id="username" type="text" placeholder='username' name="username" required />

      <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-3/4 p-3'id="email" placeholder='email' type="email" name="email" required />

      <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-3/4 p-3' id="password" type="password" placeholder='password' name="password" required />
      <div className='flex w-full justify-center'>
      <button className='mt-3 text-white bg-green-700 font-medium rounded-md text-sm w-3/4 block sm:w-auto px-5 py-2.5 text-center'type="submit">Register</button>

      </div>
    </form>
    </div>
  )
}

export default Register