import { Link, useNavigate } from 'react-router-dom'
import { sendMessage } from 'webext-bridge/popup'
import { useEffect, useState } from 'react'
import { OperationType } from '../types'
import { Button } from '@/components/ui/button'
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function MainCard() {
  const [hasVideo, setHasVideo] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
      globalThis.currentTabId = tab.id!

      const room = await sendMessage(OperationType.queryRoom, {}, `content-script@${tab.id}`)
      console.log(room)

      if (room)
        navigate(`/room/${room.id}`)

      const video = await sendMessage(OperationType.queryVideo, {}, `content-script@${tab.id}`)

      if (video) setHasVideo(true)
    })()
  }, [])

  return (
    <>
      {hasVideo ?
        <>
          <CardHeader>
            <CardTitle>Video Mate</CardTitle>
            <CardDescription>同步播放你的视频</CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col justify-between gap-4">
            <Link to='/join' className="w-full">
              <Button className="w-full" variant="outline">加入房间</Button>
            </Link>
            <Button className="w-full" onClick={() => {
              const id = 'abc123'
              // const id = crypto.randomUUID().split('-').at(-1)
              navigate(`/create/${id}`)
            }}>创建房间</Button>
          </CardFooter>
        </>
        : <CardHeader>
          <CardTitle>此页面没有视频</CardTitle>
        </CardHeader>
      }
    </>
  )
}
