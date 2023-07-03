import React, { useState, useEffect } from "react";
import "./ProductManagement.css";

const ProductManagement = () => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    classification: "",
    url: "",
    search: "",
    price: 0,
    totalOrder: 0,
  });
  const [products, setProducts] = useState([]);
  const [showProductList, setShowProductList] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://add-to-card-a30ca-default-rtdb.firebaseio.com/Products.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      const data = await response.json();
      const loadedProducts = [];

      for (const key in data) {
        loadedProducts.push({
          id: key,
          ...data[key],
        });
      }

      setProducts(loadedProducts);
    } catch (error) {
      console.log("Failed to fetch products:", error);
    }
  };

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(
        "https://add-to-card-a30ca-default-rtdb.firebaseio.com/Products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product.");
      }

      // Reset the form
      setProductData({
        name: "",
        category: "",
        classification: "",
        url: "",
        search: "",
        price: 0,
        totalOrder: 0,
      });

      // Show success message or perform any additional actions
      console.log("Product added successfully!");
      fetchProducts(); // Fetch products again to update the list
    } catch (error) {
      // Handle the error
      console.log("Failed to add product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://add-to-card-a30ca-default-rtdb.firebaseio.com/Products/${productId}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product.");
      }

      // Show success message or perform any additional actions
      console.log("Product deleted successfully!");
      fetchProducts(); // Fetch products again to update the list
    } catch (error) {
      // Handle the error
      console.log("Failed to delete product:", error);
    }
  };

  return (
    <div className="container-pm">
      <div className="add-section">
        <h2 className="AP-Add-Section">Add Product</h2>
        <input
          type="text"
          name="name"
          className="lab"
          placeholder="Name"
          value={productData.name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="lab"
          value={productData.category}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="classification"
          className="lab"
          placeholder="Classification:"
          value={productData.classification}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="url"
          className="lab"
          placeholder="URL"
          value={productData.url}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="search"
          className="lab"
          placeholder="Search"
          value={productData.search}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name="price"
          className="lab"
          placeholder="Price"
          value={productData.price}
          onChange={handleInputChange}
        />

        <input
          className="lab"
          type="number"
          name="totalOrder"
          placeholder="Total order"
          value={productData.totalOrder}
          onChange={handleInputChange}
        />

        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="delete-section">
        <h2>Delete Product</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Classification: {product.classification}</p>

              <button
                className="delete-product-link"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
