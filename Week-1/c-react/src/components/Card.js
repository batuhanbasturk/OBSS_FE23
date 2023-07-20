const Card = ({ productData }) => {
  return (
    <div>
      <div>
        <h3>{productData.title}</h3>
        <p>{productData.description}</p>
        <p>Price: ${productData.price}</p>
        <p>Rating: {productData.rating}</p>
      </div>
      <div>
        <img src={productData.thumbnail} alt={productData.title} />
      </div>
    </div>
  );
};

export default Card;
