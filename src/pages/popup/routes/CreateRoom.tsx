import { ChevronLeft, Copy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function CreateRoom() {
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
          <Input className='font-mono shrink w-full pl-4' value="591 716 5621" readOnly />
        </div>
      </CardContent>
      <CardFooter>
        <Link to='/join' className="w-full mt-4">
          <Button className="w-full">加入房间</Button>
        </Link>
      </CardFooter>
    </>
  )
}
