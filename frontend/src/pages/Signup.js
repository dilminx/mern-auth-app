import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Signup = () => {
const [user,setUsers]=useState([])
const [email,setEmail]=useState('')
const [username,setUsername]=useState('')
const [password,setPassword]=useState('')
const navigate = useNavigate()

useEffect(()=>{
    fetchUsers();
},[])

const fetchUsers = () =>{
    axios.get('http://localhost:8000/register')
.then((res)=>{
    //console.log(res.data)
})
}

const handleRegister = (event)=>{
    event.preventDefault();
    axios.post('http://localhost:8000/register',{email,username,password})
    .then(()=>{
        alert('Register successfully')
        setEmail('')
        setUsername('')
        setPassword('')
        fetchUsers()
        navigate('/loggin')
    }).catch((error)=>{
        console.log('unable to register',error)
        window.location.reload();
    })
}

  return (
    <div className='w-full h-screen flex'>
        <div className=' w-1/2 h-full flex bg-slate-900 text-white  justify-center items-center'>
            <form className=' text-center border rounded-lg w-[600px] h-[430px] items-center justify-center
             p-9'
             onSubmit={handleRegister}>
                <label>Email</label><br/>
                < input placeholder='Enter your Email' type={'text'} value={email} onChange={(e)=>setEmail(e.target.value)}
                className='w-[400px] h-[40px] bg-slate-500 p-3 m-3 rounded-md'/><br/>
                <label>User Name</label><br/>
                <input placeholder='Enter your User Name'  type={'text'} value={username} onChange={(e)=>setUsername(e.target.value)}
                className='w-[400px] h-[40px] bg-slate-500 p-3 m-3 rounded-md'/><br/>
                <label>Password</label><br/>
                <input placeholder='Enter your Password' type={'password'} value={password} onChange={(e)=>setPassword(e.target.value)}
                className='w-[400px] h-[40px] bg-slate-500 p-3 m-3 rounded-md'/><br/><br/>

                <button type='submit' className=' bg-lime-800 p-2 rounded-xl px-4 '>Submit</button>

            </form>
        </div>
        <div className=' bg-lime-800  w-1/2 h-screen  flex items-center justify-center'>
            <h1 className=' text-white font-bold text-4xl'>Sign Up</h1>
        </div>
    </div>
  )
}


export default Signup