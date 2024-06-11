import {React, useState} from 'react';

import { download, bookmark } from '../assets';
import { downloadImage } from '../utils';

const handleLike = async (postId) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`https://ai-generated-images-xqv7.onrender.com/api/v1/post/${postId}/like`,{
    method: 'POST',
    headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  const data = await response.json();
  alert(data.message)
};
const Card = ({ _id, name, prompt, photo }) => (
  <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
    <img
      className="w-full h-auto object-cover rounded-xl"
      src={photo}
      alt={prompt}
    />
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
          <p className="text-white text-sm">{name}</p>
        </div>
        <div className='flex gap-1'>
        <button className='text-white' onClick={()=> handleLike(_id)}><img src={bookmark} className='  invert'alt='favorite'/></button>
        <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button>

        </div>
      </div>
    </div>
  </div>
);

export default Card;