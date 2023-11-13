"use client";

import ChatMessage from '@/components/ChatMessage';
import '../../../styles/chat.css'
import Header from "@/components/Header"
import { axiosInstance } from "@/services/api";
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from "react";

export default function Chat(){
  const { roomId } = useParams()
  const [messages, setMessages] = useState([])

  const roomName = 'Teste'

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (event.currentTarget.message.value === '') {
      alert('Type a message to send!')
    }
    try {
      await axiosInstance.post('/message', {
        roomId,
        content: event.currentTarget.message.value
      })
      event.currentTarget.message.value = ''
    } catch (error: any) {
      alert(error.response.data.message)
    }
  }

  const getMessages = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`/message?roomId=${roomId}`)
      setMessages(data.items)
    } catch (error: any) {
      alert(error.response.data.message)
    }
  }, [roomId])

  useEffect(() => {
    getMessages()
  }, [getMessages])

  return(
    <>
      <Header props= 'Home'/>
      <div className='title'>
        <h1><strong>{roomName}</strong></h1>
      </div>
      <div className='container'>
        <div className='messagesContainer'>
          {messages.map(({id, content}) => (
            <ChatMessage key={id} content={content}/>
          ))}
        </div>
        <form action="" onSubmit={handleSend}>
          <div className='sendContainer'>
            <input
              type="text"
              name='message'      
              className='input'
              placeholder='Type a message' 
            />
            <div className='sendButton'>
              <button type='submit'>Send</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}