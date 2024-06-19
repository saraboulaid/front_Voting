import React, { useState, useEffect, useRef } from "react";
import NavbarLeftSide from "./NavbarLeftSide";
import NavbarCenterSide from "./NavbarCenterSide";
import HelpIcon from "./HelpIcon";
import SideBar from "./SideBar";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import Conversation from "./Conversation";
import { IoSendSharp } from "react-icons/io5";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import elon from "./assets/elon.jpg";
import { FaUserAlt, FaPlus } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { MdWifiCalling3 } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import Picker from "emoji-picker-react";
import { PiSmileyLight } from "react-icons/pi";
import { pink } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import ResponseNonMultiple from "./Components/Poll/ResponseNonMultiple";
import Response from "./Components/Poll/Response";
import ShowprofileINFO from "./showprofileINFO";
import Room_bar from "./room_bar";
import See_members from "./see_members";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import Showcontacts from "./ShowContacts";
import AddgroupForm from "./AddgroupForm";
import { FaMicrophone } from "react-icons/fa6";
import PieChart from "./Components/Poll/PieChart";
import Optioni from "./Components/Poll/Optioni";
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";

// import Poll from "./Components/Poll/Poll";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[900],
    "&:hover": {
      backgroundColor: alpha(pink[900], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[900],
  },
}));

