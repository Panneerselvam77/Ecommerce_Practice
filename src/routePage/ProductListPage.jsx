// import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { fetchProduct } from "../redux/features/productSlice";
import SpinnerLoading from "../component/Spinner";
import ProductList from "../component/ProductsList";
import useDebounce from "../hooks/useDebounce";

export default function ProductListPage() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState();

  const { isLoading, isError, productsList } = useSelector(
    (state) => state.procutsState
  );

  const { debouncedValue } = useDebounce(searchTerm, 500);

  // console.log("Products", productsList);

  const filteredProduct = useMemo(() => {
    if (!debouncedValue) return productsList?.products;
    return productsList?.products.filter((product) =>
      product.title.toLowerCase().includes(debouncedValue.toLowerCase())
    );
  }, [debouncedValue, productsList]);

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
      <div>
        <label htmlFor="searchInput">Search</label>
        <input
          type="text"
          name="searchInput"
          id="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="product-list">
        {productsList.products && <ProductList products={filteredProduct} />}
      </div>
    </div>
  );
}
