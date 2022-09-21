import toast from "react-hot-toast";

export const notificationSystem = {
  error: (message: string) =>
    toast.error(message, {
      ...notificationOpts,
      style: {
        background: "#F53636",
        ...notificationOpts.style,
      },
    } as any),
  success: (message: string) =>
    toast.success(message, {
      ...notificationOpts,
      style: {
        background: "#00BF13",
        ...notificationOpts.style,
      },
    } as any),
};

const notificationOpts = {
  position: "bottom-center",
  duration: 5000,
  icon: null,
  style: {
    color: "white",
    fontWeight: "600",
  },
};
