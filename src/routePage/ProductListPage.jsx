import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProduct } from "../redux/features/productSlice";
import SpinnerLoading from "../component/Spinner";

export default function ProductListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, productsList } = useSelector(
    (state) => state.procutsState
  );
  console.log("Products", productsList);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <SpinnerLoading />
      </div>
    );
  }

  return (
    <div>
      <h1>Product List</h1>
    </div>
  );
}
