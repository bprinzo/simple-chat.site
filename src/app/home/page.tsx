"use client";

import Header from "@/components/Header";
import RoomCard from "@/components/RoomCard";
import "../../styles/home.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/services/api";
import { Room } from "@/types/Room";

export default function Home() {
  const navegar = useRouter();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [userName, setUsername] = useState<null | string>("");

  const getRooms = async () => {
    try {
      const { data } = await axiosInstance.get("/room");
      setRooms(data);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getRooms();

    if (typeof window !== "undefined")
      setUsername(localStorage.getItem("name"));
  }, []);

  if (!userName)
    return (
      <>
        <Header props="Home" />
      </>
    );

  return (
    <>
      <Header props="Home" />
      <div className="id">
        <h1>
          <strong>Welcome, {userName}</strong>
        </h1>
      </div>
      <div className="container">
        <div className="container_button">
          <button onClick={() => navegar.push("/createChat")}>
            Create room
          </button>
        </div>
        <h4>
          <strong>Rooms</strong>
        </h4>
        <div className="container_chatBox">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </>
  );
}
