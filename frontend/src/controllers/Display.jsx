import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import AddProduct from "./AddProducts/AddProduct";

function Display() {
  return (
    <Routes>
      <Route
        path="/products"
        element={
          <div className="px-4 pt-4 mt-2">
            <p style={{color: "#3A643B" }}>
              Products
            </p>
          </div>
        }
      />
      <Route path="/products/productList" element={<ProductList />} />
      <Route path="/products/addproduct" element={<AddProduct />} />
    </Routes>
  );
}

export default Display;
