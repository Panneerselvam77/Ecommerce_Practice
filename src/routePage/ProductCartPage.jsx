import { useDispatch, useSelector } from "react-redux";
import SpinnerLoading from "../component/Spinner";
import { useMemo } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import {
  incrementQuantity,
  decrementQuantity,
  removeCartItem,
} from "../redux/features/cartSlice";
export default function ProductCartPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartItemData);
  const { isLoading, isError, productsList } = useSelector(
    (state) => state.procutsState
  );

  // console.log("Cart Item", cartItems);
  // console.log("Products List", productsList);

  const cartItemsWithDetails = useMemo(() => {
    if (!cartItems || !productsList || !productsList.products) {
      return [];
    }

    return cartItems
      .map((item) => {
        // FIX: Changed cartItems.id to item.id
        const product = productsList.products.find(
          (prod) => prod.id === item.id
        );

        if (product) {
          return {
            ...product,
            quantity: item.quantity,
            addedAt: item.addedAt,
          };
        }
        return null;
      })
      .filter((nullItems) => nullItems !== null);
  }, [cartItems, productsList]); // Dependencies

  console.log("cartItemsWithDetails", cartItemsWithDetails);

  const addQuantity = (id) => dispatch(incrementQuantity(id));
  const decreaseQuantity = (id) => dispatch(decrementQuantity(id));
  const removeProduct = (id) => dispatch(removeCartItem(id));

  const getTotalAmount = (price, quantity) => {
    return price * quantity;
  };
  if (isLoading) {
    return (
      <div>
        <SpinnerLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error: {isError}</p>
      </div>
    );
  }

  return (
    <div className="cartList">
      <h1>Product List</h1>

      {cartItems.length === 0 ? (
        <div>Add Items to Cart</div>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Add Quantity</th>
                <th>Quantity</th>
                <th>Decrease Quantity</th>
                <th>price</th>
                <th>Remove Product</th>
              </tr>
            </thead>
            <tbody>
              {cartItems &&
                productsList.products &&
                cartItemsWithDetails.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td> {item.title}</td>
                      <td
                        onClick={() => addQuantity(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        Add
                      </td>
                      <td>{item.quantity}</td>
                      <td
                        onClick={() => decreaseQuantity(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        Decrease
                      </td>
                      <td>{getTotalAmount(item.price, item.quantity)}</td>
                      <td
                        onClick={() => removeProduct(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        Remove
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div>
            <div>
              Total Amount: <span>100$</span>
            </div>
            <div>
              <Button>Purchase</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
