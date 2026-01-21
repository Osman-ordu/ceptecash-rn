import { useCallback, useEffect, useRef, useState } from 'react';
import { ICurrencyData } from '@/types';
import { MARKET } from '../sockets/market/constants';
import { parseCurrencyPayload } from '../sockets/market/parseCurrencyPayload';
import { ParsedPacket } from '../sockets/socketIo/parsedPacket';
import { parseSocketMessage } from '../sockets/socketIo/parseSocketMessage';

export function useCurrencySocket() {
  const [currencies, setCurrencies] = useState<Record<string, ICurrencyData>>({});
  const [isConnected, setIsConnected] = useState(false);
  const [hasData, setHasData] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const connectRef = useRef<() => void>(() => {});
  const hasDataRef = useRef(false);
  const isSubscribedRef = useRef(false);

  const resetState = useCallback(() => {
    setIsConnected(false);
    setHasData(false);
    setCurrencies({});
    hasDataRef.current = false;
    isSubscribedRef.current = false;
  }, []);

  const sendIfOpen = useCallback((message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    }
  }, []);

  const subscribeOnce = useCallback(() => {
    if (isSubscribedRef.current) return;
    const subscribeMessage = JSON.stringify([MARKET.SUBSCRIBE_EVENT, MARKET.CHANNEL_NAME]);
    sendIfOpen(`42${subscribeMessage}`);
    isSubscribedRef.current = true;
  }, [sendIfOpen]);

  const handlePacket = useCallback(
    (packet: ParsedPacket) => {
      switch (packet.type) {
        case 'ping':
          sendIfOpen(MARKET.SOCKET_PONG_MESSAGE);
          return;
        case 'open':
          setIsConnected(true);
          reconnectAttemptsRef.current = 0;
          return;
        case 'connect':
          setIsConnected(true);
          subscribeOnce();
          return;
        case 'disconnect':
          setIsConnected(false);
          return;
        case 'event':
          if (packet.event === MARKET.CHANNEL_NAME || packet.event === 'update') {
            const updatedCurrencies = parseCurrencyPayload(packet.data);
            if (Object.keys(updatedCurrencies).length > 0) {
              if (!hasDataRef.current) {
                hasDataRef.current = true;
                setHasData(true);
              }
              setCurrencies((prev) => ({
                ...prev,
                ...updatedCurrencies,
              }));
            }
          }
          return;
        default:
          return;
      }
    },
    [sendIfOpen, subscribeOnce]
  );

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const message = typeof event.data === 'string' ? event.data : '';
      if (!message) return;
      const packet = parseSocketMessage(message);
      if (!packet) return;
      handlePacket(packet);
    },
    [handlePacket]
  );

  const scheduleReconnect = useCallback(() => {
    if (reconnectAttemptsRef.current >= MARKET.MAX_RECONNECT_ATTEMPTS) return;
    reconnectAttemptsRef.current += 1;
    const delay = Math.min(
      MARKET.RECONNECT_BASE_DELAY_MS * Math.pow(2, reconnectAttemptsRef.current - 1),
      MARKET.MAX_RECONNECT_DELAY_MS
    );
    reconnectTimeoutRef.current = setTimeout(() => {
      connectRef.current();
    }, delay);
  }, []);

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(MARKET.SOCKET_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        reconnectAttemptsRef.current = 0;
        sendIfOpen(MARKET.SOCKET_CONNECT_MESSAGE);
      };

      ws.onmessage = handleMessage;

      ws.onerror = () => {
        setIsConnected(false);
      };

      ws.onclose = () => {
        resetState();
        wsRef.current = null;
        scheduleReconnect();
      };
    } catch {
      resetState();
    }
  }, [handleMessage, resetState, scheduleReconnect, sendIfOpen]);

  useEffect(() => {
    connectRef.current = connect;
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  return {
    currencies,
    isConnected,
    hasData,
  };
}

