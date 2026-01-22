import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

let memoryToken: string | null = null;
let memoryRefreshToken: string | null = null;
let tokenLoadPromise: Promise<string | null> | null = null;
let refreshTokenLoadPromise: Promise<string | null> | null = null;

const loadTokenOnce = async () => {
  if (tokenLoadPromise) {
    return tokenLoadPromise;
  }

  tokenLoadPromise = AsyncStorage.getItem(TOKEN_KEY)
    .then((token) => {
      memoryToken = token;
      return token;
    })
    .finally(() => {
      tokenLoadPromise = null;
    });

  return tokenLoadPromise;
};

const loadRefreshTokenOnce = async () => {
  if (refreshTokenLoadPromise) {
    return refreshTokenLoadPromise;
  }

  refreshTokenLoadPromise = AsyncStorage.getItem(REFRESH_TOKEN_KEY)
    .then((token) => {
      memoryRefreshToken = token;
      return token;
    })
    .finally(() => {
      refreshTokenLoadPromise = null;
    });

  return refreshTokenLoadPromise;
};

export const tokenService = {
  getToken: async () => memoryToken ?? (await loadTokenOnce()),
  setToken: async (token: string) => {
    memoryToken = token;
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },
  getRefreshToken: async () => memoryRefreshToken ?? (await loadRefreshTokenOnce()),
  setRefreshToken: async (token: string) => {
    memoryRefreshToken = token;
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  clear: async () => {
    memoryToken = null;
    memoryRefreshToken = null;
    await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY]);
  },
};