function Navbar(props) {
  //props.users,props.messages
  const [visibilityConversations, setVisibilityConversations] = useState(true);
  const [GrpChatConversations, setGRPConversationsVisibility] = useState(false);
  const [OptionsShow, SetOptionsShow] = useState(false);
  const [options, setOptions] = useState(["", ""]);
  const [showPicker, setShowPicker] = useState(true);
  const [question, setQuestion] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const inputRef = useRef(null);
  const [emojiColor, setEmojiColor] = useState("#4a044e");
  const [showResponse, setShowResponse] = useState(false);
  const [pollId, setPollId] = useState(0);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [Groupes, setGroupes] = useState(props.userGroupes);
  const [pieChartVisible, setPieChartVisible] = useState(false);
  const [voirDetailVisible, setVoirDetailVisible] = useState(false);

  console.log("les groupes sont " + JSON.stringify(Groupes));

  const getUniqueKey = (obj) => JSON.stringify(obj);

  // Get the private chats for the specific receiver and handle the case where it might not exist
  const receiverChats =
    props.privateChats.get(props.userData.receivername) || [];
  const userChats = props.privateChats.get(props.userData.username) || [];

  // Combine (union) the arrays
  const combinedChats = [...receiverChats, ...userChats];

  // Filtering the array to remove duplicates
  const uniqueObjects = combinedChats.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => getUniqueKey(o) === getUniqueKey(obj))
  );
  let count = 0;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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

  const filteredContacts = props.userBackendData.contactes.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // console.log("BackendData est : "+JSON.stringify(props.userBackendData))
  const [groupeselected, setgroupeselected] = useState({
    grpid: "",
    username: "",
    img: "",
  });

  const renderContent = () => {
    switch (left_side) {
      case "PROFILE":
        return <ShowprofileINFO userData={props.userData}></ShowprofileINFO>;
      case "WELCOME":
        return (
          <>
            <div className="Tap_left_side">
              <span>Communaute</span>
            </div>
            <div
              className="left_side_options"
              id="channels_div"
              onClick={showGroups}
            >
              <IoIosArrowDown /> Channels
            </div>
            {GrpChatConversations && (
              <>
                <div
                  className={`conversation conversation-margin ajouter_members`}
                  style={{ alignItems: "center" }}
                >
                  <button
                    style={{
                      backgroundColor: "#22c55e",
                      borderRadius: "50%",
                      width: "35px",
                      height: "35px",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <MdOutlinePersonAddAlt />
                  </button>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      height: "40px",
                    }}
                    onClick={() => setleft_side("ADD_GROUPE")}
                  >
                    <span
                      style={{
                        color: "#e7c4e8",
                        marginLeft: "20px",
                        fontFamily: "cursive",
                      }}
                    >
                      creer un groupe
                    </span>
                  </div>
                </div>
              </>
            )}

            {Groupes.map((Groupe, index) => (
              <div
                className={`conversation conversation-margin ${
                  GrpChatConversations ? "" : "hidden-element"
                }  ${
                  selectedConversation === Groupe.id && isChatroom
                    ? "clickedconversation"
                    : ""
                }`}
                id="Group_chat"
                onClick={() => {
                  setischatroom(true);
                  setSelectedConversation(Groupe.id);
                  setgroupeselected({
                    grpid: Groupe.id,
                    username: Groupe.name,
                    img: Groupe.grpImg,
                  });
                }}
                key={index}
              >
                <span style={{ position: "relative" }}>
                  <img
                    src={Groupe.grpImg}
                    className="profile_pic_chat"
                    alt="pic"
                  />
                </span>
                <div style={{ display: "inline-block" }}>
                  <div>
                    <span className="name">{Groupe.name}</span>
                  </div>
                  <div>
                    <span className="statut">{Groupe.status}</span>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="left_side_options"
              onClick={() => {
                showcontacts();
                setischatroom(false);
              }}
            >
              <IoIosArrowDown /> Conversation
            </div>
            <div
              className={`Conversations ${
                visibilityConversations ? "" : "hidden-element"
              }`}
              id="conversations"
            >
              <Conversation
                userContacts={props.userContacts}
                users={props.users}
                isChatroom={isChatroom}
                setischatroom={setischatroom}
                userData={props.userData}
                setUserData={props.setUserData}
                privateChats={props.privateChats}
                selectedConversation={selectedConversation}
                setSelectedConversation={setSelectedConversation}
                GrpChatConversations={GrpChatConversations}
              />
            </div>
          </>
        );
      case "INFO":
        return (
          <>
            <ShowprofileINFO userData={groupeselected}></ShowprofileINFO>
            <div
              className="see_members"
              onClick={() => {
                // Empty dependency array to run the effect only once
                setleft_side("SEE_MEMBERS");
              }}
            >
              {" "}
              show members
            </div>
          </>
        );
      case "SEE_MEMBERS":
        return (
          <>
            <div>
              <div
                className={`conversation conversation-margin ajouter_members`}
                onClick={() => setleft_side("ADD_TO_GROUP")}
              >
                <button
                  style={{
                    backgroundColor: "#22c55e",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  <MdOutlinePersonAddAlt />
                </button>
                <div
                  style={{
                    display: "flex",
                    alignItems: "start",
                    height: "40px",
                  }}
                >
                  <span
                    style={{
                      color: "#e7c4e8",
                      marginLeft: "8px",
                      fontFamily: "cursive",
                    }}
                  >
                    Ajouter des members
                  </span>
                </div>
              </div>
            </div>
            <See_members
              groupeselected={groupeselected}
              userContacts={props.userContacts}
              users={props.users}
              isChatroom={isChatroom}
              setischatroom={setischatroom}
              userData={props.userData}
              setUserData={props.setUserData}
              privateChats={props.privateChats}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
              setleft_side={setleft_side}
            ></See_members>
          </>
        );
      case "ADD_TO_GROUP":
        return (
          <>
            <div style={{ marginBottom: "16px" }}>
              <input
                type="text"
                placeholder="Ajouter un member"
                style={{
                  fontFamily: "cursive",
                  width: "100%",
                  borderRadius: "16px",
                  padding: "4px",
                  paddingRight: "0px",
                }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Showcontacts
              userBackendData={{ contactes: filteredContacts }}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
              groupeselected={groupeselected}
              setleft_side={setleft_side}
            ></Showcontacts>
          </>
        );
      case "ADD_GROUPE":
        return (
          <>
            {console.log("BackendData est : " + props.userBackendData)}
            <AddgroupForm
              setGroupes={setGroupes}
              userid={props.userBackendData.user.id}
              count={count}
              setleft_side={setleft_side}
            ></AddgroupForm>
          </>
        );
      case "VOIR_DETAILS":
        return (
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
        );
    }
  };

  const [sondage, setSondage] = useState({
    senderName: "",
    sender_id: props.userData.id,
    receiverName: "",
    question: "",
    options: [],
    ismultiple: false,
    date: null,
  });
  const toggleEmojiColor = () => {
    setEmojiColor((prevColor) =>
      prevColor === "#4a044e" ? "#f8bbd0" : "#4a044e"
    );
  };
  const [iconColor, setIconColor] = useState("#ccc");
  const handleMouseEnter = () => {
    setIconColor("#4a044e");
  };

  const handleMouseLeave = () => {
    setIconColor("#ccc");
  };
  const sendQuestionToBackend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5082/Question/question/SondageSave",
        {
          questions: [
            {
              isMultiple: isMultiple,
              text: question,
              options: options.filter((option) => option.trim() !== ""),
            },
          ],
          creatorId: sondage.sender_id,
        }
      );

      setQuestion("");
      setOptions(["", ""]);
      setPollId(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error sending question to backend:", error);
    }
  };
  const afterSubmit = async () => {
    console.log(" saraton" + JSON.stringify(props.userData));
    SetShowsondage(false);
    setShowResponse(true);
    setSondage({
      ...sondage,
      senderName: props.userData.username,
      ismultiple: isMultiple,
    });
    console.log("creator:" + props.userData.id);
    props.sendValueSondage(sondage);
    // Clear the inputs
    setQuestion("");
    setOptions(["", ""]); // Reset options to initial state
    // await sendQuestionToBackend();
  };
  const showcontacts = () => {
    setVisibilityConversations(!visibilityConversations);
  };
  const [ShowSondage, SetShowsondage] = useState(false);

  const toggleVisibility = () => {
    SetShowsondage(false);
    setShowPicker(false);
    setQuestion(""); // Réinitialiser la question
    setOptions(["", ""]); // Réinitialiser les options
  };
  const addEmoji = (e) => {
    if (selectedOptionIndex !== null) {
      let sym = e.unified.split("-");
      let codesArray = sym.map((el) => parseInt(el, 16));
      let emoji = String.fromCodePoint(...codesArray);

      const newOptions = [...options];
      newOptions[selectedOptionIndex] += emoji;

      // Mise à jour de l'état options dans le state local
      setOptions(newOptions);

      // Mise à jour de l'état options dans le state sondage pour l'envoi au backend
      setSondage((prevSondage) => ({
        ...prevSondage,
        options: newOptions.filter((option) => option.trim() !== ""),
      }));
    } else {
      let sym = e.unified.split("-");
      let codesArray = sym.map((el) => parseInt(el, 16));
      let emoji = String.fromCodePoint(...codesArray);

      // Mise à jour de l'état question dans le state local
      setQuestion(question + emoji);

      // Mise à jour de l'état question dans le state sondage pour l'envoi au backend
      setSondage((prevSondage) => ({
        ...prevSondage,
        question: question + emoji,
      }));
    }
  };

  console.log("/// 9 " + JSON.stringify(props.userGroupes));

  useEffect(() => {
    console.log("publicChats:", props.publicChats);
    const chat = props.publicChats;
    localStorage.setItem("publicChats", JSON.stringify(chat));
  }, [props.publicChats]);

  const [CurrentTab, SetCurrentTab] = useState({
    username: "",
    img: "",
    status: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPicker &&
        !event.target.closest(".emoji_icon") &&
        !event.target.closest(".PickEmoji")
      ) {
        setShowPicker(false);
        toggleEmojiColor();
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [showPicker]);

  console.log(" hi ! publicChats:", props.publicChats);
  const [isChatroom, setischatroom] = useState(true);

  const showGroups = () => {
    setGRPConversationsVisibility(!GrpChatConversations);
  };
  const handlemessage = (event) => {
    const { value } = event.target;
    props.setUserData({ ...props.userData, message: value });
  };

  const changeRoom = () => {
    setischatroom(!isChatroom);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];

    if (index === options.length) {
      newOptions.push("");
    }

    newOptions[index] = value;

    if (
      newOptions.every((opt) => opt.trim() !== "") &&
      index === options.length - 1
    ) {
      newOptions.push("");
    }

    setOptions(newOptions);
  };

  // useEffect(()=>{
  // setCurrentPrivateTab({...CurrentPrivateTab,messages:props.privateChats.get(CurrentPrivateTab.username)})
  // },props.privateChats)
  console.log("ha houwa type : ", typeof props.privateChats);
  console.log("ha houwa tani hhh : ", props.privateChats);
  const [msg, setmsg] = useState([]);
  const [ProfilClicked, SetProfilClicked] = useState(false);
  const [left_side, setleft_side] = useState("WELCOME");
  const [isMultiple, setIsMultiple] = useState(false);
  const getprivatechat = (senderName) => {
    const chat = props.privateChats.get(senderName);

    // const afterSubmit = async () => {
    //   setShowResponse(true);
    //   await sendQuestionToBackend();
    // };

    return chat;
  };

  return (
    <>
      <body>
        <div className="send_message_" id="bottom_chat_box_by_me">
          <span style={{ display: "relative", height: "45px" }}>
            <FaMicrophone
              style={{
                position: "absolute",
                height: "30px",
                left: "-16px",
                top: "0px",
              }}
              className="Micro"
            />
            <input
              type="text"
              placeholder="Enter your message"
              onChange={handlemessage}
              value={props.userData.message}
              id="msg_input"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  if (isChatroom === true) {
                    props.sendValue();
                  } else {
                    props.sendPrivateValue();
                  }
                }
              }}
            />
          </span>

          <FaPlus
            style={{
              marginLeft: "-38px",
              marginRight: "16px",
              marginBottom: "-3px",
              color: "rgb(133, 75, 133)",
            }}
            onClick={() => {
              if (OptionsShow === false) {
                SetOptionsShow(true);
              } else {
                SetOptionsShow(false);
              }
            }}
          />

          <button
            id="send_btn"
            type="button"
            onClick={() => {
              if (isChatroom === true) {
                props.sendValue();
              } else {
                props.sendPrivateValue();
              }
            }}
          >
            <IoSendSharp
              style={{ color: "rgb(255, 255, 255)" }}
              // onclick={() => sendOptions()}
            />
          </button>
        </div>
        <div>
          {/* <div className={bleuri_liya_body ? "body_blur" : ""}> */}
          <span className="PickEmoji">
            {showPicker && <Picker onEmojiClick={addEmoji} />}
          </span>
          {ShowSondage ? (
            <div className={`PollTest sara_card ${"not_blur"}`} id="frayma">
              <div
                className="TOP bg-fuchsia-950"
                style={{
                  backgroundColor: "#4a044e",

                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "15px" }}>
                  <IoClose
                    onClick={() => {
                      toggleVisibility();
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </span>
                <span>Créer un sondage</span>
              </div>
              <div style={{ marginTop: "-12px" }}>
                <div className="Ask">
                  <div
                    className="question text-lg font-semibold text-gray-600"
                    style={{
                      marginLeft: "13px",
                      fontWeight: "600",
                      color: "#4b5563",
                      fontSize: "18px",
                      marginTop: "-2px",
                    }}
                  >
                    Question
                  </div>
                  <div>
                    <input
                      className="inputs"
                      type="text"
                      placeholder="Poser une question"
                      value={question}
                      onChange={(e) => {
                        setQuestion(e.target.value);
                        setSondage((prevSondage) => ({
                          ...prevSondage,
                          question: e.target.value,
                        }));
                      }}
                      ref={inputRef}
                      style={{
                        color: emojiColor,
                        marginLeft: "10px",
                        marginRight: "13px",
                        width: "92%",
                      }}
                    />

                    <div
                      className="emoji_icon"
                      onClick={() => {
                        setShowPicker(!showPicker);
                        toggleEmojiColor();
                        setSelectedOptionIndex(null);
                      }}
                      style={{
                        fontSize: "24px",
                        color: emojiColor,
                        marginTop: "-25px",
                      }}
                    >
                      <PiSmileyLight />
                    </div>
                  </div>
                </div>

                <div
                  className="question text-lg font-bold text-gray-600"
                  id="options_div"
                  style={{
                    paddingLeft: "12px",
                    marginTop: "12px",
                    marginLeft: "14px",
                    fontWeight: "600",
                    color: "#4b5563",
                    fontSize: "18px",
                  }}
                >
                  Options
                </div>
                <div
                  className="Options-div-conteneur"
                  style={{
                    height: options.length > 2 ? "80px" : "auto",
                    overflowY: options.length > 2 ? "scroll" : "hidden",
                    scrollbarWidth: options.length > 2 ? "thin" : "none",
                    scrollbarColor:
                      options.length > 2 ? "#888 #f1f1f1" : "auto",
                    wordWrap: "break-word",
                  }}
                >
                  <div className="options-container">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="input_emoji_icon"
                        style={{
                          height: "40px",
                          alignItems: "center",
                          paddingLeft: "12px",
                        }}
                      >
                        <input
                          type="text"
                          className="inputs"
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            handleOptionChange(index, e.target.value);
                            setSondage((prevSondage) => {
                              const newOptions = [...prevSondage.options];
                              newOptions[index] = e.target.value;
                              return {
                                ...prevSondage,
                                options: newOptions,
                              };
                            });
                          }}
                          style={{
                            color: emojiColor,
                            width: "94%",
                            marginRight: "-10px",
                          }}
                        />
                        <div
                          className="emoji_icon"
                          onClick={() => {
                            setShowPicker(!showPicker);
                            toggleEmojiColor();
                            setSelectedOptionIndex(index);
                          }}
                          style={{
                            fontSize: "24px",
                            color: emojiColor,
                            marginRight: "-10px",
                            margintop: "-10px",
                          }}
                        >
                          <PiSmileyLight />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="top_bottom ">
                  <div className="Autorisation" style={{ paddingLeft: "24px" }}>
                    Autoriser plusieurs réponses
                  </div>
                  <div>
                    <PinkSwitch
                      style={{ color: "#4a044e" }}
                      checked={isMultiple}
                      onChange={(event) => {
                        setIsMultiple(event.target.checked);
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: iconColor,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    float: "right",
                    cursor: "pointer",
                    marginRight: "10px",
                    marginTop: "-3px",
                  }}
                  onClick={afterSubmit}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <IoSendSharp style={{ color: "white", fontSize: "20px" }} />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {OptionsShow === true ? (
            <span className="options_">
              {" "}
              <div
                className="OptionText"
                onClick={() => {
                  SetShowsondage(true);
                  // setbleuri_liya_body(true);
                }}
              >
                {" "}
                <IoIosStats
                  style={{ color: "gold", marginRight: "8px" }}
                />{" "}
                Sondage
              </div>
              <div className="OptionText">
                {" "}
                <IoDocumentText style={{ marginRight: "8px" }} /> Document
              </div>
              <div className="OptionText">
                <MdWifiCalling3 style={{ marginRight: "10px" }} />
                Call
              </div>
            </span>
          ) : (
            ""
          )}

          {console.log("users info : ", props.userData)}

          <div className="navbar">
            <NavbarLeftSide></NavbarLeftSide>
            <NavbarCenterSide></NavbarCenterSide>
            <div className="right-side">
              <HelpIcon></HelpIcon>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <SideBar
              SetProfilClicked={SetProfilClicked}
              userdata={props.userData}
              setleft_side={setleft_side}
            ></SideBar>
            <div className="Content">
              <div className="left_side">{renderContent()}</div>
              <div className="right_side">
                {isChatroom === true ? (
                  <div className="chat_box_by_me">
                    {groupeselected != { grpid: "", username: "", img: "" } ? (
                      <Room_bar
                        groupeselected={groupeselected}
                        setgroupeselected={setgroupeselected}
                        setleft_side={setleft_side}
                      ></Room_bar>
                    ) : (
                      ""
                    )}
                    <img
                      src="https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_80,w_820/v1587483114/content-items/004/280/247/coronavirusextra-original.gif?1587483114"
                      alt=""
                    />
                    {console.log(
                      "look pubchat :" + JSON.stringify(props.publicChats)
                    )}

                    {props.publicChats.map((chat, index) => {
                      if (
                        chat.status === "MESSAGE" &&
                        chat.senderName === props.userData.username
                      ) {
                        return (
                          <div className="response" key={index}>
                            <div className="Message">
                              <div className="message-sender-name vous">
                                Vous
                              </div>
                              <div className="msg">{chat.message}</div>
                              <div className="timestamp">{chat.date}</div>
                            </div>
                            <GoTriangleRight
                              style={{
                                color: "#e7c4e8",
                                fontSize: "60px",
                                padding: "0px",
                                height: "40px",
                                width: "40px",
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "end",
                                position: "absolute",
                                right: "5.93%",
                              }}
                            />
                            <div>
                              <img
                                src={props.userData.img}
                                className="profile_pic_chat"
                                alt="pic"
                                style={{ marginLeft: "16px" }}
                              />
                            </div>
                          </div>
                        );
                      } else if (chat.status === "MESSAGE") {
                        // This message is sent by another user
                        return (
                          <div className="chat_div" key={index}>
                            <div>
                              <img
                                src={chat.userImg}
                                className="profile_pic_chat"
                                alt="pic"
                              />
                            </div>
                            <GoTriangleLeft
                              style={{
                                color: "#e7c4e8",
                                fontSize: "60px",
                                padding: "0px",
                                height: "40px",
                                width: "40px",
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "end",
                                position: "absolute",
                                left: "4.3%",
                              }}
                            />
                            <div className="Message">
                              <div className="message-sender-name sender-not-me">
                                {chat.senderName}
                              </div>
                              <div className="msg">{chat.message}</div>
                              <div className="timestamp">{chat.date}</div>
                            </div>
                          </div>
                        );
                      } else if (isMultiple === true) {
                        return (
                          <Response
                            key={index}
                            userData={props.userData}
                            chat={chat}
                            question={question}
                            setleft_side={setleft_side}
                          />
                        );
                      } else {
                        return (
                          <ResponseNonMultiple
                            key={index}
                            userData={props.userData}
                            chat={chat}
                            question={question}
                            setleft_side={setleft_side}
                          />
                        );
                      }
                    })}
                  </div>
                ) : (
                  //hna machi f chatroom
                  <div className="chat_box_by_me">
                    {/* {msg= [...props.privateChats.get(CurrentPrivateTab.username)];} */}
                    <div
                      className="Private-discussion-navbar conversation"
                      // style={{ marginLeft: "-20px" }}
                      style={{ marginTop: "0px" }}
                    >
                      <img
                        src={props.userData.receiverImg}
                        className="profile_pic_chat small_profil"
                        alt="pic"
                      />

                      <div className="contact-name">
                        {props.userData.receivername}
                      </div>
                      <div
                        style={{
                          width: "50vw",
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <div className="right_camera_call">
                          {" "}
                          <IoMdVideocam style={{ marginRight: "16px" }} />
                          <MdWifiCalling3 style={{ marginRight: "16px" }} />
                          <SlOptionsVertical />
                        </div>
                      </div>
                    </div>

                    <div id="conteneur_all_private_messages">
                      {uniqueObjects?.map((chat, index) => {
                        props.privateChats.forEach((value, key) => {
                          console.log("11Key:", key, "Value:", value);
                        });
                        if (chat.senderName === props.userData.username) {
                          return (
                            <div className="response" key={index}>
                              <div className="Message">
                                <div className="message-sender-name vous">
                                  Vous
                                </div>
                                <div className="msg">{chat.message}</div>
                                <div className="timestamp">{chat.date}</div>
                              </div>
                              <GoTriangleRight
                                style={{
                                  color: "#e7c4e8",
                                  fontSize: "60px",
                                  padding: "0px",
                                  height: "40px",
                                  width: "40px",
                                  display: "flex",
                                  justifyContent: "end",
                                  alignItems: "end",
                                  position: "absolute",
                                  right: "5.93%",
                                }}
                              />
                              <div>
                                <img
                                  src={props.userData.img}
                                  className="profile_pic_chat"
                                  alt="pic"
                                  style={{ marginLeft: "16px" }}
                                />
                              </div>
                            </div>
                          );
                        } else {
                          // This message is sent by another user
                          return (
                            <>
                              <div className="chat_div" key={index}>
                                <div>
                                  <img
                                    src={props.userData.receiverImg}
                                    className="profile_pic_chat"
                                    alt="pic"
                                  />
                                </div>
                                <GoTriangleLeft
                                  style={{
                                    color: "#e7c4e8",
                                    fontSize: "60px",
                                    padding: "0px",
                                    height: "40px",
                                    width: "40px",
                                    display: "flex",
                                    justifyContent: "end",
                                    alignItems: "end",
                                    position: "absolute",
                                    left: "4.3%",
                                  }}
                                />
                                <div className="Message">
                                  <div>{chat.senderName}</div>
                                  <div className="msg">{chat.message}</div>
                                  <div className="timestamp">{chat.date}</div>
                                </div>
                              </div>
                            </>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
export default Navbar;
