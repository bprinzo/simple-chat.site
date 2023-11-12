"use client";

import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import '../styles/login.css';
import '../styles/page.css';
import { axiosInstance, setAccessToken } from '@/services/api';

export default function Login() {
  
  const navigation = useRouter();
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    try {
      const {data} = await axiosInstance.post('/auth/signin',
        {
          email: event.currentTarget.email.value,
          password:event.currentTarget.password.value
        }
      )
      setAccessToken(data.token)
      navigation.push('/home')
    } catch (error: any) {
      alert(error.response.data.message)
    }
  
  
  }
  return (
    <>
      <Header props='Login'/>
      <div className='message'>
        <h1><strong>Connecting you with the world!</strong></h1>
      </div>
        <div className='login'>
          <form action="" onSubmit={handleSignIn}>
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
