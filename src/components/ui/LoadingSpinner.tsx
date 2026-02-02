// Loading Spinner Component
import styles from './LoadingSpinner.module.css';

type LoadingSpinnerProps = {
  size?: 'small' | 'medium' | 'large';
  text?: string;
};

const LoadingSpinner = ({ size = 'medium', text }: LoadingSpinnerProps) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
