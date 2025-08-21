import { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css"

function Menu() {
  const [productOptions, setProductOptions] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleProductOptions = ()=>{
    setProductOptions(!productOptions);
  }
  const toggleMenu = ()=>{
    setIsOpen(!isOpen);
  }
  return (
    <>
    <button
        className="btn btn-light d-lg-none m-2"
        onClick={toggleMenu}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      {isOpen && <div className="menu-backdrop" onClick={toggleMenu}></div>}
    <div className={`p-4 bg-white flex-nowrap mt-3 menu ${isOpen ? "open" : ""}`}>
      <ul className=" list-unstyled">
        <p className="text-muted px-2 mb-4 fs-6 fs-md-5">Menu</p>
        <li className="my-4 ">
          <Link className="text-muted text-decoration-none d-flex align-items-center">
            <i class="fa-duotone fa-solid fa-dice-three fs-4 menu-icon"></i>{" "}
            Dashboard
          </Link>
        </li>
        <li className="my-4 ">
          <Link className="text-muted text-decoration-none d-flex align-items-center">
            <i class="fa-duotone fa-solid fa-user-doctor fs-4 menu-icon"></i>{" "}
            Doctors
          </Link>
        </li>
        <li className="my-4 ">
          <Link className="text-muted text-decoration-none d-flex align-items-center">
            <i class="fa-duotone fa-solid fa-hospital-user fs-4 menu-icon"></i>{" "}
            Patients
          </Link>
        </li>
        <li className="my-4 ">
          <Link className="text-muted text-decoration-none d-flex align-items-center">
            <i class="fa-duotone fa-solid fa-calendar-check fs-4 menu-icon"></i>{" "}
            Appointments
          </Link>
        </li>
        <li className="my-4 ">
          <Link className="text-muted text-decoration-none d-flex align-items-center">
            <i class="fa-duotone fa-solid fa-dice-three fs-4 menu-icon"></i>{" "}
            Specialists
          </Link>
        </li>
        <li className="my-4 ">
          <Link className="text-muted text-decoration-none d-flex align-items-center" to="/products" onClick={handleProductOptions}>
            <i class="fa-duotone fa-solid fa-dice-three fs-4 menu-icon"></i>{" "}
            Products
          </Link>
          {!productOptions? "" :
            <ul className="list-unstyled">
                <li className="my-4">
                    <Link className="text-muted text-decoration-none d-flex align-items-center ps-2 pt-0 mx-2" to="/products/productList">
                        Products List
                    </Link>
                    <Link className="text-muted text-decoration-none d-flex align-items-center ps-2 pt-2 mx-2" to="/products/addproduct">
                        Add Product
                    </Link>
                </li>
            </ul>
          }
        </li>
        <li className="my-4 ">
          <Link className="text-muted text-decoration-none d-flex align-items-center">
            <i class="fa-duotone fa-solid fa-dice-three fs-4 menu-icon"></i>{" "}
            Coupons
          </Link>
        </li>
        <li className="my-4 ">
          <Link className="text-muted text-decoration-none d-flex align-items-center">
            <i class="fa-duotone fa-solid fa-calendar-days fs-4 menu-icon"></i>{" "}
            Concerns
          </Link>
        </li>
        <li className="my-4 ">
          <Link className="text-muted text-decoration-none d-flex align-items-center">
            <i class="fa-duotone fa-solid fa-calendar-days fs-4 menu-icon"></i>
            Referrals
          </Link>
        </li>
        <li className="my-4 ">
          <Link className="text-muted text-decoration-none d-flex align-items-center">
            <i class="fa-duotone fa-solid fa-calendar-days fs-4 menu-icon"></i>{" "}
            Customization
          </Link>
        </li>
        <li className="my-4 ">
          <Link className="text-muted text-decoration-none d-flex align-items-center">
            <i class="fa-duotone fa-solid fa-calendar-days fs-4 menu-icon"></i>{" "}
            Wallet
          </Link>
        </li>
        <li className="my-4 ">
          <Link className="text-muted text-decoration-none d-flex align-items-center">
            <i class="fa-duotone fa-solid fa-calendar-days fs-4 menu-icon"></i>{" "}
            Refund
          </Link>
        </li>
      </ul>
      
    </div>
    </>
  );
}

export default Menu;
