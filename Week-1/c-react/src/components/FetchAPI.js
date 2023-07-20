import { useState, useEffect } from "react";
import Card from "./Card";
export default function FetchAPI() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("API Response:", result); // Log the API response
          setIsLoaded(true);
          if (result.products && Array.isArray(result.products)) {
            setProducts(result.products);
          } else {
            setError(
              new Error("API response does not contain an array of products.")
            );
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {products.map((productData) => (
          <Card productData={productData} />
        ))}
      </div>
    );
  }
}
