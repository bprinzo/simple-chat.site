"use client";

import Header from "@/components/Header"
import '../../styles/login.css'
import '../../styles/page.css'

export default function EnterChat(){


    return(
        <>
            <Header props= 'Home'/>
            <div className='message'>
                <h1><strong>Enter a new chat</strong></h1>
            </div>
            <div className='login'>
                <form action="">
                    <div className='Login-input'>
                        <label htmlFor="inputEnterChart">Name</label>
                        <input 
                            type="text"
                            name='enterChat'      
                            id='inputEnterChat'
                            placeholder='Insert the chat name' 
                        />
                    </div>

                    <button type='submit'>Enter</button>
                </form>
            </div>
            
        </>
    )
}