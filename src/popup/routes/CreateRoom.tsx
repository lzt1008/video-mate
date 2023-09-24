import { ChevronLeft, Copy, Loader } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { sendMessage } from 'webext-bridge/popup'
import { useState } from 'react'
import { OperationType } from '../types'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function CreateRoom() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleJoinRoom = async () => {
    setLoading(true)
    sendMessage(OperationType.joinRoom, { roomId: roomId! }, `content-script@${globalThis.currentTabId}`)
      .then((room) => {
        navigate(`/room/${room.id}`)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <CardHeader>
        <Link to='/' className='mb-4 flex items-center gap-1 text-slate-600'>
          <ChevronLeft />
          <span className='text-sm'>返回</span>
        </Link>
        <CardTitle>创建成功</CardTitle>
        <CardDescription>复制房间号给好友吧</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='relative'>
          <Button variant='secondary' size='icon' className='absolute right-0 rounded-tl-none rounded-bl-none'>
            <Copy className='w-4 h-4' />
          </Button>
          <Input className='font-mono shrink w-full pl-4' value={roomId} readOnly />
        </div>
      </CardContent>
      <CardFooter>
        <div className='w-full mt-4' onClick={handleJoinRoom}>
          <Button className='w-full'>
            加入房间
            {loading && <Loader className='w-4 h-4 ml-2 animate-spin' />}
          </Button>
        </div>
      </CardFooter>
    </>
  )
}
