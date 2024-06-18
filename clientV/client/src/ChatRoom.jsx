import React, { useState, useEffect, useRef } from "react";

import NavbarLeftSide from "./NavbarLeftSide";
import NavbarCenterSide from "./NavbarCenterSide";
import HelpIcon from "./HelpIcon";
import SideBar from "./SideBar";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import Conversation from "./Conversation";
import { IoSendSharp } from "react-icons/io5";
import { GoTriangleLeft } from "react-icons/go";
import { GoTriangleRight } from "react-icons/go";
import elon from "./assets/elon.jpg";
import { FaUserAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { MdWifiCalling3 } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import Picker from "emoji-picker-react";
import { PiSmileyLight } from "react-icons/pi";
import { pink } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import ResponseNonMultiple from "./Components/Poll/ResponseNonMultiple";
import Response from "./Components/Poll/Response";

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
  const [showPicker, setShowPicker] = useState(false);
  const [question, setQuestion] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const inputRef = useRef(null);
  const [emojiColor, setEmojiColor] = useState("#4a044e");
  const [showResponse, setShowResponse] = useState(false);
  const [pollId, setPollId] = useState(0);
  const [bleuri_liya_body, setbleuri_liya_body] = useState(false);

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
        "http://localhost:5082/Question/question/checkout",
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
                  setbleuri_liya_body(true);
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

          <div className="send_message_" id="bottom_chat_box_by_me">
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
            ></SideBar>
            <div className="Content">
              <div className="left_side">
                {ProfilClicked === true ? (
                  <>
                    <div className="top_change_profil">
                      <img
                        src={props.userData.img}
                        alt="pic"
                        id="profil_modif"
                      />
                    </div>
                    <div className="profile_Name_modify">
                      <div>
                        <FaUserAlt
                          style={{
                            marginTop: "10px",
                            color: " rgb(133, 75, 133)",
                          }}
                        />
                      </div>
                      <div id="bottom_profil_modify">
                        <div>
                          <div className="Nom_utilisateur">Nom</div>
                        </div>
                        <div>
                          <input type="text" value={props.userData.username} />
                        </div>
                        <div className="modification_info">
                          Ce nom d'utilisateur correspond au nom d'utilisateur
                          de domaine ainsi tout modification du nom
                          l'administrateur sera informe.
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
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
                    {/* <div className={`conversation ${GrpChatConversations ? '' : 'hidden-element'}`} id='Group_chat' onClick={()=>setischatroom(true)}>
                <span style={{position: "relative"}}>
                    <img src={`member-4.png`} className="profile_pic_chat" alt="pic" />
                </span>
                
                <div style={{display: "inline-block"}}>
                    <div><span className='name'>Group chat</span></div>
                    <div><span className='statut'>RH employees</span></div>
                </div>
                </div> */}
                    {props.userGroupes.map((Groupe, index) => (
                      <div
                        className={`conversation ${
                          GrpChatConversations ? "" : "hidden-element"
                        }`}
                        id="Group_chat"
                        onClick={() => setischatroom(true)}
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
                      ></Conversation>
                    </div>
                  </>
                )}
              </div>
              <div className="right_side">
                {isChatroom === true ? (
                  <div className="chat_box_by_me">
                    <ul>
                      <p>public messages</p>
                      {console.log(
                        "look pubchat :" + JSON.stringify(props.publicChats)
                      )}
                      {props.publicChats.map((chat, index) =>
                        chat.status === "MESSAGE" ? (
                          <li
                            className={`message ${
                              chat.senderName === props.userData.username
                                ? "self"
                                : ""
                            }`}
                            key={index}
                          >
                            {chat.senderName !== props.userData.username && (
                              <div className="avatar">{chat.senderName}</div>
                            )}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === props.userData.username && (
                              <div className="avatar self">vous</div>
                            )}
                          </li>
                        ) : isMultiple === true ? (
                          <Response
                            key={index}
                            userData={props.userData}
                            chat={chat}
                            question={question}
                          />
                        ) : (
                          <ResponseNonMultiple
                            key={index}
                            userData={props.userData}
                            chat={chat}
                            question={question}
                          />
                        )
                      )}
                    </ul>
                  </div>
                ) : (
                  <div>
                    {/* {msg= [...props.privateChats.get(CurrentPrivateTab.username)];} */}
                    <div
                      className="Private-discussion-navbar conversation margin_reg"
                      style={{ marginLeft: "-20px" }}
                    >
                      <img
                        src={props.userData.receiverImg}
                        className="profile_pic_chat small_profil"
                        alt="pic"
                      />

                      <div className="contact-name">
                        {props.userData.receivername}
                      </div>
                      <div className="right_camera_call">
                        {" "}
                        <IoMdVideocam style={{ marginRight: "16px" }} />
                        <MdWifiCalling3 style={{ marginRight: "16px" }} />
                        <SlOptionsVertical />
                      </div>
                    </div>

                    <div id="conteneur_all_private_messages">
                      {props.privateChats
                        .get(props.userData.receivername)
                        ?.map((chat, index) => {
                          props.privateChats.forEach((value, key) => {
                            console.log("Key:", key, "Value:", value);
                          });

                          props.privateChats.forEach(function (value, key) {});
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
                {/* <div className="right_side_top">IT community &#128293;</div> */}
                {/* <div className="chat_div">
            <div>
            <img src="member-2.png" className="profile_pic_chat" alt="pic" />
            </div>
            <GoTriangleLeft style={{color:"white",fontSize:"60px",padding:"0px",height:"40px",width:"40px",display:"flex",justifyContent:"end",alignItems:"end",position:"absolute",left:"4%"}}/>
            <div className='Message'>
            hello my name is Mohammed Bennani i'm 25 years old i'm an enginerr and i'm looking for a moroccan woman who nows how to cook and she's good to my mum should be an intelligent woman and gorgeous if anyone of you have those createreas here 's my Contact +33 65 78 90 12 34
            <div className='timestamp'>10:14 AM</div>
            </div>
           
         </div>
         <div className="chat_div">
            <div>
            <img src="zehiro.jpeg" className="profile_pic_chat" alt="pic" />
            </div>
            <GoTriangleLeft style={{color:"white",fontSize:"60px",padding:"0px",height:"40px",width:"40px",display:"flex",justifyContent:"end",alignItems:"end",position:"absolute",left:"4%"}}/>
            <div className='Message'>
            ya sobhanallah yallah helemt b wahad siyed labess jelaba bayda galia ghadi iji wahad titiz tayeb fa sari3i ila khotbatih ewa hak mankhaliwekch blach ha houwa lcontact dyali 
            06 93 12 43 06 o zereb khlass ha nta ra lebesst 9ftani o 3radet 3la nass hhh tel 3la tswira chouf zin hhh &#128514;
            <div className='timestamp'>10:14 AM</div>
            </div>
         </div>
         <div className="chat_div">
            <div>
            <img src="mi.jpeg" className="profile_pic_chat" alt="pic" />
            </div>
            <GoTriangleLeft style={{color:"white",fontSize:"60px",padding:"0px",height:"40px",width:"40px",display:"flex",justifyContent:"end",alignItems:"end",position:"absolute",left:"4%"}}/>
            <div className='Message'>
           chenawa rah hta ana labssa 9eftan ,makin mawalakin lyouma ne9ssmouh
           <div className='timestamp'>10:14 AM</div>
            </div>
         </div>
         <div className="chat_div">
            <div>
            <img src="houmissa.jpeg" className="profile_pic_chat" alt="pic" />
            </div>
            <GoTriangleLeft style={{color:"white",fontSize:"60px",padding:"0px",height:"40px",width:"40px",display:"flex",justifyContent:"end",alignItems:"end",position:"absolute",left:"4%"}}/>
            <div className='Message'>
           ana nakhoud rejlin  &#128514; nsa9sikoum kifach ghandir lihoum wach nidrhoum bhal lfra9ech bl houmiss  oula ndirhoum keskso &#128514;
           <div className='timestamp'>10:14 AM</div>
            </div>
         </div>

         <div className="chat_div">
            <div>
            <img src="awicho.jpeg" className="profile_pic_chat" alt="pic" />
            </div>
            <GoTriangleLeft style={{color:"white",fontSize:"60px",padding:"0px",height:"40px",width:"40px",display:"flex",justifyContent:"end",alignItems:"end",position:"absolute",left:"4%"}}/>
            <div className='Message'>
          allah yehdik a sara rahoum gha kaydaheko &#128514;
          <div className='timestamp'>10:14 AM</div>
            </div>
         </div>


 <div className="chat_div">
            <div>
            <img src="houda.jpeg" className="profile_pic_chat" alt="pic" />
            </div>
            <GoTriangleLeft style={{color:"white",fontSize:"60px",padding:"0px",height:"40px",width:"40px",display:"flex",justifyContent:"end",alignItems:"end",position:"absolute",left:"4%"}}/>
            <div className='Message'>
          cheftkoum bhala nsito a fatayat rah ghedda cc  &#128514;
          <div className='timestamp'>10:14 AM</div>
            </div>
         </div>
         <div className="response">
         <div className='Message'>
          rejou3 allah a houda   &#128514; fatayat chi wehda teb9a tefakar houda bl calendrier hhh.
          <div className='timestamp'>10:14 AM</div>
            </div>
            <GoTriangleRight style={{color:"white",fontSize:"60px",padding:"0px",height:"40px",width:"40px",display:"flex",justifyContent:"end",alignItems:"end",position:"absolute",right:"6%"}} />
            <div>
            <img src="krimo.png" className="profile_pic_chat" alt="pic" style={{marginLeft:"16px"}} />
            </div>
         </div> */}
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
export default Navbar;

{
  /* <li className={`message ${chat.senderName === props.userData.username && "self"}`} key={index}>
{chat.senderName !== props.userData.username && <div className="avatar">{chat.senderName}</div>}
<div className="message-data">{chat.message}</div>
{chat.senderName === props.userData.username && <div className="avatar self">vous</div>}
</li> */
}
