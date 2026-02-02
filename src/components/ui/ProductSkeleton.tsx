// Product Skeleton Loading Component
import styles from './ProductSkeleton.module.css';

type ProductSkeletonProps = {
  count?: number;
};

const ProductSkeleton = ({ count = 4 }: ProductSkeletonProps) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.skeleton}>
          <div className={styles.image}></div>
          <div className={styles.content}>
            <div className={styles.title}></div>
            <div className={styles.price}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
