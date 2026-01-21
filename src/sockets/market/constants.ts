export const MARKET = {
  SOCKET_URL: 'wss://anlikaltinfiyatlari.com/sio/p7013/socket.io/?EIO=4&transport=websocket',
  CHANNEL_NAME: 'kapalicarsi',
  SUBSCRIBE_EVENT: 'subscribe',
  SOCKET_CONNECT_MESSAGE: '40',
  SOCKET_PONG_MESSAGE: '3',
  MAX_RECONNECT_ATTEMPTS: 5,
  MAX_RECONNECT_DELAY_MS: 10000,
  RECONNECT_BASE_DELAY_MS: 1000,
} as const;