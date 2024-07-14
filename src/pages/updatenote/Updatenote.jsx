import React, { useState,useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { useNavigate,useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const Updatenote = () => {

   //import url from env
   const backendurl=import.meta.env.VITE_BACKEND_HOST_URL;

    // * all state
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('');
    const[tag,setTag]=useState('')

    // get id from use params
    const{id}=useParams();

    // *naviagate
    const navigate=useNavigate();

    // *get note by id

    const getNotesById=async()=>{
        const res=await fetch(`${backendurl}/api/notes/getnotes/${id}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const data=await res.json();
        // set data
        setDescription(data?.description)
        setTitle(data?.title)
        setTag(data?.tag)
    }
    // get data automatically
    useEffect(() => {
    getNotesById();
    }, [id]);


    // update note function
    const updateNote=async()=>{

try {
    
const res=await fetch(`http://localhost:4000/api/notes/updatenote/${id}`,{
    method:'PUT',
    headers:{
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')  
    },
    body: JSON.stringify({title,description,tag})
});

// response
const notedata=await res.json();

// condition
if(notedata.error){
    toast.error(notedata.error)
}else{
    toast.success("Update Sucessful!")
    navigate('/')
}


} catch (error) {
    console.log(error);
}

    }

  return (
  <Layout>
    <div className=' lg:mx-[6em] mt-16 lg:mt-0 flex justify-center items-center h-screen'>
                <div className=' bg-[#d2cbbf] lg:w-[60em] lg:h-[35em]  rounded-xl p-10   '>
                    <div className="">
                        {/* Top Heading  */}
                        <div className=" mb-5">
                            <h1 className='text-center text-black text-xl  font-bold'>
                                Notes Update
                            </h1>
                        </div>
                        {/* Input 1  */}
                        <div>
                            <input type="text"
                                name='title'
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                className='inputShadow
                                 mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black outline-none'
                                placeholder='Title'
                            />
                        </div>
                        {/* Input 2  */}
                        <div>
                            <input type="text"
                                name='tag'
                                value={tag}
                                onChange={(e)=>setTag(e.target.value)}
                                className='inputShadow
                                  mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black outline-none'
                                placeholder='Tag'
                            />
                        </div>
                        {/* TextArea 3  */}
                        <div>
                            <textarea
                                name=""
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                id="" cols="30" rows="10" className='inputShadow
                                  mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black outline-none'
                                placeholder='Description'>
                            </textarea>
                        </div>
                        {/* Button  */}
                        <div className=' flex justify-center mb-3'>
                            <button
                            onClick={updateNote}
                                className=' bg-[#000000] w-full text-white font-bold  px-2 
                                py-2.5 rounded-md'>
                                    Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
  </Layout>
  )
}

export default Updatenote
