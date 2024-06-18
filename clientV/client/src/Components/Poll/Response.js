import React, { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import ProgressBar from "./ProgressBar";
import PieChart from "./PieChart";

export default function Response({ userData, chat }) {
  const [questionData, setQuestionData] = useState([]);
  const [voirDetailVisible, setVoirDetailVisible] = useState(false);
  const [pieChartVisible, setPieChartVisible] = useState(false);
  // useEffect(() => {
  //   const fetchQuestionData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5082/Question/${chat.questions[0].questionId}`
  //       );
  //       setQuestionData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching question data:", error);
  //     }
  //   };

  //   fetchQuestionData();
  // }, [chat.questions[0].questionId]);

  const getCount = async (questionId, optionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5082/Question/Count?question_id=${questionId}&option_id=${optionId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching count data:", error);
      return 0; // Retourner 0 en cas d'erreur
    }
  };

  const getProgressValue = async (questionId, optionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5082/Question/VoteProgress/${questionId}/${optionId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching progress data:", error);
      return 0; // Retourner 0 en cas d'erreur
    }
  };
  const togglePieChartVisibility = () => {
    setPieChartVisible(!pieChartVisible);
  };
  const updateProgressValues = async () => {
    for (const option of chat.questions[0].options) {
      const newValue = await getProgressValue(
        chat.questions[0].questionId,
        parseInt(option.optionId)
      );
      // Mise à jour du progressValue
      // Vous pouvez stocker ces valeurs dans le state si nécessaire
    }
  };

  return (
    <div
      className={`${
        userData.id === chat.sender_id
          ? "end_sondage_response"
          : "start_sondage_response"
      }`}
    >
      <div style={{ display: "inline-block", textAlign: "left" }}>
        {voirDetailVisible && (
          <div
            className="left_side"
            style={{ overflowY: "scroll", scrollbarWidth: "thin" }}
          >
            <div
              className="d-flex align-items-center space-x-6"
              style={{ height: "8%", backgroundColor: "#f3f4f6" }}
            >
              <div
                style={{ paddingLeft: "7%" }}
                onClick={() => setVoirDetailVisible(false)}
              >
                <IoClose
                  size={22}
                  style={{ color: "gray", cursor: "pointer" }}
                />
              </div>
              <div style={{ color: "gray" }}>Détails du sondage</div>
            </div>
            {chat.questions[0] && (
              <div
                key={chat.questions[0].questionId}
                className="grid grid-cols-1 divide-y-8 divide-gray-100"
              >
                <div
                  style={{
                    color: "#4a044e",
                    padding: "5%",
                    paddingLeft: "9%",
                    paddingTop: "9px",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                >
                  {chat.questions[0].text}
                  <div style={{ fontSize: "10px", paddingTop: "9px" }}>
                    Membres ayant voté : 2 sur 20
                  </div>
                </div>

                <div style={{ padding: "5%" }}>
                  <div className="d-flex align-items-center justify-between">
                    <div style={{ fontSize: "13px", color: "gray" }}>
                      Afficher le piechart
                    </div>
                    <div style={{ color: "gray" }}>
                      <MdArrowDropDown onClick={togglePieChartVisibility} />{" "}
                    </div>
                  </div>
                  {pieChartVisible && (
                    <PieChart
                      options={chat.questions[0].options.map((option) => ({
                        option: option.text, // Assurez-vous que vous avez la bonne propriété ici
                        getCount: () =>
                          getCount(
                            chat.questions[0].questionId,
                            parseInt(option.optionId)
                          ),
                      }))}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {chat.questions[0] && (
          <div
            key={chat.questions[0].questionId}
            className="card border-gray-150"
            style={{
              width: "18rem",
              marginBottom: "20px",
              overflow: "hidden",
              wordWrap: "break-word",
              border: "1px solid #e2e8f0",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <div
              className="card-body"
              style={{
                padding: "13px",
                wordWrap: "break-word",
              }}
            >
              <div>
                <div
                  className="card-title font-semibold"
                  style={{ fontSize: "13px" }}
                >
                  {chat.questions[0].text}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "gray",
                    marginTop: "10px",
                    display: "flex",
                  }}
                  className="d-flex align-items-center space-x-2"
                >
                  <div style={{ marginRight: "8px" }}>
                    <FaCircleCheck />
                  </div>
                  <div style={{ marginBottom: "3px" }}>
                    Sélectionnez une ou plusieurs options
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "15px" }}>
                {chat.questions[0].options.map((option, index) => (
                  <div style={{ marginBottom: "18px" }}>
                    <ProgressBar
                      key={index}
                      option={option.text}
                      user_id={userData.id}
                      progressValue={() =>
                        getProgressValue(
                          chat.questions[0].questionId,
                          parseInt(option.optionId)
                        )
                      }
                      getCount={() =>
                        getCount(
                          chat.questions[0].questionId,
                          parseInt(option.optionId)
                        )
                      }
                      imageSrcs={["fa.jpeg", "adam.jpeg"]}
                      questionId={chat.questions[0].questionId}
                      optionId={parseInt(option.optionId)}
                      updateProgressValues={updateProgressValues}
                    />
                  </div>
                ))}
              </div>
              <div
                className="fw-light"
                style={{
                  marginTop: "8px",
                  paddingLeft: "90%",
                  fontSize: "10px",
                  color: "gray",
                }}
              >
                {chat.hh_mm}
              </div>
            </div>
            <div className="card-footer d-flex justify-content-center bg-white border-gray-150">
              <div className="row">
                <div className="col text-center">
                  <div
                    style={{
                      fontSize: "13px",
                      cursor: "pointer",
                      color: "#0ea5e9",
                      fontFamily: "cursive",
                      border: "solid 1px #d6d3d1",
                      padding: "8px",
                      borderLeftColor: "transparent",
                      borderRightColor: "transparent",
                      borderBottomColor: "transparent",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => setVoirDetailVisible(true)}
                  >
                    Voir les votes
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
