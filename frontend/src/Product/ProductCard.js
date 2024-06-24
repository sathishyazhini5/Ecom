import React, { useEffect, useState } from 'react';
import { getProducts } from '../../src/Service/Productservice';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.product_id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            <h2>{product.product_name}</h2>
            <p>{product.product_desc}</p>
            <p>Price: ${product.retail_price}</p>
            {product.img_urls && product.img_urls.map((url, index) => (
              // Ensure the URL is correctly constructed
              <img key={index} src={`http://localhost:7777${url}`} alt={product.product_name} style={{ width: '100%' }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
