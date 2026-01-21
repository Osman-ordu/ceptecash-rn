import { ICurrencyData } from "@/types";
import { safeJsonParse } from "@/utils/general";

export const parseCurrencyPayload = (payload: unknown): Record<string, ICurrencyData> => {
    if (!payload) return {};

    let dataObj: unknown = payload;

    if (typeof dataObj === 'string') {
      dataObj = safeJsonParse(dataObj);
    }

    if (Array.isArray(dataObj) && dataObj.length > 0) {
      dataObj = dataObj[0];
      if (typeof dataObj === 'string') {
        dataObj = safeJsonParse(dataObj);
      }
    }

    if (!dataObj || typeof dataObj !== 'object' || Array.isArray(dataObj)) {
      return {};
    }

    const updatedCurrencies: Record<string, ICurrencyData> = {};

    Object.keys(dataObj).forEach((key) => {
      const item = (dataObj as Record<string, any>)[key];

      if (key === 'SOURCE' || key === 'S' || key === 'T' || !item) {
        return;
      }

      if (typeof item === 'object' && !Array.isArray(item) && item.alis && item.satis) {
        let symbol = key;

        if (key.endsWith('TRY')) {
          symbol = key === 'GUMUSTRY' ? 'GUMUSTRY' : key.replace('TRY', '');
        }

        const buyPrice = parseFloat(String(item.alis).replace(',', '.')) || 0;
        const sellPrice = parseFloat(String(item.satis).replace(',', '.')) || 0;
        const changePercent = parseFloat(String(item.percent || 0).replace(',', '.')) || 0;

        if (buyPrice > 0 && sellPrice > 0) {
          updatedCurrencies[symbol] = {
            symbol,
            buyPrice,
            sellPrice,
            changePercent,
            timestamp: Date.now(),
          };
        }
        return;
      }

      if (typeof item === 'number') {
        let symbol = key;

        if (key.endsWith('TRY')) {
          symbol = key.replace('TRY', '');
        }

        const price = item;

        if (price > 0) {
          updatedCurrencies[symbol] = {
            symbol,
            buyPrice: price,
            sellPrice: price,
            changePercent: 0,
            timestamp: Date.now(),
          };
        }
      }
    });

    return updatedCurrencies;
  };