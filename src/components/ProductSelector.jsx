import React, { useState, useEffect } from "react";
import { fetchProducts } from "../utils/api";

export default function ProductSelector({ onSelect }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-grid">
      {products.map((p) => (
        <div
          key={p.id}
          className="product-card"
          onClick={() => onSelect(p)}
        >
          <img src={p.image} alt={p.title} style={{ height: 100, objectFit: "contain" }} />
          <div className="product-title">{p.title}</div>
          <div className="product-price">${p.price.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
