import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import MainCard from './routes/MainCard'
import JoinRoom from './routes/JoinRoom'
import CreateRoom from './routes/CreateRoom'
import PopupLayout from './layout'
import '@/style.css'

const router = createMemoryRouter([{
  path: '/',
  element: <PopupLayout />,
  children: [
    {
      path: '/',
      element: <MainCard />,
    },
    {
      path: '/join',
      element: <JoinRoom />,
    },
    {
      path: '/create',
      element: <CreateRoom />,
    },
  ],
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)