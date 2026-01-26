import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ICurrencyData } from '@/types';
import { MARKET } from '../sockets/market/constants';

type PricePayload = ICurrencyData[];
type LabelPayload = { symbol: string; label: string; category?: 'STOCK_MARKET' | 'PRECIOUS_METALS' }[];

export function useCurrencySocket() {
  const [stockMarketCurrencies, setStockMarketCurrencies] = useState<Record<string, ICurrencyData>>(
    {}
  );
  const [preciousMetalsCurrencies, setPreciousMetalsCurrencies] = useState<
    Record<string, ICurrencyData>
  >({});
  const [allCurrencies, setAllCurrencies] = useState<Record<string, ICurrencyData>>({});
  const [stockMarketSymbols, setStockMarketSymbols] = useState<string[]>([]);
  const [preciousMetalsSymbols, setPreciousMetalsSymbols] = useState<string[]>([]);
  const [allSymbols, setAllSymbols] = useState<string[]>([]);
  const [stockMarketLabels, setStockMarketLabels] = useState<Record<string, string>>({});
  const [preciousMetalsLabels, setPreciousMetalsLabels] = useState<Record<string, string>>({});
  const [allLabels, setAllLabels] = useState<Record<string, string>>({});
  const [isConnected, setIsConnected] = useState(false);
  const [hasData, setHasData] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const hasDataRef = useRef(false);

  const resetState = useCallback(() => {
    setIsConnected(false);
    setHasData(false);
    hasDataRef.current = false;
    setStockMarketCurrencies({});
    setPreciousMetalsCurrencies({});
    setAllCurrencies({});
    setStockMarketSymbols([]);
    setPreciousMetalsSymbols([]);
    setAllSymbols([]);
    setStockMarketLabels({});
    setPreciousMetalsLabels({});
    setAllLabels({});
  }, []);

  const applyPrices = useCallback(
    (
      data: PricePayload,
      setTarget: React.Dispatch<React.SetStateAction<Record<string, ICurrencyData>>>
    ) => {
      if (!Array.isArray(data) || data.length === 0) {
        return;
      }
      const updatedCurrencies: Record<string, ICurrencyData> = {};
      data.forEach((item) => {
        if (!item?.symbol) return;
        updatedCurrencies[item.symbol] = {
          symbol: item.symbol,
          buyPrice: item.buyPrice,
          sellPrice: item.sellPrice,
          changePercent: item.changePercent ?? 0,
          timestamp: item.timestamp ?? Date.now(),
        };
      });
      if (Object.keys(updatedCurrencies).length > 0) {
        if (!hasDataRef.current) {
          hasDataRef.current = true;
          setHasData(true);
        }
        setTarget((prev) => ({
          ...prev,
          ...updatedCurrencies,
        }));
      }
    },
    []
  );

  const handleStockPrices = useCallback(
    (data: PricePayload) => applyPrices(data, setStockMarketCurrencies),
    [applyPrices]
  );

  const handlePreciousPrices = useCallback(
    (data: PricePayload) => applyPrices(data, setPreciousMetalsCurrencies),
    [applyPrices]
  );

  const handleAllPrices = useCallback(
    (data: PricePayload) => applyPrices(data, setAllCurrencies),
    [applyPrices]
  );

  const applySymbols = useCallback(
    (data: string[], setTarget: React.Dispatch<React.SetStateAction<string[]>>) => {
      if (Array.isArray(data) && data.length > 0) {
        setTarget(data);
      }
    },
    []
  );

  const handleStockSymbols = useCallback(
    (data: string[]) => applySymbols(data, setStockMarketSymbols),
    [applySymbols]
  );

  const handlePreciousSymbols = useCallback(
    (data: string[]) => applySymbols(data, setPreciousMetalsSymbols),
    [applySymbols]
  );

  const handleAllSymbols = useCallback(
    (data: string[]) => applySymbols(data, setAllSymbols),
    [applySymbols]
  );

  const applyLabels = useCallback(
    (
      data: LabelPayload,
      setLabels: React.Dispatch<React.SetStateAction<Record<string, string>>>,
      setSymbols: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
      if (!Array.isArray(data) || data.length === 0) {
        return;
      }
      const labels: Record<string, string> = {};
      const nextSymbols: string[] = [];
      data.forEach(({ symbol, label }) => {
        if (!symbol) return;
        labels[symbol] = label || symbol;
        nextSymbols.push(symbol);
      });
      if (Object.keys(labels).length > 0) {
        setLabels(labels);
      }
      if (nextSymbols.length > 0) {
        setSymbols(nextSymbols);
      }
    },
    []
  );

  const handleStockLabels = useCallback(
    (data: LabelPayload) => applyLabels(data, setStockMarketLabels, setStockMarketSymbols),
    [applyLabels]
  );

  const handlePreciousLabels = useCallback(
    (data: LabelPayload) => applyLabels(data, setPreciousMetalsLabels, setPreciousMetalsSymbols),
    [applyLabels]
  );

  const handleAllLabels = useCallback(
    (data: LabelPayload) => {
      if (!Array.isArray(data) || data.length === 0) {
        return;
      }
      const labels: Record<string, string> = {};
      const nextSymbols: string[] = [];
      const stockLabels: LabelPayload = [];
      const preciousLabels: LabelPayload = [];

      data.forEach((item) => {
        if (!item?.symbol) return;
        labels[item.symbol] = item.label || item.symbol;
        nextSymbols.push(item.symbol);
        if (item.category === 'STOCK_MARKET') {
          stockLabels.push(item);
        } else if (item.category === 'PRECIOUS_METALS') {
          preciousLabels.push(item);
        }
      });

      if (Object.keys(labels).length > 0) {
        setAllLabels(labels);
      }
      if (nextSymbols.length > 0) {
        setAllSymbols(nextSymbols);
      }
      if (stockLabels.length > 0) {
        applyLabels(stockLabels, setStockMarketLabels, setStockMarketSymbols);
      }
      if (preciousLabels.length > 0) {
        applyLabels(preciousLabels, setPreciousMetalsLabels, setPreciousMetalsSymbols);
      }
    },
    [applyLabels]
  );

  const connect = useCallback(() => {
    try {
      const socket = io(MARKET.SOCKET_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: MARKET.RECONNECT_BASE_DELAY_MS,
        reconnectionDelayMax: MARKET.MAX_RECONNECT_DELAY_MS,
        reconnectionAttempts: MARKET.MAX_RECONNECT_ATTEMPTS,
        timeout: 20000,
      });
      socketRef.current = socket;

      socket.on('connect', () => {
        setIsConnected(true);
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
      });

      socket.on(MARKET.PRICES_ALL_EVENT, handleAllPrices);
      socket.on(MARKET.PRICES_STOCK_EVENT, handleStockPrices);
      socket.on(MARKET.PRICES_PRECIOUS_EVENT, handlePreciousPrices);
      socket.on(MARKET.SYMBOLS_ALL_EVENT, handleAllSymbols);
      socket.on(MARKET.SYMBOLS_STOCK_EVENT, handleStockSymbols);
      socket.on(MARKET.SYMBOLS_PRECIOUS_EVENT, handlePreciousSymbols);
      socket.on(MARKET.LABELS_ALL_EVENT, handleAllLabels);
      socket.on(MARKET.LABELS_STOCK_EVENT, handleStockLabels);
      socket.on(MARKET.LABELS_PRECIOUS_EVENT, handlePreciousLabels);

      socket.on('connect_error', () => {
        setIsConnected(false);
      });
    } catch {
      resetState();
    }
  }, [
    handleAllLabels,
    handleAllPrices,
    handleAllSymbols,
    handlePreciousLabels,
    handlePreciousPrices,
    handlePreciousSymbols,
    handleStockLabels,
    handleStockPrices,
    handleStockSymbols,
    resetState,
  ]);

  useEffect(() => {
    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.off(MARKET.PRICES_ALL_EVENT, handleAllPrices);
        socketRef.current.off(MARKET.PRICES_STOCK_EVENT, handleStockPrices);
        socketRef.current.off(MARKET.PRICES_PRECIOUS_EVENT, handlePreciousPrices);
        socketRef.current.off(MARKET.SYMBOLS_ALL_EVENT, handleAllSymbols);
        socketRef.current.off(MARKET.SYMBOLS_STOCK_EVENT, handleStockSymbols);
        socketRef.current.off(MARKET.SYMBOLS_PRECIOUS_EVENT, handlePreciousSymbols);
        socketRef.current.off(MARKET.LABELS_ALL_EVENT, handleAllLabels);
        socketRef.current.off(MARKET.LABELS_STOCK_EVENT, handleStockLabels);
        socketRef.current.off(MARKET.LABELS_PRECIOUS_EVENT, handlePreciousLabels);
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [
    connect,
    handleAllLabels,
    handleAllPrices,
    handleAllSymbols,
    handlePreciousLabels,
    handlePreciousPrices,
    handlePreciousSymbols,
    handleStockLabels,
    handleStockPrices,
    handleStockSymbols,
  ]);

  const hasAllCurrencies = Object.keys(allCurrencies).length > 0;
  const hasAllLabels = Object.keys(allLabels).length > 0;
  const hasStockCurrencies = Object.keys(stockMarketCurrencies).length > 0;
  const hasPreciousCurrencies = Object.keys(preciousMetalsCurrencies).length > 0;
  const hasStockLabels = Object.keys(stockMarketLabels).length > 0;
  const hasPreciousLabels = Object.keys(preciousMetalsLabels).length > 0;

  const currencies = hasAllCurrencies
    ? allCurrencies
    : {
        ...stockMarketCurrencies,
        ...preciousMetalsCurrencies,
      };

  const symbols = allSymbols.length > 0
    ? allSymbols
    : Array.from(new Set([...stockMarketSymbols, ...preciousMetalsSymbols]));

  const currencyLabels = hasAllLabels
    ? allLabels
    : {
        ...stockMarketLabels,
        ...preciousMetalsLabels,
      };

  return {
    currencies,
    symbols,
    currencyLabels,
    stockMarket: {
      currencies:
        hasStockCurrencies ? stockMarketCurrencies : allCurrencies,
      symbols: stockMarketSymbols.length > 0 ? stockMarketSymbols : allSymbols,
      labels: hasStockLabels ? stockMarketLabels : allLabels,
    },
    preciousMetals: {
      currencies:
        hasPreciousCurrencies ? preciousMetalsCurrencies : allCurrencies,
      symbols: preciousMetalsSymbols.length > 0 ? preciousMetalsSymbols : allSymbols,
      labels:
        hasPreciousLabels ? preciousMetalsLabels : allLabels,
    },
    isConnected,
    hasData,
  };
}

