import "./AddProduct.css";
import Benefits from "./Benefits";
import GeneralInfo from "./GeneralInfo";
import Properties from "./Properties";
import FAQ from "./FAQ";
import { useState } from "react";
import Overview from "./Overview";
function AddProduct() {
  const [step, setStep] = useState("generalinfo");
  const [uform, setUform] = useState({
    GeneralInfo: false,
    Benefits: false,
    Properties: false,
    FAQ: false,
  });
  return (
    <div className="p-lg-4 p-2 mt-2">
      <p className="mb-5" style={{ color: "#3A643B" }}>
        Products &nbsp;&nbsp;&gt;&nbsp;&nbsp; Add Product{" "}
      </p>
      <div className="row mr-5">
        <div className="col-12 d-flex align-items-center justify-content-center flex-wrap">
          <span
            className={`pages_num rounded-circle d-flex align-items-center justify-content-center ${
              uform.GeneralInfo ? "completed" : ""
            }`}
          >
            {uform.GeneralInfo ? <i className="fa-solid fa-check"></i> : "01"}
          </span>
          <hr className="mx-2" />

          <span
            className={`pages_num rounded-circle d-flex align-items-center justify-content-center ${
              uform.Benefits ? "completed" : ""
            }`}
          >
            {uform.Benefits ? <i className="fa-solid fa-check"></i> : "02"}
          </span>
          <hr className="mx-2" />

          <span
            className={`pages_num rounded-circle d-flex align-items-center justify-content-center ${
              uform.Properties ? "completed" : ""
            }`}
          >
            {uform.Properties ? <i className="fa-solid fa-check"></i> : "03"}
          </span>
          <hr className="mx-2" />

          <span
            className={`pages_num rounded-circle d-flex align-items-center justify-content-center ${
              uform.FAQ ? "completed" : ""
            }`}
          >
            {uform.FAQ ? <i className="fa-solid fa-check"></i> : "04"}
          </span>
          <hr className="mx-2" />

          <span className="rounded-circle pages_num">05</span>
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center mt-2">
          <span className="page_title_general">
            General Information
          </span>
          <span className="page_tit">Benefits</span>
          <span className="page_tit">Properties</span>
          <span className="page_tit">FAQ </span>
          <span className="page_tit">Overview</span>
        </div>
        <div className="col-12">
          {step === "generalinfo" && (
            <GeneralInfo setStep={setStep} setUform={setUform} />
          )}
          {step === "benefits" && (
            <Benefits setStep={setStep} setUform={setUform} />
          )}
          {step === "properties" && (
            <Properties setStep={setStep} setUform={setUform} />
          )}
          {step === "FAQ" && <FAQ setStep={setStep} setUform={setUform} />}
          {step === "Overview" && (
            <Overview setStep={setStep} setUform={setUform} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
