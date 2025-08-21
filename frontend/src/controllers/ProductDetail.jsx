import { useState } from "react";
import "./ProductList.css";
import axios from "axios";

function ProductDetail({ name, description, status: initialStatus, id, onStatusChange, onInfoChange }) {
  const [edit, setEdit] = useState(false);
  const [editInfo,setEditInfo] = useState(false);
  const [productStatus, setProductStatus] = useState(initialStatus);
  const [formData, setFormData] = useState({
    name,
    description,
  });

  const editInfoClick = ()=>{
    setEditInfo(!editInfo);
  }
  const iconClick = () => {
    setEdit(!edit);
  };

  const closeEdit = () => {
    setEdit(false);
  };

  const handleChange = (e)=>{
    setFormData((prev)=>({
      ...prev, [e.target.name]: e.target.value,
    }))
  }

  const handleactive = async ()=>{
    await axios.put(`https://amrutam-backend-sly8.onrender.com/details/activity/${id}` ,{ status: !productStatus },{withCredentials: true})
    .then((res)=>{
      setProductStatus(res.data.status);
      onStatusChange(id, !productStatus);
    });
  }

  const handleEditInfo = async ()=>(
    await axios.put(`https://amrutam-backend-sly8.onrender.com/details/editInfo/${id}`, formData,{withCredentials: true})
    .then((res)=>{
      console.log(res);
      setEditInfo(!editInfo);
      onInfoChange(id, res.data);
    })
  )
  return (
    <div className="product_details p-3 position-relative">
      <div className="d-flex align-items-center">
        <span className="navbar-brand fw-bold me-4 my-2">
          Products Details
        </span>
        <div className="addSign ms-auto">
          <i
            className="fa-solid fa-ellipsis-vertical"
            onClick={iconClick}
            style={{ cursor: "pointer" }}
          ></i>
        </div>
      </div>

      {!editInfo? (<div className="row g-0 mt-3">
        <div className="col-lg-2 col-4">
          <p>Product:</p>
          <p>Description:</p>
        </div>
        <div className="col-lg-8  col-8">
          <p className="fw-light">{name.slice(0,-1)}</p>
          <p className="fw-light" style={{textAlign: "justify"}}>{description}</p>
        </div>
        <div className="d-flex col-lg-2  col-6">
          <span className="text-muted">Status: </span>
          <span className="ms-auto"style={{ color: "#3A643B" }}>{productStatus? <span style={{ cursor: "pointer", margin: "0", color: "#3A643B" }}>Active</span> : <span style={{ cursor: "pointer", margin: "0", color: "#E70000" }}>Inactive</span>}</span>
        </div>
      </div>) : (<div className="row g-0 mt-3">
        <div className="col-lg-2 col-4">
          <p>Product:</p>
          <p>Description:</p>
        </div>
        <div className="col-lg-8  col-8">
          <input type="text" name="name" value={formData.name} className="form-control mb-2" onChange={handleChange}/>
          <textarea type="text" name="description" value={formData.description} className="form-control mb-2" onChange={handleChange}/>
        </div>
        <div className="text-center col-12">
          <button className="btn btn-success" onClick={handleEditInfo}>
          Save
        </button>
        </div>
      </div>)}

      {edit && (
        <div
          className="edit-popup position-absolute bg-white border shadow p-3"
          style={{
            top: "40px",
            right: "40px",
            zIndex: 10,
            width: "100px",
            borderRadius: "8px",
          }}
        >
          <p
            style={{ cursor: "pointer", margin: "0 0 10px 0", color: "#3A643B" }}
            onClick={()=>{closeEdit(),editInfoClick()}}
          >
            Edit
          </p>
          
          <p
            onClick={()=>{
              closeEdit();
              handleactive();
            }}
          >
            {!productStatus? <span style={{ cursor: "pointer", margin: "0", color: "#3A643B" }}>Active</span> : <span style={{ cursor: "pointer", margin: "0", color: "#E70000" }}>Inactive</span>}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
