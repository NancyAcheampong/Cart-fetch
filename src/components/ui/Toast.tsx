// Toast Notification Component
import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'info';

type ToastProps = {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
};

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const Toast = ({ message, type = 'info', duration = 4000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]} ${isVisible ? styles.visible : styles.hidden}`}>
      <Icon size={20} className={styles.icon} />
      <span className={styles.message}>{message}</span>
      <button className={styles.closeButton} onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
