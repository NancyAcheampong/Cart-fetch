// Empty State Component
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './EmptyState.module.css';
import Button from './Button';

type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
  onAction?: () => void;
};

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  actionLink,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        {icon || <ShoppingCart size={48} />}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {actionLabel && (
        actionLink ? (
          <Link to={actionLink}>
            <Button variant="primary">{actionLabel}</Button>
          </Link>
        ) : (
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
};

export default EmptyState;
