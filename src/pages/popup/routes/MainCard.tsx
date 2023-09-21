import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function MainCard() {
  return (
    <>
      <CardHeader>
        <CardTitle>Video Mate</CardTitle>
        <CardDescription>同步播放你的视频</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col justify-between gap-4">
        <Link to='/join' className="w-full">
          <Button className="w-full" variant="outline">加入房间</Button>
        </Link>
        <Link to='/create' className="w-full">
          <Button className="w-full">创建房间</Button>
        </Link>
      </CardFooter>
    </>
  )
}
