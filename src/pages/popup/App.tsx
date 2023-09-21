import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function App() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Video Mate</CardTitle>
        <CardDescription>同步播放你的视频</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col justify-between gap-4">
        <Button className="w-full" variant="outline">加入房间</Button>
        <Button className="w-full">创建房间</Button>
      </CardFooter>
    </Card>
  )
}
