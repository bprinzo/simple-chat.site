
import { Room } from '@/types/Room'
import '../styles/roomCard.css'

export default function RoomCard({ room }: { room: Room }){
  return(
    <>
      <div className="roomBox">
        <a href="/">
          <h3><strong>{room.title}</strong></h3>
          <p>#{room.id.split('-')[0]}</p>
        </a>
      </div>
    </>
  )
}