import React, { useState } from "react";

function EditWork(props) {
  const [work, setWork] = useState(props.work.work);
  const [isClick, setIsClick] = useState(false);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setWork(newValue);
  };

  const updateWork = async (event) => {
    event.preventDefault();
    if (work == "") {
      alert("Cannot empty on edit input field");
    } else {
      try {
        const body = { work };
        const deleteWork = await fetch(
          `http://localhost:3000/works/${props.work.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        window.location = "/";
      } catch (error) {
        console.error(error);
      }
    }
  };

  // showEditDield
  function showEditDield() {
    return setIsClick(!isClick);
  }

  return (
    <div className="editSection">
      <div style={{ display: isClick ? "block" : "none" }}>
        <input
          className="editInput"
          type="text"
          onChange={handleChange}
          value={work}
        ></input>
        <button onClick={updateWork} type="submit" className="updateBtn">
          <i className="fa-solid fa-check"></i>
        </button>
      </div>
      <div>
        <button className="editBtn" onClick={showEditDield}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
    </div>
  );
}

export default EditWork;
