"use client";

import Image from 'next/image'
import Header from '@/components/Header'
import '../styles/page.css';

export default function Home() {
  return (
    <>
        <Header props='Login'/>
          <div className='message'>
            <h1><strong>Connecting you with the world!</strong></h1>
          </div>
          <div className='login'>
            <form action="">
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
