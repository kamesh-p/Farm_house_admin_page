import { useEffect, useState } from "react";
import "./Shop.css";
function Shop() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          "https://add-to-card-a30ca-default-rtdb.firebaseio.com/Products.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data.");
        }
        const data = await response.json();
        const loadedProducts = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setProduct(loadedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
  }, []);
  console.log("Product:", product);
  return (
    <div>
      <div className="category-section">
        <h2 className="category">Farm Dairy</h2>
      </div>
      <div className="flex">
        {product.map((productItem) => {
          if (productItem.classification === "Dairy") {
            return (
              <div className="product-item" key={productItem.id}>
                <div className="product-info">
                  <img className="shop-img" src={productItem.url} alt="img" />
                  <p>
                    {productItem.name} | {productItem.classification}
                  </p>
                  <p>{productItem.seller}</p>
                  <p>Rs. {productItem.price} /-</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="category-section">
        <h2 className="category">Farm Meat</h2>
      </div>
      <div className="flex">
        {product.map((productItem) => {
          if (productItem.classification === "meat") {
            return (
              <div className="product-item" key={productItem.id}>
                <div className="product-info">
                  <img className="shop-img" src={productItem.url} alt="img" />
                  <p>
                    {productItem.name} | {productItem.classification}
                  </p>
                  <p>{productItem.seller}</p>
                  <p>Rs. {productItem.price} /-</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="category-section">
        <h2 className="category">Farm Food</h2>
      </div>
      <div className="flex">
        {product.map((productItem) => {
          if (productItem.classification === "food") {
            return (
              <div className="product-item" key={productItem.id}>
                <div className="product-info">
                  <img className="shop-img" src={productItem.url} alt="img" />
                  <p>
                    {productItem.name} | {productItem.classification}
                  </p>
                  <p>{productItem.seller}</p>
                  <p>Rs. {productItem.price} /-</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Shop;
