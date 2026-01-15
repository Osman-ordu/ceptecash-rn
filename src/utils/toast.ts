import { Toast } from 'toastify-react-native';

export const showSuccessToast = (message: string) => {
  Toast.success(message);
};

export const showErrorToast = (message: string) => {
  Toast.error(message);
};

export const showInfoToast = (message: string) => {
  Toast.info(message);
};

