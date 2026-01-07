import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { addToCart } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProductList({ products = [] }) {
  console.log("ProductList Data, ", products);
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cartItemData);
  console.log("Cart item,", cartItems);

  const handleCart = (e, id) => {
    e.preventDefault();
    dispatch(addToCart(id));
    console.log("Jellm");
  };

  return (
    <>
      {products &&
        products.map((product) => {
          return (
            <div key={product.title}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={product.thumbnail} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={(e) => handleCart(e, product.id)}
                  >
                    Add To Cart
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      {products.length === 0 && <div>No product available</div>}
    </>
  );
}
