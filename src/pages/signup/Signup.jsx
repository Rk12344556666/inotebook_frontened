// import { Link } from 'react-router-dom'
import {Link,useNavigate}from'react-router-dom'
import toast from 'react-hot-toast';
import { useState } from 'react';

function Signup() {

     //import url from env
     const backendurl=import.meta.env.VITE_BACKEND_HOST_URL;

// *creataing three useState
const[name,setName]=useState('');
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');

// naviaget
const navigate=useNavigate();

// *signup handle function
const signupHandle=async()=>{

    // send data through api
    const res=await fetch(`${backendurl}/api/auth/signup`,{
        method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({name,email,password})
    });

// receiving response
const signupdata=await res.json();
// console.log(signupdata);

// condition
if(signupdata.error){
    toast.error(signupdata.error);
}else{
    toast.success(signupdata.success)
    navigate('/login');
}
setName("");
setEmail("");
setPassword("");
}

    return (
        <div className=' flex justify-center items-center h-screen'>

            {/* main div  */}
            <div className=' bg-[#d2cbbf] shadow-md px-10 py-10 rounded-xl '>

                {/* Top Heading  */}
                <div className="">
                    <h1 className='text-center text-black text-xl mb-4 font-bold'>Signup</h1>
                </div>

                {/* Input 1 Name  */}
                <div>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        name='name'
                        className=' bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Name'
                    />
                </div>

                {/* Input 2 Email  */}
                <div>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        name='email'
                        className=' bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Email'
                    />
                </div>

                {/* Input 3 Password  */}
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className='bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Password'
                    />
                </div>

                {/* Button For Signup  */}
                <div className=' flex justify-center mb-3'>
                    <button 
                    onClick={signupHandle}
                        className=' bg-red-700 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>

                {/* Link For Login  */}
                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-green-700 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup