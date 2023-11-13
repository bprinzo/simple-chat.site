
import '../styles/chatMessage.css'

type Message = {
  content: string
}

export default function ChatMessage({ content }: Message){
  return(
    <>
      <div className="card">
        <p><strong>Zé ruela</strong>: {content}</p>
      </div>
    </>
  )
}