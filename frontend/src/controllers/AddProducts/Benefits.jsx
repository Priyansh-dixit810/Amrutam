import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import EmojiPicker from "emoji-picker-react";

function Benefits({ setStep, setUform }) {
  const [flashMsg, setFlashMsg] = useState("");
  const [isSaved,setIsSaved] = useState(false);

  // Primary Benefits
  const [primaryBenefits, setPrimaryBenefits] = useState([{ title: "" }]);

  const handleAddPrimary = () => {
    setPrimaryBenefits([...primaryBenefits, { title: "" }]);
  };

  const handleRemovePrimary = (index) => {
    setPrimaryBenefits(primaryBenefits.filter((_, i) => i !== index));
  };

  const handlePrimaryChange = (index, value) => {
    const updated = [...primaryBenefits];
    updated[index].title = value;
    setPrimaryBenefits(updated);
  };

  // Secondary Benefits
  const [secondaryBenefits, setSecondaryBenefits] = useState([
    { emoji: "", description: "" },
  ]);
  const [secondaryPickerIndex, setSecondaryPickerIndex] = useState(null);

  const handleAddSecondaryBenefit = () => {
    setSecondaryBenefits([...secondaryBenefits, { emoji: "", description: "" }]);
  };

  const handleRemoveSecondaryBenefit = (index) => {
    setSecondaryBenefits(secondaryBenefits.filter((_, i) => i !== index));
  };

  const handleSecondaryDescriptionChange = (e, index) => {
    const updated = [...secondaryBenefits];
    updated[index].description = e.target.value;
    setSecondaryBenefits(updated);
  };

  const handleSecondaryEmoji = (emojiData, index) => {
    const updated = [...secondaryBenefits];
    updated[index].emoji = emojiData.emoji;
    setSecondaryBenefits(updated);
    setSecondaryPickerIndex(null);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Primary must not be empty
    if (primaryBenefits.some((b) => !b.title.trim())) {
      setFlashMsg("⚠️ Please fill all Primary Benefits");
      setTimeout(() => setFlashMsg(""), 3000);
      return;
    }

    axios
      .post(
        "https://amrutam-backend-sly8.onrender.com/benefits",
        { primaryBenefits, secondaryBenefits },
        { withCredentials: true }
      )
      .then(() => {
        setFlashMsg("Benefits saved successfully! ✅");
        setTimeout(() => setFlashMsg(""), 3000);
        setIsSaved(true);
      })
      .catch(() => {
        setFlashMsg("Error saving benefits ❌");
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
        {/* Primary Benefits */}
        <div className="row mt-4">
          <h5 className="mb-4">Primary Benefits</h5>
          {primaryBenefits.map((item, index) => (
            <div className="col-12 mt-2" key={index}>
              <div className="row">
                <div className="col-11">
                  <TextField
                    required
                    label="Enter Primary Benefit"
                    value={item.title}
                    onChange={(e) => handlePrimaryChange(index, e.target.value)}
                    fullWidth
                    InputLabelProps={{
                      style: { color: "#000000", fontWeight: "500" },
                    }}
                    InputProps={{
                      style: { color: "#464646", fontWeight: "400" },
                    }}
                  />
                </div>
                <div className="col-1 d-flex align-items-center justify-content-center fs-4">
                  <i
                    className="fa-solid fa-xmark"
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => handleRemovePrimary(index)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
          <div className="col-12 mt-2">
            <button
              type="button"
              className="btn text-start p-0"
              style={{ fontWeight: "600", color: "#3A643B" }}
              onClick={handleAddPrimary}
            >
              Add Another Benefit
            </button>
          </div>
        </div>

        {/* Secondary Benefits */}
        <div className="row mt-5">
          <h5 className="mb-4">Secondary Benefits</h5>

          {secondaryBenefits.map((item, index) => (
            <div className="row mb-2 g-2" key={index}>
              {/* Icon button with Emoji picker */}
              <div className="col-lg-2 col-12 px-1 position-relative">
                <button
                  type="button"
                  className="mybtn w-100"
                  onClick={() =>
                    setSecondaryPickerIndex(
                      secondaryPickerIndex === index ? null : index
                    )
                  }
                >
                  {item.emoji ? (
                    item.emoji
                  ) : (
                    <>
                     <i
                  className="fa-solid fa-image"
                  style={{ color: "#5B5B5B" }}
                ></i> Upload Icon
                    </>
                  )}
                </button>
                {secondaryPickerIndex === index && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 1000,
                    }}
                  >
                    <EmojiPicker
                      onEmojiClick={(e) => handleSecondaryEmoji(e, index)}
                    />
                  </div>
                )}
              </div>

              {/* Description field */}
              <div
                className="col-lg-10 col-12 d-flex p-0"
                style={{ gap: "10px" }}
              >
                <TextField
                    
                    label="Enter Secondary Benefit"
                    value={item.description}
                  onChange={(e) => handleSecondaryDescriptionChange(e, index)}
                    fullWidth
                    InputLabelProps={{
                      style: { color: "#000000", fontWeight: "500" },
                    }}
                    InputProps={{
                      style: { color: "#464646", fontWeight: "400" },
                    }}
                  />
                
                <div className="col-1 d-flex align-items-center justify-content-center fs-4">
                  <i
                    className="fa-solid fa-xmark"
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => handleRemoveSecondaryBenefit(index)}
                  ></i>
                </div>
              </div>
            </div>
          ))}

          {/* Add new secondary benefit */}
          <div className="col-12 mt-2">
            <button
              type="button"
              className="btn text-start p-0 py-3"
              style={{
                fontWeight: "600",
                color: "#3A643B",
                width: "188px",
              }}
              onClick={handleAddSecondaryBenefit}
            >
              Add Another Benefit
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="col-12 d-flex align-items-center justify-content-center gap-5 mt-4">
          <button className="btn btn-success" style={{ width: "188px" }}>
            Save
          </button>
          <button
            type="button"
            className="btn align-items-center"
            style={{ fontWeight: "600", color: "#3A643B", width: "188px" }}
            onClick={() => {
              if(!isSaved){
                    setFlashMsg("⚠️ Please first save the form");
                    setTimeout(() => setFlashMsg(""), 3000);
                    return;
                }
              setStep("properties");
              setUform((prev) => ({ ...prev, Benefits: true }));
            }}
          >
            Next
          </button>
        </div>
      </form>
      <style>
        {
          `
          .mybtn {
          border: 1px dashed #9DB29D;
          background-color: #EAF2EA;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 8px;
          height: 100%;
        }
        .icon {
          font-size: 18px;
        }
          `
        }
      </style>
    </div>
  );
}

export default Benefits;
