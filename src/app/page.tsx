"use client";

import Header from '@/components/Header';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../styles/login.css';
import '../styles/page.css';

export default function Login() {
  
  const navegar = useRouter();
  const login = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    console.log(event.currentTarget)
    try {
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
      {
        email: event.currentTarget.email.value,
        password:event.currentTarget.password.value
      },
        
       )
      console.log(data)
    } catch (error) {
      alert(error )
    }
  
  
  }
  return (
    <>
      <Header props='Login'/>
      <div className='message'>
        <h1><strong>Connecting you with the world!</strong></h1>
      </div>
        <div className='login'>
          <form action="" onSubmit={login}>
            <div className='Login-input'>
              <label htmlFor="inputEmail">Email</label>
              <input 
                type="email"
                name='email'      
                id='inputEmail'
                placeholder='Insert your email' 
              />
            </div>
          
            <div className='Login-input'>
              <label htmlFor="inputPassword">Password</label>
              <input 
                type="password"
                name='password'      
                id='inputPassword'
                placeholder='Insert your password' 
              />
            </div>

            <button type='submit'>Enter</button>
          </form>
        </div>
    
    </>
  )
}
