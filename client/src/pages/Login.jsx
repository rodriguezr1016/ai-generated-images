import React, {useState, useContext} from 'react'
import { MyProvider, useMyContext } from '../App';
import { Link, useNavigate} from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    const {setLoggedIn, loggedIn} = useMyContext();
    const [token, setToken] = useState(null)

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('https://ai-generated-images-xqv7.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });
  
      if (response.ok) {
       
        const { token } = await response.json();
  localStorage.setItem('token', token); // Store the token
  setToken(token);
        setLoggedIn(true);
        alert('Logged In')
        navigate('/')

      } else {
        // Handle errors, e.g., show a message to the user
        alert('Login failed');
      }
    };
  
    return (
        <div>
             <h1 className="font-extrabold text-center text-[#222328] text-[32px]">Login</h1>
      <form className='flex flex-wrap justify-center items-center gap-2 mb-2' onSubmit={handleSubmit}>
        {/* Email and Password fields */}
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-3/4 p-3' type="email" name="email" placeholder='email'required />
        <input placeholder='password'className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-3/4 p-3'type="password" name="password" required />
        {/* <button onClick={()=>{
            if(loggedIn){
                setLoggedIn(false)
            }else {
                setLoggedIn(true)
            }
        }}>Click Me</button> */}
        <Link to='/register'>
            <p>Create an account?</p>
        </Link>
      <button className='mt-3 text-white bg-[#6369ff] font-medium rounded-md text-sm w-3/4 sm:w-auto px-5 py-2.5 text-center'type="submit">Log In</button>
      </form>
      </div>
    );
  
  
}

export default Login