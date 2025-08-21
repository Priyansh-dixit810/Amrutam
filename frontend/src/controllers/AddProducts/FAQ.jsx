import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";

function FAQ({ setStep, setUform }) {
  const [faq, setFaq] = useState([{ question: "", answer: "" }]);
  const [apd, setApd] = useState([{ title: "" }]);
  const [flashMsg, setFlashMsg] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // ✅ form validation only for FAQ (question + answer required)
  const isFormValid = () => {
    return faq.every((item) => item.question.trim() !== "" && item.answer.trim() !== "");
  };

  // FAQ Handlers
  const handleAddFAQ = () => setFaq([...faq, { question: "", answer: "" }]);
  const handleRemoveFAQ = (index) => setFaq(faq.filter((_, i) => i !== index));
  const handleChange = (index, field, value) => {
    const updated = [...faq];
    updated[index][field] = value;
    setFaq(updated);
  };

  // APD Handlers
  const handleAddapd = () => setApd([...apd, { title: "" }]);
  const handleRemoveapd = (index) => setApd(apd.filter((_, i) => i !== index));
  const handleapdChange = (index, field, value) => {
    const updated = [...apd];
    updated[index][field] = value;
    setApd(updated);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setFlashMsg("⚠️ Please fill all FAQ questions and answers before saving");
      setTimeout(() => setFlashMsg(""), 3000);
      return;
    }

    axios
      .post("http://localhost:8080/faq", { faq, apd }, { withCredentials: true })
      .then(() => {
        setFlashMsg("FAQ saved successfully! ✅");
        setIsSaved(true);
        setTimeout(() => setFlashMsg(""), 3000);
      })
      .catch(() => {
        setFlashMsg("Error saving FAQ ❌");
        setTimeout(() => setFlashMsg(""), 3000);
      });
  };

  return (
    <div className="container">
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
        className="p-4 mt-2"
        style={{ backgroundColor: "white", borderRadius: "25px" }}
        onSubmit={handleSubmit}
      >
        <div className="row">
          <h5>FAQ</h5>
          {faq.map((item, index) => (
            <div className="col-12 mt-3" key={index}>
              <div className="row">
                <div className="col-lg-5 col-12">
                  <TextField
                    required
                    label="Enter Question"
                    value={item.question}
                    fullWidth
                    onChange={(e) => handleChange(index, "question", e.target.value)}
                    InputLabelProps={{ style: { color: "#000000", fontWeight: "500" } }}
                    InputProps={{ style: { color: "#464646", fontWeight: "400" } }}
                    className="mb-4"
                  />
                </div>
                <div className="col-lg-6 col-10">
                  <TextField
                    required
                    label="Enter Answer"
                    value={item.answer}
                    fullWidth
                    onChange={(e) => handleChange(index, "answer", e.target.value)}
                    InputLabelProps={{ style: { color: "#000000", fontWeight: "500" } }}
                    InputProps={{ style: { color: "#464646", fontWeight: "400" } }}
                    className="mb-4"
                  />
                </div>
                <div className="col-1 text-start mt-2 fs-4">
                  <i
                    className="fa-solid fa-xmark cross"
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => handleRemoveFAQ(index)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
          <div className="col-12">
            <button
              type="button"
              className="btn text-start p-0"
              style={{ fontWeight: "600", color: "#3A643B", width: "188px" }}
              onClick={handleAddFAQ}
            >
              Add Another FAQ
            </button>
          </div>

          <h5 className="my-4">Additional Product Display</h5>
          {apd.map((item, index) => (
            <div className="col-12 mt-3" key={index}>
              <div className="row">
                <div className="col-12 d-flex align-items-center">
                  <div className="flex-grow-1">
                    <TextField
                      label="Enter Title"
                      value={item.title}
                      onChange={(e) => handleapdChange(index, "title", e.target.value)}
                      fullWidth
                      InputLabelProps={{ style: { color: "#000000", fontWeight: "500" } }}
                      InputProps={{ style: { color: "#464646", fontWeight: "400" } }}
                      className="mb-0"
                    />
                  </div>
                  <i
                    className="fa-solid fa-xmark cross fs-4 ms-2"
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => handleRemoveapd(index)}
                  ></i>
                </div>
              </div>
            </div>
          ))}

          <div className="col-12">
            <button
              type="button"
              className="btn text-start py-3 px-0"
              style={{ fontWeight: "600", color: "#3A643B", width: "188px" }}
              onClick={handleAddapd}
            >
              Add Another Product
            </button>
          </div>

          <div className="col-12 d-flex align-items-center justify-content-center gap-5">
            <button type="submit" className="btn btn-success" style={{ width: "188px" }}>
              Save
            </button>
            <button
              type="button"
              className="btn align-items-center"
              style={{ fontWeight: "600", color: "#3A643B", width: "188px" }}
              onClick={() => {
                if (!isSaved) {
                  setFlashMsg("⚠️ Please first save the form");
                  setTimeout(() => setFlashMsg(""), 3000);
                  return;
                }
                if (!isFormValid()) {
                  setFlashMsg("⚠️ Please complete all FAQ fields before going next");
                  setTimeout(() => setFlashMsg(""), 3000);
                  return;
                }
                setStep("Overview");
                setUform((prev) => ({ ...prev, FAQ: true }));
              }}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FAQ;
