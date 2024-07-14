import { Link ,useNavigate} from 'react-router-dom'
import {toast}from'react-hot-toast';
import { useState } from 'react';

function Login() {

     //import url from env
     const backendurl=import.meta.env.VITE_BACKEND_HOST_URL;

//    creting two user use state
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
// use naviagate
  const naviagte=useNavigate();

  const loginhandle=async()=>{
const res=await fetch(`${backendurl}/api/auth/login`,{
    method:'POST',
    headers:{
        'content-type':'application/json',
    },
    body:JSON.stringify({email,password})
});
//receving response
const logindata=await res.json();
console.log(logindata);
console.log(logindata.token);

// condition
if(logindata.error){
    toast.error(logindata.error);
}else{
   
    toast.success("login sucessful",logindata.sucess);
    naviagte('/');
    localStorage.setItem('token',logindata.token);//token api call karne pe aarha tha isliye hamne ise local storage me store kiya he verna eror aata okay
    
    
}
setEmail("");
setPassword("");


  }





    return (
        <div className=' flex justify-center items-center h-screen'>

            {/* main div  */}
            <div className=' bg-[#d2cbbf] shadow-md px-10 py-10 rounded-xl '>
                
                {/* Top Heading  */}
                <div className="">
                    <h1 className='text-center text-black text-xl mb-4 font-bold'>Login</h1>
                </div>

                {/* Input 1 Email  */}
                <div>
                    <input 
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className=' bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Email'
                    />
                </div>

                {/* Input 2 Password  */}
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className='bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Password'
                    />
                </div>

                {/* Button For Login  */}
                <div className=' flex justify-center mb-3'>
                    <button
                    onClick={loginhandle}
                        className=' bg-green-700 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>

                {/* Link for Signup  */}
                <div>
                    <h2 className='text-black'>Don't have an account <Link className=' text-red-700 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login