import { Message } from '@/types/Message'
import '../styles/chatMessage.css'
import uniqolor from 'uniqolor';

export default function ChatMessage({ message, userId }: {message: Message, userId: string | null}){
  const ownerId = message.owner.id
  const color = uniqolor(ownerId || '', { format: 'rgb' }).color
  if (ownerId === userId) {
    return (
      <div className="sendedMessage">
        <p>{message.content}</p>
      </div>
    )
  } else {
    return (
      <div className="receivedMessage">
        <p style={{ ['--color' as any]: color }}><strong>{message.owner.name}</strong></p>
        <p>{message.content}</p>
      </div>
    )
  }
}