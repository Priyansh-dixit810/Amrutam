import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ingredients = [
  { name: "Bhringraj", img: "/media/images/Bhringraj.png" },
  { name: "Sariva", img: "/media/images/sariva.png" },
  { name: "Gudahal", img: "/media/images/Gudahal.png" },
  { name: "Jatamansi", img: "/media/images/Jatamansi.png" },
];
function Properties({ setStep, setUform }) {
  const [isSaved,setIsSaved] = useState(false);
  const [di, setDi] = useState([{ emoji: "", description: "" }]);
  const [usage, setUsage] = useState([{ emoji: "", field1: "", field2: "" }]);

  const [dosagePickerIndex, setDosagePickerIndex] = useState(null);
  const [usagePickerIndex, setUsagePickerIndex] = useState(null);

  // Dosage Handlers
  const handleDosageEmoji = (emojiData, index) => {
    const newDi = [...di];
    newDi[index].emoji = emojiData.emoji;
    setDi(newDi);
    setDosagePickerIndex(null);
  };

  const handleDescriptionChange = (e, index) => {
    const newDi = [...di];
    newDi[index].description = e.target.value;
    setDi(newDi);
  };

  const handleAddDosageItem = () => {
    setDi([...di, { emoji: "", description: "" }]);
  };

  const handleRemoveDosageItem = (index) => {
    setDi(di.filter((_, i) => i !== index));
  };

  // Usage Handlers
  const handleUsageEmoji = (emojiData, index) => {
    const newUsage = [...usage];
    newUsage[index].emoji = emojiData.emoji;
    setUsage(newUsage);
    setUsagePickerIndex(null);
  };

  const handleFieldChange = (e, index, field) => {
    const newUsage = [...usage];
    newUsage[index][field] = e.target.value;
    setUsage(newUsage);
  };

  const handleAddUsageItem = () => {
    setUsage([...usage, { emoji: "", field1: "", field2: "" }]);
  };

  const handleRemoveUsageItem = (index) => {
    setUsage(usage.filter((_, i) => i !== index));
  };

  //Ingredients
  const theme = useTheme();
  const [ingredientName, setIngredientName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const selectedNames = typeof value === "string" ? value.split(",") : value;

    const selected = ingredients.filter((ingredient) =>
      selectedNames.includes(ingredient.name)
    );

    setIngredientName(selected);
  };

  //Duration
  const [duration, setDuration] = useState([{ emoji: "", description: "" }]);
  const [durationPickerIndex, setDurationPickerIndex] = useState(null);

  const handleDurationEmoji = (emojiData, index) => {
    const newDuration = [...duration];
    newDuration[index].emoji = emojiData.emoji;
    setDuration(newDuration);
    setDurationPickerIndex(null);
  };

  const handleDurationChange = (e, index) => {
    const newDuration = [...duration];
    newDuration[index].description = e.target.value;
    setDuration(newDuration);
  };

  const handleAddDurationItem = () => {
    setDuration([...duration, { emoji: "", description: "" }]);
  };

  const handleRemoveDurationItem = (index) => {
    setDuration(duration.filter((_, i) => i !== index));
  };

  const isValid = () => {
    return (
      di.some((item) => item.emoji && item.description.trim()) &&
      usage.some((item) => item.emoji && item.field1.trim()) && 
      ingredientName.length > 0 &&
      duration.some((item) => item.emoji && item.description.trim())
    );
  };

  const [flashMsg, setFlashMsg] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!isValid()){
      setFlashMsg("⚠️ Please fill all required fields");
      setTimeout(() => setFlashMsg(""), 3000);
      return;
    }
    const filteredDi = di.filter(item => item.emoji && item.description);
     const filteredusage = usage.filter(item => item.emoji && (item.field1 || item.field2));
    axios.post("http://localhost:8080/properties", {di: filteredDi , usage, ingredientName, duration} ,{withCredentials: true})
    .then(res => {
      setFlashMsg("Properties saved successfully! ✅");
      setIsSaved(true);
      setTimeout(() => setFlashMsg(""), 3000); 
    })
    .catch((e) => {
      setFlashMsg("Error saving properties ❌");
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
        className="py-2 px-4 mt-2"
        style={{ backgroundColor: "white", borderRadius: "25px" }}
        onSubmit={handleSubmit}
      >
        <div className="row mt-2 px-2 py-1">
          <h5 className=" p-0">Dosage</h5>
          {di.map((item, index) => (
            <div className="row mb-2 g-2" key={index}>
              <div className="col-lg-2 col-12 px-1 position-relative">
                <button
                  type="button"
                  className="mybtn w-100"
                  onClick={() =>
                    setDosagePickerIndex(
                      dosagePickerIndex === index ? null : index
                    )
                  }
                    
                >
                  {item.emoji ? (
                    item.emoji
                  ) : (
                    <>
                      <i className="fa-regular fa-face-smile icon"></i>Add Icon
                    </>
                  )}
                </button>
                {dosagePickerIndex === index && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 1000,
                    }}
                  >
                    <EmojiPicker
                      onEmojiClick={(e) => handleDosageEmoji(e, index)}
                    />
                  </div>
                )}
              </div>

              {/* Description field */}
              <div
                className="col-lg-10 col-12 d-flex p-0"
                style={{ gap: "10px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter about Dosage"
                  value={item.description}
                  onChange={(e) => handleDescriptionChange(e, index)}
                    
                />
                <i
                  className="fa-solid fa-xmark cross"
                  onClick={() => handleRemoveDosageItem(index)}
                ></i>
              </div>
            </div>
          ))}

          <div className="col-11 p-0 mt-2">
            <button
              type="button"
              className="btn text-start p-0"
              style={{ fontWeight: "600", color: "#3A643B", width: "188px" }}
              onClick={handleAddDosageItem}
            >
              Add Another Item
            </button>
          </div>

          <h5 className="mt-4 p-0">Usage</h5>
          {usage.map((item, index) => (
            <div className="row mb-2 g-2" key={index}>
              <div className="col-lg-2 col-12 px-1 position-relative">
                <button
                  type="button"
                  className="mybtn w-100"
                  onClick={() =>
                    setUsagePickerIndex(
                      usagePickerIndex === index ? null : index
                    )
                  }
                    
                >
                  {item.emoji ? (
                    item.emoji
                  ) : (
                    <>
                      <i className="fa-regular fa-face-smile icon"></i>Add Icon
                    </>
                  )}
                </button>
                {usagePickerIndex === index && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 1000,
                    }}
                  >
                    <EmojiPicker
                      onEmojiClick={(e) => handleUsageEmoji(e, index)}
                    />
                  </div>
                )}
              </div>

              {/* Input fields */}
              <div
                className="col-lg-10 col-12 d-flex p-0"
                style={{ gap: "10px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Usage"
                  value={item.field1}
                  onChange={(e) => handleFieldChange(e, index, "field1")}
                    
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Usage"
                  value={item.field2}
                  onChange={(e) => handleFieldChange(e, index, "field2")}
                />
                <i
                  className="fa-solid fa-xmark cross"
                  onClick={() => handleRemoveUsageItem(index)}
                ></i>
              </div>
            </div>
          ))}

          <div className="col-11 p-0">
            <button
              type="button"
              className="btn text-start p-0 mt-2"
              style={{ fontWeight: "600", color: "#3A643B", width: "188px" }}
              onClick={handleAddUsageItem}
            >
              Add Another Item
            </button>
          </div>
          <h5 className="mb-4 mt-4 p-0">Primary Ingredients</h5>
          <div className="col-12 p-0">
            <FormControl sx={{ m: 1, width: "99%" }}>
              <InputLabel id="demo-multiple-name-label">
                Select Ingredients
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={ingredientName.map((item) => item.name)}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
                renderValue={() => null}
                  
              >
                {ingredients.map((ingredient) => (
                  <MenuItem
                    key={ingredient.name}
                    value={ingredient.name}
                    className="menu-item"
                  >
                    <div className="d-flex align-items-center gap-4">
                      <img
                        src={ingredient.img}
                        alt={ingredient.name}
                        style={{ width: 61, height: 47, objectFit: "cover" }}
                      />
                      <span>{ingredient.name}</span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-12 p-0">
            {ingredientName.map((item, index) => (
              <div
                className="p-3 d-flex align-items-center"
                style={{ backgroundColor: "#EAF2EA", borderRadius: "4px" }}
                key={index}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: 61, height: 47, objectFit: "cover" }}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
          {/* Duration Section */}
          <h5 className="mt-4 p-0">Duration</h5>
          {duration.map((item, index) => (
            <div className="row mb-2 g-2" key={index}>
              {/* Emoji button */}
              <div className="col-lg-2 col-12 px-1 position-relative">
                <button
                  type="button"
                  className="mybtn w-100"
                  onClick={() =>
                    setDurationPickerIndex(
                      durationPickerIndex === index ? null : index
                    )
                  }
                    
                >
                  {item.emoji ? (
                    item.emoji
                  ) : (
                    <>
                      <i className="fa-regular fa-face-smile icon"></i>Add Icon
                    </>
                  )}
                </button>
                {durationPickerIndex === index && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 1000,
                    }}
                  >
                    <EmojiPicker
                      onEmojiClick={(e) => handleDurationEmoji(e, index)}
                    />
                  </div>
                )}
              </div>

              {/* Description input */}
              <div
                className="col-lg-10 col-12 d-flex p-0"
                style={{ gap: "10px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Duration"
                  value={item.description}
                  onChange={(e) => handleDurationChange(e, index)}
                    
                />
                <i
                  className="fa-solid fa-xmark cross"
                  onClick={() => handleRemoveDurationItem(index)}
                ></i>
              </div>
            </div>
          ))}

          {/* Add Another Duration */}
          <div className="col-11 p-0 mt-2">
            <button
              type="button"
              className="btn text-start p-0"
              style={{ fontWeight: "600", color: "#3A643B", width: "188px" }}
              onClick={handleAddDurationItem}
            >
              Add Another Duration
            </button>
          </div>

          <div className="col-12 d-flex align-items-center justify-content-center gap-5 mt-4">
            <button type="submit" className="btn btn-success" style={{ width: "188px" }} >
              Save
            </button>
            <button
              type="button"
              className="btn align-items-center"
              style={{ fontWeight: "600", color: "#3A643B", width: "188px" }}
              onClick={() => {
                if(!isValid){
                  setFlashMsg("⚠️ Please fill required field first");
                    setTimeout(() => setFlashMsg(""), 3000);
                    return;
                }
                if(!isSaved){
                  setFlashMsg("⚠️ Please first save the form");
                    setTimeout(() => setFlashMsg(""), 3000);
                    return;
                }
                setStep("FAQ");
                setUform((prev) => ({ ...prev, Properties: true }));
              }}
            >
              Next
            </button>
          </div>
        </div>
      </form>

      <style>{`

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
        .cross {
          color: #3A643B;
          font-size: 20px;
          cursor: pointer;
          align-self: center;
        }
          .menu-item{
          padding: 8px;
          height:67px;
          padding-left: 20px;
          }
          .menu-item:hover{
          background-color: #EAF2EA;
          }
      `}</style>
    </div>
  );
}

export default Properties;
