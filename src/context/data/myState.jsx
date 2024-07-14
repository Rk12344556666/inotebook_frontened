import React, { useState } from 'react'
import myContext from './myContext.jsx'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


 export default function MyState(props) {
    //import url from env

    const backendurl=import.meta.env.VITE_BACKEND_HOST_URL;

//    *loading state
const[loading,setLoading]=useState(false);

// *get Notes
const[allnotes,setAllnotes]=useState([]);

// get all notes function
const getAllNotes=async()=>{
    setLoading(true);
    try {
        const res=await fetch(`${backendurl}/api/notes/fetchalluser`,{
            method:'GET',
            headers:{
                'content-type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        })
       const notesdata=await res.json();
    //    console.log(notesdata);
       setAllnotes(notesdata);
       setLoading(false);



    } catch (error) {
        console.log(error);
        setLoading(false);
        
    }
}
//add note section code started

const[title,setTitle]=useState('')
const[description,setDescription]=useState('');
const[tag,setTag]=useState('');


// *add note function
const addNote=async ()=>{
    const res=await fetch(`${backendurl}/api/notes/addnotes`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
    })


    // response
    const notedata=await res.json();
    // console.log(notedata)
    getAllNotes();
    // condition
    if(notedata.error){
        toast.error(notedata.error)
    }else{
        toast.success("notes added sucessfully")
       
    }
    setTitle("");
    setDescription("");
    setTag("");
    
}

// delete notes
const deleteNote=async(id)=>{
    const res=await fetch(`${backendurl}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
        }
    });
    // *response
   const notedata=await res.json();
   
   getAllNotes();
   console.log(notedata)
   toast.success("note deleted sucessfully")


}
    return (
        <myContext.Provider value={{ allnotes,getAllNotes,loading,title,description,tag,addNote,setTag,setDescription,setTitle,deleteNote}}>
            {props.children}
        </myContext.Provider>
    )
}
