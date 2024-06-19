import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import PieChart from "./PieChart";
import { IoClose } from "react-icons/io5";
import Optioni from "./Optioni";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { FaCircleCheck } from "react-icons/fa6";
import { MdArrowDropUp } from "react-icons/md";

export default function ResponseNonMultiple(props) {
  console.log("chat :" + JSON.stringify(props.chat));
  // const id = props.id;
  const [questionData, setQuestionData] = useState([]);

  // useEffect(() => {
  //   const fetchQuestionData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5082/Question/${id}`
  //       );
  //       setQuestionData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching question data:", error);
  //     }
  //   };
  //   fetchQuestionData();
  // }, [id]);

  return (
    <div>
      {/* {questionData.map((question) => ( */}
      <QuestionResponse
        // key={question.id}
        // question={question}
        userData={props.userData}
        chat={props.chat}
        setleft_side={props.setleft_side}
      />
      {/* ))} */}
    </div>
  );
}

function QuestionResponse({ userData, chat, setleft_side }) {
  console.log(" chofoni 123" + JSON.stringify(chat));
  const [checkedOption, setCheckedOption] = useState(null);
  const [progressValue, setProgressValue] = useState({});
  const [voirDetailVisible, setVoirDetailVisible] = useState(false);
  const [NumberOfUsersVoting, setNumberOfUsersVoting] = useState(0);
  const [counts, setCounts] = useState({});
  const [pieChartVisible, setPieChartVisible] = useState(false);

  console.log(" sara chat = " + JSON.stringify(chat));
  const toggleVisibility = () => {
    setVoirDetailVisible(!voirDetailVisible);
  };

  useEffect(() => {
    fetchData();
  }, [chat.questions[0]]);

  useEffect(() => {
    updateProgressValues();
  }, [counts]); // Update progress values when counts change

  console.log(`datee: ${chat.dateTimeCombined}`);

  const fetchData = async () => {
    try {
      const countsData = {};
      const promises = chat.questions[0].options.map(async (option) => {
        const count = await getCount(
          chat.questions[0].questionId,
          parseInt(option.optionId)
        );
        console.log("Count for option " + option.optionId + ": " + count);
        countsData[option.optionId] = count;
      });
      await Promise.all(promises);
      setCounts(countsData);
    } catch (error) {
      console.error("Error fetching count data:", error);
    }
  };
  const fetchNumberOfUsersVoting = async (questionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5082/Question/NumberVotes?question_id=${questionId}`
      );
      setNumberOfUsersVoting(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching number of users voting:", error);
    }
  };
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressData = {};
        const promises = Object.entries(chat.questions[0].options).map(
          async (option) => {
            const newValue = await getProgressValue(
              chat.questions[0].questionId,
              parseInt(option.optionId)
            );
            progressData[option.optionId] = newValue;
          }
        );
        await Promise.all(promises);
        setProgressValue(progressData);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchProgress();
  }, [checkedOption]);

  const getCount = async (questionId, optionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5082/Question/Count?question_id=${questionId}&option_id=${optionId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching count data:", error);
      return 0;
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
      return 0;
    }
  };

  const updateProgressValues = async () => {
    const progressData = {};
    for (const option of chat.questions[0].options) {
      const newValue = await getProgressValue(
        chat.questions[0].questionId,
        parseInt(option.optionId)
      );
      progressData[option.optionId] = newValue;
    }
    setProgressValue(progressData);
  };
  const toggleCheck = async (optionId) => {
    const requestBody = {
      user_id: userData.id,
      question_id: chat.questions[0].questionId,
      option_id: optionId,
    };

    try {
      if (checkedOption !== optionId) {
        if (checkedOption !== null) {
          await axios.delete(
            `http://localhost:5082/Question/delete/${requestBody.question_id}/${checkedOption}/${requestBody.user_id}`
          );
        }
        await axios.post(
          "http://localhost:5082/Question/userQuestionResponse/AddNN",
          requestBody
        );
        setCheckedOption(optionId);
      } else {
        await axios.delete(
          `http://localhost:5082/Question/delete/${requestBody.question_id}/${requestBody.option_id}/${requestBody.user_id}`
        );
        setCheckedOption(null); // Décocher l'option si elle est déjà cochée
      }
      await updateProgressValues();
      await fetchNumberOfUsersVoting(requestBody.question_id);
      await fetchData(); // Mettre à jour les compteurs après la mise à jour de checkedOption
    } catch (error) {
      console.error("Error while sending request:", error);
    }
  };

  console.log("krimooo" + JSON.stringify(chat.options));

  console.log("aw" + JSON.stringify(chat.questions[0].options));

  return (
    <div
      className={` ${
        userData.id === chat.sender_id
          ? "end_sondage_response"
          : "start_sondage_response"
      }`}
    >
      <div style={{ display: "inline-block", textAlign: "left" }}>
        {voirDetailVisible && (
          <div
            className="left_side_vr"
            style={{
              overflowY: "scroll",
              scrollbarWidth: "thin",
              backgroundColor: "white",
            }}
          >
            <div
              className="d-flex align-items-center space-x-6"
              style={{
                height: "8%",
                backgroundColor: "#f3f4f6",
                display: "flex",
                alignItems: "center",

                padding: "15px",
              }}
            >
              <div style={{ paddingLeft: "7%", paddingRight: "19px" }}>
                <IoClose
                  size={22}
                  style={{ color: "gray", cursor: "pointer" }}
                  onClick={() => {
                    setVoirDetailVisible(!voirDetailVisible);
                  }}
                />
              </div>
              <div style={{ color: "gray" }}>Détails du sondage</div>
            </div>
            <div className="grid grid-cols-1 divide-y-8 divide-gray-100">
              <div
                style={{
                  color: "#4a044e",
                  padding: "5%",
                  paddingLeft: "9%",
                  paddingTop: "9px",
                  marginTop: "5px",
                  fontSize: "14px",
                  border: "6px solid #f3f4f6",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                {chat.questions[0].text}
                <div style={{ fontSize: "10px", paddingTop: "9px" }}>
                  Membres ayant voté : 1 sur 20
                </div>
              </div>

              <div
                style={{
                  padding: "5%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  className="d-flex align-items-center justify-between"
                  style={{
                    display: "flex",
                    alignItems: "center",

                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      color: "gray",
                      marginRight: "108px",
                    }}
                  >
                    Afficher le piechart
                  </div>

                  <div
                    style={{
                      color: "gray",
                      justifyContent: "center",
                    }}
                  >
                    {pieChartVisible ? (
                      <MdArrowDropUp
                        onClick={() => setPieChartVisible(!pieChartVisible)}
                      />
                    ) : (
                      <MdArrowDropDown
                        onClick={() => setPieChartVisible(!pieChartVisible)}
                      />
                    )}

                    {/* Appel de la fonction pour basculer la visibilité du PieChart */}
                  </div>
                </div>
                <div>
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
              {chat.questions[0].options.map((o, index) => (
                <div
                  style={{
                    border: "6px solid #f3f4f6",
                    borderBottom: "none",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                >
                  <Optioni
                    key={index}
                    user_name={userData.username}
                    option={o}
                    dateF={chat.dateF}
                    getCount={() =>
                      getCount(
                        chat.questions[0].questionId,
                        parseInt(o.optionId)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          style={{
            width: "18rem",
            marginBottom: "20px",
            overflow: "hidden", // Empêche le débordement du contenu hors de la carte
            wordWrap: "break-word",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <div
            className="card-body"
            style={{
              padding: "13px",
              wordWrap: "break-word",
              // Permet au texte de revenir à la ligne si nécessaire
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
              >
                <div style={{ marginRight: "8px" }}>
                  <FaCircleCheck />
                </div>
                <div>Sélectionnez une option</div>
              </div>
            </div>
            <div className="space-y-4 " style={{ marginTop: "15px" }}>
              {chat.questions[0].options.map((option, index) => (
                <div key={index} style={{ marginBottom: "15px" }}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between ",
                        alignItems: "center",
                      }}
                    >
                      <div
                        onClick={() => toggleCheck(option.optionId)}
                        style={{ display: "flex" }}
                      >
                        {checkedOption === option.optionId ? (
                          <FaCircleCheck
                            style={{ color: "#4a044e", marginRight: "7px" }}
                          />
                        ) : (
                          <RiCheckboxBlankCircleLine
                            style={{ color: "gray", marginRight: "7px" }}
                          />
                        )}

                        <div
                          style={{
                            fontSize: "10px",
                            wordWrap: "break-word",
                            marginRight: "3px",
                            overflowWrap: "break-word",
                            maxWidth: "179px",
                          }}
                        >
                          {option.text}
                        </div>
                      </div>
                      <div style={{ paddingLeft: "45px", paddingTop: "5px" }}>
                        {counts[option.optionId] === 1 && (
                          <div style={{ display: "flex" }}>
                            <Avatar
                              alt="Avatar"
                              sx={{ width: 20, height: 20 }}
                            />
                            <span
                              style={{
                                fontSize: "11px",
                                marginLeft: "6px",
                                alignContent: "center",
                              }}
                            >
                              {" "}
                              {counts[option.optionId]}
                            </span>
                          </div>
                        )}
                        {counts[option.optionId] > 1 && (
                          <div
                            className="d-flex align-items-center space-x-1"
                            style={{
                              display: "flex",
                            }}
                          >
                            <AvatarGroup max={2}>
                              <Avatar
                                alt="Avatar1"
                                sx={{ width: 20, height: 20 }}
                              />
                              <Avatar
                                alt="Avatar2"
                                sx={{ width: 20, height: 20 }}
                              />
                            </AvatarGroup>
                            <span
                              style={{
                                fontSize: "11px",
                                marginLeft: "6px",
                                alignContent: "center",
                              }}
                            >
                              {counts[option.optionId]}
                            </span>
                          </div>
                        )}
                        {counts[option.optionId] === 0 && (
                          <div>
                            <span style={{ fontSize: "11px" }}>
                              {" "}
                              {counts[option.optionId]}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ paddingTop: "4px" }}>
                    <div
                      className={`progress ${
                        checkedOption === option.optionId
                          ? "progress-selected"
                          : "progress-not-selected"
                      }`}
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={progressValue[option.optionId]}
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
                          width: `${progressValue[option.optionId]}%`,
                          height: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
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
            onClick={() => {
              setVoirDetailVisible(true);
              setleft_side("VOIR_DETAILS");
            }}
          >
            Voir les votes
          </div>
        </div>
      </div>
    </div>
  );
}
