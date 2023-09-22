import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function JoinRoom() {
  return (
    <>
      <CardHeader>
        <Link to='/' className='flex items-center gap-1 text-slate-600'>
          <ChevronLeft />
          <span className='text-sm'>返回</span>
        </Link>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">房间号</Label>
              <Input id="name" placeholder="好友的房间号" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">昵称</Label>
              <Input id="name" placeholder="你的昵称" />
            </div>
            <Link to='/join' className="w-full mt-4">
              <Button className="w-full">加入房间</Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </>
  )
}
