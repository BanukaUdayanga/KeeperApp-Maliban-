import React, { useEffect, useState } from "react";
import axios from "axios";
import EditWork from "./EditWork";
import formatDate from "../formatDate";
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
          created_at: formatDate(new Date(work.created_at)), // formatDate import from formatDate file
        };
      });
      setData(formattedResult);
    } catch (error) {
      console.error(error);
    }
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
