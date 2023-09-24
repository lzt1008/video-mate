import { useEffect, useState } from 'react'
import { onMessage, sendMessage } from 'webext-bridge/popup'
import { Menu, Send } from 'lucide-react'
import { useParams } from 'react-router-dom'
import type { Message } from '../types'
import { OperationType } from '../types'
import Messages from '../components/Messages'
import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function Room() {
  const { roomId } = useParams()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const rm = onMessage('receive-ws', (msg) => {
      console.log(msg)

      setMessages([...messages, msg.data])
    })
    return rm
  }, [messages])

  const handleSendMessage = async (e: any) => {
    e.preventDefault()
    const message = await sendMessage(OperationType.message, {
      message: input,
    }, `content-script@${globalThis.currentTabId}`)
    setMessages([...messages, {
      ...message,
      socketId: message.sender.id,
    }])
    setInput('')
  }

  return (
    <>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          一起播放中
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className='w-5 h-5' />
              </DropdownMenuTrigger>
              <DropdownMenuContent side='left' align='start'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{JSON.stringify(roomId)}</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem className='text-red-600 focus:text-red-700 focus:bg-red-100'>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
        <CardDescription>
          <span className='mr-2'>已连接</span>
          {/* <div className='flex items-center'>
            <div className='w-2 h-2 bg-green-500 rounded-full mr-1' />
            <Separator orientation='vertical' />
            <div className='flex items-center gap-[2px]'>
              <span>共<span className='font-mono'>2</span>人</span>
              <Info className='w-3 h-3' />
            </div>
          </div> */}
        </CardDescription>
      </CardHeader>
      <CardContent className='py-4 max-h-40 overflow-y-scroll mx-4 mb-4 rounded bg-primary-foreground flex flex-col gap-3'>
        <Messages messages={messages} />
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className='flex justify-between gap-4'>
          <Input value={input} onChange={e => setInput(e.target.value)} />
          <Button className='shrink' onClick={handleSendMessage}>
            <Send className='w-4 h-4' />
          </Button>
        </form>
      </CardFooter>
    </>
  )
}
