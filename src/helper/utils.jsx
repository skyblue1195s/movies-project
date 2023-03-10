import { notification } from "antd";
import { MESSAGE_TYPE } from "./constants";

export const getItemMenu = (label, key, icon, children) => ({
  key,
  icon,
  children,
  label,
});

export const NotificationConfig = (type, message, description, status) => {
  const onClose = () => {
    if (status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  const config = {
    key: message,
    description,
    message,
    duration: 30,
    onClose,
  };
  if (type === MESSAGE_TYPE.ERROR) {
    notification.error(config);
  } else if (type === MESSAGE_TYPE.SUCCESS) {
    notification.success(config);
  }
};

export const convertToHours = (value) => {
  const hours = Math.floor(value / 60)
  const minutes = value % 60
  return `${hours}h${minutes}m`
}