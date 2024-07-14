import React from 'react'
import{
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import MyState from './context/data/myState.jsx';
import Home from './pages/home/Home.jsx'
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import AddNote from "./pages/addnote/AddNote.jsx";
import UpdateNote from "./pages/updatenote/Updatenote.jsx";
import NoPage from "./pages/nopage/NoPage.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
   <MyState>
    <Router>
      <Routes>
      
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute> }/>
       
      
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/addnote"element={<ProtectedRoute><AddNote/></ProtectedRoute> }/>
        
      
       <Route path="/notes/edit/:id" element={<ProtectedRoute><UpdateNote/></ProtectedRoute> }/>
       

       
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute> }/>
        <Route path="/*" element={<NoPage/>}/>
      </Routes>
      <Toaster/>
    </Router>
    </MyState>
    </>
  
  )
}

export default App;


// creating protected route function isse bina login ke hum jo jo protected ke ander he usko acess nahe kar sakte okay isse security milta  he


export const ProtectedRoute=({children})=>{
const token=localStorage.getItem('token');
if(token){
  return children;
}else{
  return <Login/>
}
}
