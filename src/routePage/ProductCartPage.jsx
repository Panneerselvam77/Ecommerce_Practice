import { useSelector } from "react-redux";
import SpinnerLoading from "../component/Spinner";
import { useMemo } from "react";

export default function ProductCartPage() {
  const { cartItems } = useSelector((state) => state.cartItemData);
  const { isLoading, isError, productsList } = useSelector(
    (state) => state.procutsState
  );

  console.log("Cart Item", cartItems);
  console.log("Products List", productsList);

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
    <div>
      <h1>Product List</h1>
      {cartItems &&
        productsList.products &&
        cartItemsWithDetails.map((item) => {
          return (
            <div key={item.id}>
              <div>{item.title}</div>
            </div>
          );
        })}
      {cartItems.length === 0 && <div>Add Items to Cart</div>}
    </div>
  );
}
/* [
    {
        "id": 1,
        "quantity": 1,
        "addedAt": "2026-01-07T16:51:37.924Z"
    },
    {
        "id": 2,
        "quantity": 1,
        "addedAt": "2026-01-07T16:51:40.315Z"
    },
    {
        "id": 3,
        "quantity": 1,
        "addedAt": "2026-01-07T16:51:42.413Z"
    }
]
     */
