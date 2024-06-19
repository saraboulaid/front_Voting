import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";

export default function ProgressBar(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(0);
  const [progressValue, setProgressValue] = useState(0);

  const toggleCheck = async () => {
    const optionId = props.optionId;

    const requestBody = {
      user_id: props.user_id,
      question_id: props.questionId,
      option_id: optionId,
    };

    try {
      if (isChecked == true) {
        console.log("Checking");
        const response = await axios.delete(
          `http://localhost:5082/Question/delete/${requestBody.question_id}/${requestBody.option_id}/${requestBody.user_id}`
        );
        console.log("Response:", response.data);
      } else {
        const response = await axios.post(
          "http://localhost:5082/Question/userQuestionResponse/Add",
          requestBody
        );
        console.log("Response:", response.data);
      }

      setIsChecked(!isChecked);

      // Mise à jour des valeurs de progression pour chaque option
      await props.updateProgressValues();
    } catch (error) {
      console.error("Error while sending request:", error);
    }
  };
  useEffect(() => {
    props.getCount();
  }, [props.getCount]);
  useEffect(() => {
    const fetchData = async () => {
      const newCount = await props.getCount();
      setCount(newCount);

      const newValue = await props.progressValue();
      setProgressValue(newValue);
    };

    fetchData();
  }, [isChecked]); // Observing changes in isChecked

  return (
    <div>
      <div
        className="d-flex align-items-center justify-content-between"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="d-flex align-items-center space-x-2"
          style={{ display: "flex" }}
        >
          {isChecked ? (
            <div onClick={toggleCheck}>
              <FaCircleCheck style={{ color: "#4a044e" }} />
            </div>
          ) : (
            <RiCheckboxBlankCircleLine
              style={{ color: "gray" }}
              onClick={toggleCheck}
            />
          )}
          <div
            style={{
              fontSize: "10px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            {props.option}
          </div>
        </div>

        <div>
          {count === 1 && props.imageSrcs && props.imageSrcs[0] && (
            <div
              className="d-flex align-items-center space-x-1"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar alt="Avatar" sx={{ width: 20, height: 20 }} />
              <span
                style={{
                  fontSize: "11px",
                  marginLeft: "6px",
                  alignContent: "center",
                }}
              >
                {count}
              </span>
            </div>
          )}
          {count > 1 && props.imageSrcs && props.imageSrcs.length > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AvatarGroup max={2}>
                <Avatar alt="Avatar1" sx={{ width: 20, height: 20 }} />
                <Avatar alt="Avatar2" sx={{ width: 20, height: 20 }} />
              </AvatarGroup>
              <span style={{ fontSize: "11px", marginLeft: "6px" }}>
                {count}
              </span>
            </div>
          )}
          {count === 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "11px" }}>{count}</span>
            </div>
          )}
        </div>
      </div>
      <div style={{ paddingTop: "4px" }}>
        <div
          className={`progress ${
            progressValue > 0 ? "progress-selected" : "progress-not-selected"
          }`}
          role="progressbar"
          aria-label="Basic example"
          aria-valuenow={progressValue}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{
            width: "92%",
            height: "7px",
            marginLeft: "22px",
          }}
        >
          <div
            className="progress-bar "
            style={{
              width: `${progressValue}%`,

              height: "100%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
