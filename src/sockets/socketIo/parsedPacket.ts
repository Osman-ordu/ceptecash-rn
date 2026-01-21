export type ParsedPacket =
| { type: 'open'; data: unknown }
| { type: 'connect' }
| { type: 'disconnect' }
| { type: 'ping' }
| { type: 'pong' }
| { type: 'event'; event: string; data: unknown };