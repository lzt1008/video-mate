import { Info, Menu, Send } from 'lucide-react'
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

export default function Room() {
  return (
    <>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          一起播放中
          <div>
            <Menu className='w-5 h-5' />
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
        <Button className='shrink'>
          <Send className='w-4 h-4' />
        </Button>
      </CardFooter>
    </>
  )
}
