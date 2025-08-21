import { useEffect, useState } from "react";
import axios from "axios";
import "./Overview.css";
import { useNavigate } from "react-router-dom";

function Overview() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [flashMsg, setFlashMsg] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8080/overview", { withCredentials: true })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/overview", data, { withCredentials: true })
      .then((res) => {
        setFlashMsg("Product Added Succesfully! ✅");
        setTimeout(() => {setFlashMsg(""); navigate("/products/productList")}, 3000);
        console.log(res);
      })
      .catch((err) => {
        setFlashMsg("Not Added! ❌");
        setTimeout(() => setFlashMsg(""), 3000);
        console.log(err);
      });
  };
  return (
    <>
      <div
        className="container p-4 mt-2 mb-5"
        style={{ backgroundColor: "white", borderRadius: "25px" }}
      >
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
        <div className="row">
          <div className="col-lg-6 col-md-6  col-sm-12">
            <img
              src={data.generalInfo.photoUrls[0]}
              alt="Img"
              style={{ width: "100%", height: "500px", borderRadius: "15px" }}
            />
          </div>
          <div className="col-lg-6 col-md-6  col-sm-12 p-2 mt-4">
            <p style={{ fontSize: "28px", fontWeight: "500", margin: 0 }}>
              {data.generalInfo.name}
            </p>
            <p style={{ fontSize: "28px", fontWeight: "500" }}>
              {data.generalInfo.subtitle}
            </p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "500",
                marginBottom: "10%",
              }}
            >
              &#8377; {data.generalInfo.price}.00
            </p>
            <div className="row p-0 mb-5 option-row">
              <div
                className="col-3 option-box p-3 mx-2 text-center"
                style={{
                  backgroundColor: "#EDEDED",
                  borderRadius: "10px",
                  width: "130px",
                }}
              >
                <span style={{ fontSize: "14px" }}>
                  {data.generalInfo.quantity} GM
                </span>
                <br></br>
                <span style={{ fontSize: "14px" }}>
                  {data.generalInfo.jar} Month <br></br> {data.generalInfo.jar}
                  Jar
                </span>
                <br></br>
                <span>&#8377; {data.generalInfo.price}</span>
              </div>
              <div
                className="col-3 option-box p-3 text-center"
                style={{
                  backgroundColor: "#EDEDED",
                  borderRadius: "10px",
                  width: "130px",
                }}
              >
                <span style={{ fontSize: "14px" }}>
                  {data.generalInfo.quantity} GM
                </span>
                <br></br>
                <span style={{ fontSize: "14px" }}>
                  {data.generalInfo.jar} Month <br></br> {data.generalInfo.jar}
                  Jar
                </span>
                <br></br>
                <span>&#8377; {data.generalInfo.price}</span>
              </div>
              <div
                className="col-3 option-box p-3 mx-2 text-center"
                style={{
                  backgroundColor: "#EDEDED",
                  borderRadius: "10px",
                  width: "130px",
                }}
              >
                <span style={{ fontSize: "14px" }}>
                  {data.generalInfo.quantity} GM
                </span>
                <br></br>
                <span style={{ fontSize: "14px" }}>
                  {data.generalInfo.jar} Month <br></br> {data.generalInfo.jar}
                  Jar
                </span>
                <br></br>
                <span>&#8377; {data.generalInfo.price}</span>
              </div>
            </div>
            <div className="col-12 text-muted">
              <p style={{ color: "#464646" }}>{data.generalInfo.description}</p>
            </div>
            <h2 className="my-4">Primary Benefits</h2>
            <div className="col-12">
              {data.benefits.primaryBenefits.map((item, index) => (
                <div
                  style={{
                    fontWeight: "400",
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <i
                    class="fa-solid fa-circle-check"
                    style={{ color: "#3A643B", opacity: "50%" }}
                  ></i>
                  <span key={index} style={{ color: "#303030" }}>
                    {item.title}
                  </span>
                  <br></br>
                </div>
              ))}
            </div>
            {data.benefits.secondaryBenefits && (
              <div className="row">
                <h3 className="my-4">Secondary Benefits</h3>
                {data.benefits.secondaryBenefits.map((item, index) => (
                  <div className="col-4 text-center" key={index}>
                    <p style={{ fontSize: "30px" }}>{item.emoji}</p>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
            <h4 className="my-4">Dosage</h4>
            <div className="col-12">
              {data.properties.di.map((item, index) => (
                <span key={index}>
                  <span>{item.emoji} </span>
                  <span>{item.description}</span>
                  {index !== data.properties.di.length - 1 ? (
                    <span> | </span>
                  ) : (
                    ""
                  )}
                </span>
              ))}
            </div>
            <h4 className="my-4">Usage</h4>
            {data.properties.usage.map((item, index) => (
              <div className="my-2">
                <span>{item.emoji} </span>
                <span> {item.field1}</span>
                {item.field2 && <span> |{item.field2}</span>}
              </div>
            ))}
            <h4 className="mt-5">Primary Ingredients</h4>
           <div className="row">
              {data.properties.ingredientName.map((item, index) => (
                <div className="primary-ingredient" key={index}>
                  <img src={item.img} alt={item.name} className="i-image text-center" />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h4 className="mt-5">Duration</h4>
            <span>{data.properties.duration[0].emoji} </span>
            <span> {data.properties.duration[0].description}</span>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          type="button "
          className="btn btn-success"
          style={{
            width: "188px",
            backgroundColor: "#3A643B",
            borderRadius: "15px",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Overview;
