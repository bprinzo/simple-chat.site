"use client";

import Head from "next/head";
import Header from "@/components/Header";
import '../../styles/login.css'



export default function Register (){
    return(
        
        <>
            <Header props='Register'/>
            <div className='message'>
                <h1><strong>Register</strong></h1>
            </div>
            <div className='login'>
                <form action="">
                    <div className='Login-input'>
                        <label htmlFor="inputName">Name</label>
                        <input 
                            type="text"
                            name='name'      
                            id='inputName'
                            placeholder='Insert your Name' 
                        />
                    </div>

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

                    <div className='Login-input'>
                        <label htmlFor="inputConfPassword">Confirm Password</label>
                        <input 
                            type="password"
                            name='confirmPassword'      
                            id='inputConfPassword'
                            placeholder='Confirm your password' 
                        />
                    </div>

                    <button type='submit'>Register</button>
                </form>
         </div>
        
        
        
        
        
        
        </>
    )
}