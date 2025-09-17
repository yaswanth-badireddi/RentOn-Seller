import React, { useEffect } from 'react';
import { useProductStore } from '../store/productStore';
export default function Products() {
  const { products, isLoading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {isLoading && <p>Loading products...</p>}

      {error && <p className="text-red-500">Error: {error}</p>}

      {!isLoading && !error && products.length === 0 && <p>No products found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            {product.image_url && (
              <img
                src={`http://localhost:5050${product.image_url}`}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
            )}
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>{product.description}</p>
            {/* <p className="mt-2 font-bold">${product.rental_price}</p> */}
            <p className="mt-2 font-bold">
  ${product.rental_price?.$numberDecimal ?? product.rental_price}
  <p>Quantity:{product.quantity}</p>
</p>

            <p className="text-sm text-gray-500">Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
