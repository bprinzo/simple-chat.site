'use client';

import Header from "@/components/Header";
import ChatCard from "@/components/ChatCard";
import '../../styles/home.css'

export default function Home (){
    return(
        <>
            <Header props='Home'/>
            <div className="id">
                <h1><strong>Username</strong></h1>
            </div>
            <div className="container">
                <div className="container_button">
                    <button>Create Chat</button>
                    <button>Enter Chat</button>
                </div>
                <h4><strong>Your Chats</strong></h4>
                <div className="container_chatBox">
                    <ChatCard/>
                    <ChatCard/>
                </div>


            </div>
        </>
    )
}