import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Navbar = () => {
  const isUserSignIn = !!localStorage.getItem('token')
  const navigate =useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  };
  return (
 <nav className='flex justify-around p-5 bg-zinc-700 font-bold text-zinc-200 border-b border-zinc-900'>
    <Link className=' text-3xl' to={'/'}><h1>userAuth</h1></Link>
    <ul className=' items-center text-xl'>
      {isUserSignIn?(
        <>
                <Link className='p-3' to={'/account'}>Account</Link>
                <Link className='p-3' onClick={handleSignOut}>Signout</Link>
              

        </>
      ):(
        <>
         <Link className='p-1' to={'/loggin'}>Loggin</Link>
        <Link className='p-1' to={'/signup'}>SignUp</Link>
        </>
      )}
       
    </ul>
 </nav>
  )
}

export default Navbar