import { ParsedPacket } from '@/sockets/socketIo/parsedPacket';
import { safeJsonParse } from '@/utils/general';

export const parseSocketMessage = (message: string): ParsedPacket | null => {
    if (!message) return null;

    const packetType = Number.parseInt(message[0], 10);

    if (packetType === 0) {
      const config = message.length > 1 ? safeJsonParse(message.substring(1)) : null;
      return { type: 'open', data: config };
    }

    if (packetType === 2) {
      return { type: 'ping' };
    }

    if (packetType === 3) {
      return { type: 'pong' };
    }

    if (packetType === 4) {
      if (message.startsWith('40')) {
        return { type: 'connect' };
      }
      if (message.startsWith('41')) {
        return { type: 'disconnect' };
      }

      const numericPrefix = message.slice(1).match(/^\d*/);
      const jsonStart = 1 + (numericPrefix ? numericPrefix[0].length : 0);
      const dataStr = message.substring(jsonStart);
      const parsed = dataStr ? safeJsonParse(dataStr) : null;

      if (Array.isArray(parsed) && parsed.length >= 1) {
        return {
          type: 'event',
          event: String(parsed[0]),
          data: parsed[1] ?? parsed.slice(1),
        };
      }
    }

    return null;
  };