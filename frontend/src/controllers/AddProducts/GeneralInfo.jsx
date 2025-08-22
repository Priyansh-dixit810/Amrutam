import TextField from "@mui/material/TextField";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

function GeneralInfo({ setStep, setUform }) {
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files], // store actual files for submission
    }));
  };
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    quantity: "",
    jar: "",
    price: "",
    description: "",
    photos: [],
  });
  const [flashMsg, setFlashMsg] = useState("");
  //Product Name
  const handleinput = (e) => {
    let fieldname = e.target.name;
    let fieldvalue = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [fieldname]: fieldvalue,
    }));
  };
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.subtitle.trim() &&
      formData.quantity &&
      formData.jar &&
      formData.price &&
      formData.description.trim() &&
      formData.photos.length > 0
    );
  };
  const [isSaved, setIsSaved] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setFlashMsg("⚠️ Please fill all fields and upload at least one photo");
      setTimeout(() => setFlashMsg(""), 3000);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("subtitle", formData.subtitle);
    data.append("quantity", formData.quantity);
    data.append("jar", formData.jar);
    data.append("price", formData.price);
    data.append("description", formData.description);

    formData.photos.forEach((file) => {
      data.append("photos", file); // append each file
    });

    try {
      const res = await axios.post("https://amrutam-backend-sly8.onrender.com/generalInfo", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFlashMsg("Properties saved successfully! ✅");
      setIsSaved(true);
      setTimeout(() => setFlashMsg(""), 3000);
    } catch (err) {
      setFlashMsg("Error saving properties ❌");
      setTimeout(() => setFlashMsg(""), 3000);
    }
  };

  return (
    <div className="container mb-5">
      {flashMsg && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "55%",
            transform: "translateX(-50%)",
            backgroundColor: "#D4EDDA",
            color: "#155724",
            padding: "10px 20px",
            borderRadius: "4px",
            textAlign: "center",
            zIndex: 1000,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          {flashMsg}
        </div>
      )}
      <form
        className="p-4  mt-2"
        style={{ backgroundColor: "white", borderRadius: "25px" }}
        onSubmit={handleSubmit}
      >
        <h5 className="mb-4">General Information</h5>
        <div className="row mt-4">
          <div className="col-12">
            <TextField
              id="outlined-required"
              label="Product Name"
              defaultValue="Label"
              fullWidth
              InputLabelProps={{
                style: { color: "#000000", fontWeight: "500" },
              }}
              InputProps={{
                style: { color: "#464646", fontWeight: "400" },
              }}
              className="mb-4"
              name="name"
              value={formData.name}
              onChange={handleinput}
            />
            <TextField
              id="outlined-required"
              label="Subtitle"
              defaultValue="Label"
              fullWidth
              InputLabelProps={{
                style: { color: "#000000", fontWeight: "500" },
              }}
              InputProps={{
                style: { color: "#464646", fontWeight: "400" },
              }}
              className="mb-5 mt-2"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleinput}
            />
            <div className="row mb-3">
              <div className="col-lg-3 col-12 text-center">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Quantity
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.quantity}
                    label="Select Quantity"
                    onChange={handleinput}
                    name="quantity"
                    renderValue={() => null}
                  >
                    {Array.from({ length: 17 }, (_, i) => i * 10 + 10).map(
                      (num) => (
                        <MenuItem key={num} value={num}>
                          {num} GM
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
                {formData.quantity && (
                  <p
                    className="mt-3 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#E6F5E2",
                      height: "40px",
                      padding: "2.94px",
                      borderRadius: "6px",
                    }}
                  >
                    {formData.quantity} GM
                  </p>
                )}
              </div>
              <div className="col-lg-4 col-12 text-end px-lg-5">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Month / Jar
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue="Label"
                    value={formData.jar}
                    label="Month /Jar"
                    onChange={handleinput}
                    name="jar"
                    renderValue={() => null}
                  >
                    {Array.from({ length: 3 }, (_, i) => i + 1).map((num) => (
                      <MenuItem key={num} value={num}>
                        {num} Month / Jar
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formData.jar && (
                  <p
                    className="mt-3 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#E6F5E2",
                      height: "40px",
                      padding: "2.94px",
                      borderRadius: "6px",
                    }}
                  >
                    {formData.jar} Month / {formData.jar} Day
                  </p>
                )}
              </div>
              <div className="col-lg-3 col-12 text-end">
                <TextField
                  id="outlined-required"
                  type="number"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#464646", fontWeight: "500" },
                  }}
                  InputProps={{
                    style: { color: "#464646", fontWeight: "400" },
                  }}
                  value={formData.price}
                  label="Add Price"
                  onChange={handleinput}
                  name="price"
                />
                {formData.price && (
                  <p
                    className="mt-3 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#E6F5E2",
                      height: "40px",
                      padding: "2.94px",
                      borderRadius: "6px",
                    }}
                  >
                    {formData.price} ₹
                  </p>
                )}
              </div>
              <div className="col-lg-2 col-12 mt-3 d-flex align-items-start justify-content-center gap-2">
                <i
                  className="fa-solid fa-plus"
                  style={{
                    border: "1.36px solid #3A643B",
                    color: "#3A643B",
                    width: "30px",
                    borderRadius: "4px",
                    padding: "5px",
                  }}
                ></i>
                <button
                  type="button"
                  className="btn d-flex align-items-center gap-2 p-0 fw-semiBold"
                  style={{ fontWeight: "600", color: "#3A643B" }}
                >
                  Add more
                </button>
              </div>
            </div>
            <TextField
              id="outlined-required"
              label="Product Description"
              value={formData.description}
              name="description"
              fullWidth
              InputLabelProps={{
                style: { color: "#000000", fontWeight: "500" },
              }}
              InputProps={{
                style: { color: "#464646", fontWeight: "400" },
              }}
              className="mb-5 mt-2"
              onChange={handleinput}
            />
          </div>
          <div className="col-12 p-3" style={{ height: "276px" }}>
            <div className="row" style={{ height: "100%" }}>
              {" "}
              {/* Add a row */}
              <div
                className="col-lg-8 col-12"
                style={{
                  overflowX: "auto",
                  display: "flex",
                  gap: "10px",
                  border: "1px solid #ccc",
                  padding: "10px",
                  height: "100%",
                  whiteSpace: "nowrap",
                }}
              >
                {formData.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`photo-${index}`}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
              <div
                className="col-3 d-flex flex-column align-items-center justify-content-center mx-4"
                style={{
                  border: "1px dashed #9DB29D",
                  padding: "10px",
                  backgroundColor: "#EAF2EA",
                  borderRadius: "25px",
                  gap: "15px",
                }}
              >
                <i
                  className="fa-solid fa-image"
                  style={{ fontSize: "2rem", color: "#5B5B5B" }}
                ></i>
                <p
                  className="text-center p-0 m-0"
                  style={{ fontSize: "16px", color: "#5B5B5B" }}
                >
                  Drag and Drop <br></br> Or
                </p>
                <label
                  htmlFor="photoUpload"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#3A643B",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  Browse
                </label>
                <input
                  id="photoUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: "none" }}
                  name="photos"
                />
              </div>
            <div className="row mt-4">
          <div className="col-12 d-flex align-items-center justify-content-center gap-5">
            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "188px" }}
            >
              Save
            </button>
            <button
              type="button"
              className="btn align-items-center"
              style={{
                fontWeight: "600",
                color: "#3A643B",
                width: "188px",
                cursor: "pointer",
              }}
              onClick={() => {
                if(!isFormValid){
                  setFlashMsg("⚠️ Please fill required field first");
                    setTimeout(() => setFlashMsg(""), 3000);
                    return;
                }
                if(!isSaved){
                  setFlashMsg("⚠️ Please first save the form");
                    setTimeout(() => setFlashMsg(""), 3000);
                    return;
                }
                setStep("benefits");
                setUform((prev) => ({ ...prev, GeneralInfo: true }));
              }}
            >
              Next
            </button>
          </div>
        </div>
            </div>
          </div>
        </div>
        
      </form>
    </div>
  );
}

export default GeneralInfo;
