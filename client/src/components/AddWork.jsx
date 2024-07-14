import axios from "axios";
import React, { useState } from "react";

function AddWork() {
  const [work, setWork] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setWork(newValue);
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();
    if (work == "") {
      alert("You have to write something on input field");
    } else {
      try {
        const body = { work };
        const response = await axios.post("http://localhost:3000/works", body, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(response.data);
        window.location = "/";
        setWork("");
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  // Dynamically render date
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const currentDayName = dayNames[currentDate.getDay()];
  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentDateNumber = currentDate.getDate();

  return (
    <div className="header">
      <h1>
        To-Do List {currentDayName} {currentMonthName} {currentDateNumber}
      </h1>
      <div className="inputSection">
        <form onSubmit={onSubmitForm}>
          <input
            className="mainInput"
            type="text"
            placeholder="Enter your To-Do"
            value={work}
            onChange={handleChange}
            autoFocus="true"
          />
          <button className="addBtn">
            <i className="fa-solid fa-plus"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddWork;
