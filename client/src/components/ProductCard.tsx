import type { Product } from "../types/product";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <img src={product.image} width="100" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
    </div>
  );
};

export default ProductCard;