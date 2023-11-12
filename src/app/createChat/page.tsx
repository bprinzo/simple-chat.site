"use client";

import Header from "@/components/Header"
import '../../styles/login.css'
import '../../styles/page.css'

export default function CreateChat(){


    return(
        <>
            <Header props= 'Home'/>
            <div className='message'>
                <h1><strong>Create a new chat</strong></h1>
            </div>
            <div className='login'>
                <form action="">
                    <div className='Login-input'>
                        <label htmlFor="inputChat">Name</label>
                        <input 
                            type="text"
                            name='chat'      
                            id='inputChat'
                            placeholder='Insert the chat name' 
                        />
                    </div>

                    <button type='submit'>Create</button>
                </form>
            </div>
            
        </>
    )
}