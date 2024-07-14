import React, { useEffect, useState } from "react";
import axios from "axios";
import EditWork from "./EditWork";
function WorkList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    FetchingData();
  }, []);

  // Fetching Data from Database Server
  const FetchingData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/works");
      const result = response.data;
      const formattedResult = result.map((work) => {
        return {
          ...work,
          created_at: formatDate(new Date(work.created_at)),
        };
      });
      setData(formattedResult);
    } catch (error) {
      console.error(error);
    }
  };

  // Format Date Function
  const formatDate = (date) => {
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

    const currentDayName = dayNames[date.getDay()];
    const currentMonthName = monthNames[date.getMonth()];
    const currentDateNumber = date.getDate();
    const currentYear = date.getFullYear();
    const currentHours = date.getHours();
    const currentMinutes = date.getMinutes().toString().padStart(2, "0");
    const currentSeconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = currentHours >= 12 ? "PM" : "AM";
    const formattedHours = (currentHours % 12 || 12)
      .toString()
      .padStart(2, "0");

    return `${currentDayName}, ${currentMonthName} ${currentDateNumber}, ${currentYear} ${formattedHours}:${currentMinutes}:${currentSeconds} ${ampm}`;
  };

  // Delete From Database
  const DeleteWork = async (id) => {
    try {
      const deleteWork = await fetch(`http://localhost:3000/works/${id}`, {
        method: "DELETE",
      });

      setData(
        data.filter((work) => {
          return work.id !== id;
        })
      );
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="workList">
      {data.map((work) => {
        return (
          <div className="workCard" key={work.id}>
            <div>
              <div className="card-text">
                <p className="workName">{work.work}</p>
                <p className="cardDate">{work.created_at}</p>
              </div>
              <div className="card-button">
                <EditWork work={work} workname={work.work} />
                <button
                  className="deleteBtn"
                  onClick={() => {
                    DeleteWork(work.id);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WorkList;
