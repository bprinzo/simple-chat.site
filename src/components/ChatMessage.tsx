
import { Message } from '@/types/Message'
import '../styles/chatMessage.css'

export default function ChatMessage({ message }: {message: Message}){
  return(
    <>
      <div className="card">
        <p><strong>{message?.owner?.id.split('-')[0] ?? 'Anônimo'}</strong>: {message.content}</p>
      </div>
    </>
  )
}