import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {preview} from '../assets'
import {getRandomPrompt} from '../utils'
import {FormField, Loader} from '../components'
import { download } from '../assets'
import { downloadImage } from '../utils'
import * as jwtDecode from 'jwt-decode'
const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });
   
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generated, setgenerated] = useState(false)
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode.jwtDecode(token)
        const userId = decodedToken.userId;
  
      if (form.prompt && form.photo) {
        try {
          const response = await fetch('https://ai-generated-images-xqv7.onrender.com/api/v1/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ ...form, userId }),
          });
  
          await response.json();
          alert('Success');
          navigate('/');
        } catch (err) {
          alert(err);
        } finally {
          setLoading(false);
        }
      } else {
        alert('Please generate an image with proper details');
      }
    };
    const generateImage = async () => {
        if (form.prompt) {
          try {
            setGeneratingImg(true);
            const response = await fetch('https://ai-generated-images-xqv7.onrender.com/api/v1/dalle', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt: form.prompt,
              }),
            });
    
            const data = await response.json();
            setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
          } catch (err) {
            alert(err);
          } finally {
            setGeneratingImg(false);
            setgenerated(true)
          }
        } else {
          alert('Please provide proper prompt');
        }
      };
    
    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})

    };
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt)
        setForm({...form, prompt: randomPrompt})
    };
  return (
    <section className="max-w-7xl mx-auto">
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">Create stunning images using DALL-E AI and share them with the world</p>
        <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
            <div className="flex flex-col gap-5">
                <FormField 
                labelName= "Your name"
                type= 'text'
                name= 'name'
                placeholder= 'John Doe'
                value = {form.name}
                handleChange = {handleChange}
                />
                <FormField 
                labelName= "Prompt"
                type= 'text'
                name= 'prompt'
                placeholder= 'The long-lost Star Wars 1990 Japanese Anime'
                value = {form.prompt}
                handleChange = {handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
                />
                <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                    {form.photo ? (
                      <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
    <img
      className="w-full h-auto object-cover rounded-xl"
      src={form.photo}
      alt={form.prompt}
    />
    <div className="group-hover:flex flex-col max-h-[94.5%] absolute bottom-0 left-0 right-0 m-2 p-4 rounded-md">
      

      <div className="mt-5 flex justify-between items-center gap-2">
        
        <button type="button" onClick={() => downloadImage( form.photo)} className="outline-none bg-transparent border-none">
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button>
      </div>
    </div>
  </div>) : (<img src={preview} alt='preview' className='w-9/12 h-9/12 object-contain opacity-40'/>)}
                    {generatingImg && ( 
                    <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                        <Loader />
                    </div>)}
                </div>
            </div>
            <div className="mt-5 flex gap-5">
                <button type='button' className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"onClick={generateImage}>
                    {generatingImg ? 'Generating Image...': 'Generate Image'}
                </button>
            </div>

            {generated ? (<div className="mt-10">
                <p className='mt-2 text-[#666e75] text-[14px]'>Once you've created your image share it with the community</p>
                <button className="mt-3 text-white bg-[#6369ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    {loading ? 'Sharing...' : 'Share'}
                </button>
            </div>) : (<></>)}

        </form>

    </section>
  )
}

export default CreatePost