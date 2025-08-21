import { useState } from "react";
import "./ProductList.css";
import ProductDetail from "./ProductDetail";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
  const [detail, setDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [product,setProduct] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8080/productList")
    .then((res)=>{setProduct(res.data); console.log(product)})
    .catch((e)=>{console.log(e)})
  },[])

  const updateProductStatus = (id,newStatus)=>{
    setProduct(prevProducts =>
      prevProducts.map(product =>
        product._id === id ? { ...product, status: newStatus } : product
      )
    );
  }
  const handleList = (item) => {
    setSelectedItem(item);
    setDetail(true);
  };
  const handleInfoChange = (id,updatedProduct)=>{
    setProduct(prev =>
    prev.map(p => p._id === id ? { ...p, ...updatedProduct } : p)
  );
 if (selectedItem && selectedItem._id === id) {
    setSelectedItem(prev => ({ ...prev, ...updatedProduct }));
  }
  }
  return (
    <div className="p-4 mt-2">
      <p style={{color: "#3A643B" }}>Products &nbsp;&nbsp;&gt;&nbsp;&nbsp; Products List </p>
      <div>
        {detail && selectedItem ? (
          <ProductDetail
            name={selectedItem.generalInfo.name}
            description={selectedItem.generalInfo.description}
            status={selectedItem.status}
            id={selectedItem._id}
            onStatusChange={updateProductStatus}
            onInfoChange={handleInfoChange}
          />
        ) : null}
      </div>
      <div className="list p-3 mt-2" style={{minHeight: "500px"}}>
        <div className="row p-2">
          <div className="col-lg-2 col-md-6  g-0">
            <h3 class="navbar-brand fw-bold mx-2 my-2">Products List</h3>
          </div>
          <div className="col-lg-3 col-md-6 g-0">
            <form class="flex-wrap" role="search">
              <div style={{ position: "relative", width: "250px" }}>
                <img
                  src="/media/images/Search.png"
                  alt="search"
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "18px",
                    height: "18px",
                    pointerEvents: "none",
                  }}
                />
                <input
                  className="form-control search-box"
                  type="search"
                  placeholder="Search here"
                  aria-label="Search"
                  style={{ paddingLeft: "40px", width: "100%" }}
                />
              </div>
            </form>
          </div>
          <div className="col-lg-7 col-md-12 g-0 d-flex">
            <div className="addSign g-0 mx-3">
              <Link to="/products/addproduct"> <i class="fa-duotone text-muted fa-solid fa-plus"></i></Link>
            </div>
            <div className="ms-auto align-item-center addSign">
              <span className="addSign mx-2">
                <a>
                  <i class="fa-duotone fa-solid fa-arrow-down"></i>
                </a>
              </span>
              <span className="addSign">
                <i class="fa-solid fa-filter"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="row py-3 border-bottom head d-none d-lg-flex">
            <div className="col-lg-3 text-center">Products</div>
            <div className="col-lg-8">Description</div>
            <div className="col-lg-1 text-end px-3">Status</div>
        </div>
        <div className="col">
          {product.map((item, index) => (
            <div
              className="row p-2 align-items-center"
              key={index}
              onClick={() => {
                handleList(item);
                setSelectedIndex(index);
              }}
              style={{
                backgroundColor:
                  selectedIndex === index ? "#e6f5e2" : "transparent",
                cursor: "pointer",
              }}
            >
              <div className="col-lg-3 col-12 d-flex align-items-center mt-sm-5">
                <span className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioDefault"
                    checked={selectedIndex === index}
                    readOnly
                  />
                  <img
                    src={item.generalInfo.photoUrls[0]}
                    width="30"
                    height="30"
                    className="rounded-circle ms-2"
                    alt="product"
                  />
                  <span className="ms-2" style={{ color: "#3A643C", fontSize: "14px"}}>
                    {item.generalInfo.name.slice(0,-1)}
                  </span>
                </span>
              </div>

              <div
                className="col-lg-8 col-12 mt-sm-5"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}
              >
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                  }}
                >
                  {item.generalInfo.description}
                </span>
              </div>

              <div className="col-lg-1 col-12 text-lg-end text-start mt-sm-5">
                {item.status? <span style={{ cursor: "pointer", margin: "0", color: "#3A643B" }}>Active</span> : <span style={{ cursor: "pointer", margin: "0", color: "#E70000" }}>Inactive</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
