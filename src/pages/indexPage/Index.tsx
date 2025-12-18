import { useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import ProductCardContainer from "../../components/productCardContainer/ProductCardContainer";
// import productsDummy from "../../lib/dummyData/productsDummy";
// import type { productItems } from "../../components/productItem/productItem";
import { useCartStore } from "../../store/UseCartStore";
import type { ProductDetails } from "../../components/cartItem/CartItem";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  // const [productList, setProductList] = useState<ProductDetails[]>([]);
  // const [loading, setLoading] = useState(true);
  const handleAddToCart = useCartStore((state) => state.handleAddToCart);

    const { error, data: productList, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(
        'http://localhost:3000/products',
      )
      return await response.json() as ProductDetails[]
    },
  })

  if (error) return 'An error has occurred: ' + error.message

  // useEffect(() => {
  //   const fetchproduct = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/products");
  //       const data = await res.json();
  //       console.log(data);
  //       setProductList(data);
  //     } catch (error) {
  //       console.error("Failed to load product:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchproduct();
  // }, []);

  // if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ProductCardContainer>
        {productList?.map((product) => (
          <ProductCard
            key={product.id}
            inStock={product.inStock}
            image={product.image}
            productName={product.productName}
            price={product.price}
            handleAddToCart={() => handleAddToCart({ product, quantity: 1 })}
          />
        ))}
      </ProductCardContainer>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  );
};

export default Index;
