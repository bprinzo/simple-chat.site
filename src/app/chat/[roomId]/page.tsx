"use client";

import "../../../styles/chat.css";
import { Socket, io } from "socket.io-client";
import ChatMessage from "@/components/ChatMessage";
import Header from "@/components/Header";
import { axiosInstance } from "@/services/api";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "@/types/Message";
import { getCookie } from "cookies-next";
import { useChatScroll } from "@/hooks/useChatScroll";

export default function Chat() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket>();
  const [room, setRoom] = useState<any>();
  const ref = useChatScroll(messages);

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.message.value === "") {
      alert("Type a message to send!");
      return;
    }
    try {
      const msg = event.currentTarget.message.value;
      if (socket) {
        socket.emit("message", {
          roomId: roomId,
          content: msg,
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: msg,
            owner: {
              id: localStorage.getItem("userId"),
              name: localStorage.getItem("name"),
            },
          },
        ]);
      } else {
        await axiosInstance.post("/message", {
          roomId,
          content: msg,
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: msg,
            owner: {
              id: localStorage.getItem("userId"),
              name: localStorage.getItem("name"),
            },
          },
        ]);
      }
      event.currentTarget.message.value = "";
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const getMessages = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`/message?roomId=${roomId}`);
      setMessages(data.items);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }, [roomId]);

  const getRoom = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`/room/${roomId}`);
      setRoom(data);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }, [roomId]);

  useEffect(() => {
    getMessages();
    getRoom();
  }, [getMessages, getRoom]);

  useEffect(() => {
    const socket = io("ws://localhost:3333", {
      auth: {
        token: getCookie("token"),
      },
      transports: ["websocket"],
    });

    setSocket(socket);

    socket.emit("join", roomId);

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit("leave", roomId);
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <>
      <Header props="Home" />
      <div className="container">
        <div className="title">
          <h1>
            <strong>
              {room?.title} #{room?.id.split("-")[0]}
            </strong>
          </h1>
        </div>
        <div ref={ref} className="messagesContainer">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              userId={localStorage.getItem("userId")}
            />
          ))}
        </div>
        <form action="" onSubmit={handleSend}>
          <div className="sendContainer">
            <input
              type="text"
              name="message"
              className="input"
              placeholder="Type a message"
            />
            <div className="sendButton">
              <button type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
