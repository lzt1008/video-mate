import type { ProtocolWithReturn } from 'webext-bridge'
import type { Message, OperationType } from './src/popup/types'
import type { Room } from '@/popup/types'

declare module 'webext-bridge' {
  export interface ProtocolMap {
    // define message protocol types
    // see https://github.com/antfu/webext-bridge#type-safe-protocols
    [OperationType.joinRoom]: ProtocolWithReturn<{ roomId: string }, Room>
    [OperationType.queryRoom]: ProtocolWithReturn<Record<string, never>, Room>
    [OperationType.message]: ProtocolWithReturn<{ message: string }, Message>
    'receive-ws': Message
  }
}
