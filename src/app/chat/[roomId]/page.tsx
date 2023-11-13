"use client";

import { Socket, io } from 'socket.io-client';
import ChatMessage from '@/components/ChatMessage';
import '../../../styles/chat.css'
import Header from "@/components/Header"
import { axiosInstance } from "@/services/api";
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from "react";
import { Message } from '@/types/Message';


export default function Chat(){
  const { roomId } = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [socket, setSocket] = useState<Socket>()

  const roomName = 'Teste'

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (event.currentTarget.message.value === '') {
      alert('Type a message to send!')
    }
    try {
      const msg = event.currentTarget.message.value
      if (socket) {
        socket.emit('message', {
          roomId: roomId,
          content: msg
        });
        setMessages(prevMessages => [
          ...prevMessages,
          {
            content: msg,
            owner: { id: 'Eu-'}
          }
        ]);
      } else {
        await axiosInstance.post('/message', {
          roomId,
          content: msg
        })
      }
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

  useEffect(() => {
    const socket = io('ws://localhost:3333', {
      auth: {
        token: localStorage.getItem('accessToken')
      },
      transports: ['websocket'],
    })

    setSocket(socket)

    socket.emit('join', roomId)

    socket.on('message', (message) => {
      setMessages(prevMessages => [
        ...prevMessages,
        message
      ]);
    })

    return () => {
      socket.emit('leave', roomId)
      socket.disconnect();
    };
  }, [])

  return(
    <>
      <Header props= 'Home'/>
      <div className='title'>
        <h1><strong>{roomName}</strong></h1>
      </div>
      <div className='container'>
        <div className='messagesContainer'>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message}/>
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