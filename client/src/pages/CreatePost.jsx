import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {preview} from '../assets'
import {getRandomPrompt} from '../utils'
import {FormField, Loader} from '../components'
const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = () => {

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
                />
            </div>
        </form>

    </section>
  )
}

export default CreatePost