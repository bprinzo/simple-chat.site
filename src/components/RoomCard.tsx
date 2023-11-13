
import { Room } from '@/types/Room'
import '../styles/roomCard.css'
import { useRouter } from 'next/navigation'

export default function RoomCard({ room }: { room: Room }){

  const navigation = useRouter()

  const handleClick = () => {
    navigation.push(`/chat/${room.id}`)
  }

  return(
    <>
      <div className="roomBox">
        <button onClick={handleClick}>
          <h3><strong>{room.title}</strong></h3>
          <p>#{room.id.split('-')[0]}</p>
        </button>
      </div>
    </>
  )
}