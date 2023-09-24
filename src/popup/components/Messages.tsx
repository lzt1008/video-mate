import type { FC } from 'react'
import type { Message } from '../types'

interface MessageProps {
  message: Message
}

function isSelf(message: Message) {
  return message.socketId === message.sender.id
}

const messageMap: Record<string, FC<MessageProps>> = {
  'seeked': ({ message }) => <div className='text-muted-foreground text-xs self-center'>{isSelf(message) ? '你' : message.sender.id} 调整了进度：{message.data.currentTime}</div>,
  'play': ({ message }) => <div className='text-muted-foreground text-xs self-center'>{isSelf(message) ? '你' : message.sender.id} 开始了播放</div>,
  'pause': ({ message }) => <div className='text-muted-foreground text-xs self-center'>{isSelf(message) ? '你' : message.sender.id} 暂停了播放</div>,
  'join-room': ({ message }) => <div className='text-muted-foreground text-xs self-center'>{isSelf(message) ? '你' : message.sender.id} 加入了房间</div>,
  'message': ({ message }) => <div className={`bg-white w-min rounded px-3 py-1 ${isSelf(message) ? 'self-end' : ''}`}>{ message.data.message?.message }</div>,
}

export default function Messages({ messages }: { messages: Message[] }) {
  return (
    <>
     {
      messages.map((message) => {
        const Component = messageMap[message.op]
        return <Component message={message} />
      })
     }
    </>
  )
}
