import { toast } from 'react-toastify';

export const ToastNotificationService = {
    Success: (message) => toast.success(message),
    Error: (message) => toast.error(message),
    Warn: (message) => toast.warn(message),
    Info: (message) => toast.info(message),
};