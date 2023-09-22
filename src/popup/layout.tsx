import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Card } from '@/components/ui/card'

const PopupLayout: FC = () => {
  return (
    <Card className="w-[300px] rounded-none">
      <Outlet />
    </Card>
  )
}

export default PopupLayout
