// Products Index Page
import { useState } from 'react';
import ProductCard from '../../components/productCard/ProductCard';
import ProductCardContainer from '../../components/productCardContainer/ProductCardContainer';
import { ProductSkeleton, Toast } from '../../components/ui';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import type { Product } from '../../types';
import styles from './Index.module.css';

const Index = () => {
  const { data: productList, isLoading, error } = useProducts();
  const { addToCart } = useCart();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart({ product, quantity: 1 });
    setToast({ message: `${product.productName} added to cart!`, type: 'success' });
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h2>Unable to load products</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.indexPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Our Products</h1>
        <p className={styles.pageSubtitle}>
          Discover our premium hair care collection
        </p>
      </div>

      {isLoading ? (
        <ProductSkeleton count={8} />
      ) : (
        <ProductCardContainer>
          {productList?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </ProductCardContainer>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Index;
