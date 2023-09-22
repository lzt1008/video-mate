import { useEffect } from 'react'
import { sendMessage } from 'webext-bridge/popup'
import { Info, Menu, Send } from 'lucide-react'
import { OperationType } from '../types'
import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function Room() {

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender) => {
      console.log(sender, message)
      return true
    })
  }, [])

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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem className='text-red-600 focus:text-red-700 focus:bg-red-100'>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
        <CardDescription >
          <div className='flex items-center'>
            <div className='w-2 h-2 bg-green-500 rounded-full mr-1' />
            <span className='mr-2'>已连接</span>
            <Separator orientation='vertical' />
            <div className='flex items-center gap-[2px]'>
              <span>共<span className='font-mono'>2</span>人</span>
              <Info className='w-3 h-3' />
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className='py-4 max-h-40 overflow-y-scroll mx-4 mb-4 rounded bg-primary-foreground flex flex-col gap-3'>
        <div className='text-muted-foreground text-xs self-center'>你 加入了房间</div>
        <div className='bg-white w-min rounded px-3 py-1'>hello</div>
        <div className='bg-white w-min rounded px-3 py-1 self-end'>hello</div>
        <div className='text-muted-foreground text-xs self-center'>你 暂停了播放</div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Input />
        <Button className='shrink' onClick={async () => {
          console.log(await sendMessage(OperationType.message, {
            hello: 'world',
          }))
          console.log(await sendMessage(OperationType.queryVideo, {}))
        }}>
          <Send className='w-4 h-4' />
        </Button>
      </CardFooter>
    </>
  )
}
