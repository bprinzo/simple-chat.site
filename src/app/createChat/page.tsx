"use client";

import Header from "@/components/Header"
import '../../styles/login.css'
import '../../styles/page.css'
import { useRouter } from 'next/navigation';
import { axiosInstance } from "@/services/api";

export default function CreateChat(){

    const navigation = useRouter()

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        try {
          await axiosInstance.post('/room',
            {
              title: event.currentTarget.chat.value,
            }
          )
          alert('Chat created successfully!')
          navigation.replace('/home')
        } catch (error: any) {
          alert(error.response.data.message)
        }
    }


    return(
        <>
            <Header props= 'Home'/>
            <div className='message'>
                <h1><strong>Create a new chat</strong></h1>
            </div>
            <div className='login'>
                <form action="" onSubmit={handleCreate}>
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