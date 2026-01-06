import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationBar from "./component/NavigationBar";
import ProductDetailsPage from "./routePage/ProductDetailsPage";
import ProductListPage from "./routePage/ProductListPage";
import ProductCartPage from "./routePage/ProductCartPage";
import ProductPurchasePage from "./routePage/ProductPurchasePage";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product-details" element={<ProductDetailsPage />} />
          <Route path="/product-cart" element={<ProductCartPage />} />
          <Route path="/product-purchase" element={<ProductPurchasePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
