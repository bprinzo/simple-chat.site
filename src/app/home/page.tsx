'use client';

import Header from "@/components/Header";
import RoomCard from "@/components/RoomCard";
import '../../styles/home.css'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { axiosInstance } from "@/services/api";
import { Room } from "@/types/Room";

export default function Home (){

    const navegar = useRouter();

    const [rooms, setRooms] = useState<Room[]>([]);

    const getRooms = async () => {
        try {
          const { data } = await axiosInstance.get('/room')
          setRooms(data)
        } catch (error: any) {
          alert(error.response.data.message)
        }
    }

    useEffect(() => {
        getRooms()
    }, [])

    return(
        <>
            <Header props='Home'/>
            <div className="id">
                <h1><strong>{localStorage.getItem('name')}</strong></h1>
            </div>
            <div className="container">
                <div className="container_button">
                    <button onClick={() => navegar.push('/createChat')}>Create Chat</button>
                    <button onClick={() => navegar.push('/enterChat')}>Enter Chat</button>
                </div>
                <h4><strong>Your Chats</strong></h4>
                <div className="container_chatBox">
                    {rooms.map(room => (
                        <RoomCard key={room.id} room={room}/>
                    ))}
                </div>


            </div>
        </>
    )
}