import type { Socket } from 'socket.io-client'

export enum OperationType {
  queryVideo = 'query-video',
  queryRoom = 'query-room',
  joinRoom = 'join-room',
  crateRoom = 'crate-room',
  message = 'message',
}

export interface Message {
  sender: {
    id: string
    username: string
  }
  socketId?: string
  op: string
  data: any
  timestamp: number
}

export interface Room {
  id: string
  socketId: string
  messages: Array<Message>
}

export interface Synchronizer {
  room: Room
  socket: Socket
  videoEl: HTMLVideoElement
}
