import toast from 'react-hot-toast';

export const notificationSystem = {
  error: (message: string) =>
    toast.error(message, {
      position: 'bottom-center',
      duration: 5000,
      icon: null,
      style: {
        background: '#F53636',
        color: 'white',
        fontWeight: '600',
      },
    }),
  success: (message: string) =>
    toast.success(message, {
      position: 'bottom-center',
      duration: 5000,
      icon: null,
      style: {
        background: '#00BF13',
        color: 'white',
        fontWeight: '600',
      },
    }),
};
