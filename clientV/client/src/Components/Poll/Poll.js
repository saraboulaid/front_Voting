import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Response from "./Response";
import ResponseNonMultiple from "./ResponseNonMultiple";
import { IoClose } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";
import Picker from "emoji-picker-react";
import { PiSmileyLight } from "react-icons/pi";
import { pink } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

import "./Sondage.css";

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

const Poll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isMultiple, setIsMultiple] = useState(false);
  const [pollId, setPollId] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const inputRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const [emojiColor, setEmojiColor] = useState("#4a044e");

  const toggleEmojiColor = () => {
    setEmojiColor((prevColor) =>
      prevColor === "#4a044e" ? "#f8bbd0" : "#4a044e"
    );
  };

  const addEmoji = (e) => {
    if (selectedOptionIndex !== null) {
      let sym = e.unified.split("-");
      let codesArray = [];
      sym.forEach((el) => codesArray.push("0x" + el));
      let emoji = String.fromCodePoint(...codesArray);
      const newOptions = [...options];
      newOptions[selectedOptionIndex] += emoji;
      setOptions(newOptions);
    } else {
      let sym = e.unified.split("-");
      let codesArray = [];
      sym.forEach((el) => codesArray.push("0x" + el));
      let emoji = String.fromCodePoint(...codesArray);
      setQuestion(question + emoji);
    }
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
          creatorId: 1,
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
    setShowResponse(true);
    await sendQuestionToBackend();
  };

  useEffect(() => {
    console.log("showPicker initial:", showPicker);
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

  useEffect(() => {
    console.log("showPicker updated:", showPicker);
  }, [showPicker]);

  return showResponse ? (
    isMultiple ? (
      <Response id={pollId} />
    ) : (
      <ResponseNonMultiple id={pollId} />
    )
  ) : (
    <>
      <div className="sara_card">
        <span className="PickEmoji">
          {showPicker && <Picker onEmojiClick={addEmoji} />}
        </span>

        <div className="TOP bg-fuchsia-950">
          <IoClose
            onClick={() => window.close()}
            style={{ cursor: "pointer" }}
          />
          <span id="awicho">Créer un sondage</span>
        </div>
        <div>
          <div style={{ paddingLeft: "12px", paddingRight: "12px" }}>
            <div className="Ask">
              <div className="question text-lg font-semibold text-gray-600">
                Question
              </div>
              <div>
                <input
                  className="inputs"
                  type="text"
                  placeholder="Poser une question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  ref={inputRef}
                  style={{ color: emojiColor }}
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
                    backgroundColor: "red",
                  }}
                >
                  <PiSmileyLight />
                </div>
              </div>
            </div>

            <div
              className="question text-lg font-semibold text-gray-600"
              id="options_div"
              style={{ paddingLeft: "12px", marginTop: "12px" }}
            >
              Options
            </div>
            <div
              className="Options-div-conteneur"
              style={{
                height: options.length > 2 ? "80px" : "auto",
                overflowY: options.length > 2 ? "scroll" : "hidden",
                scrollbarWidth: options.length > 2 ? "thin" : "none",
                scrollbarColor: options.length > 2 ? "#888 #f1f1f1" : "auto",
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
                    }}
                  >
                    <input
                      type="text"
                      className="inputs"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      style={{ color: emojiColor }}
                    />
                    <div
                      className="emoji_icon"
                      onClick={() => {
                        setShowPicker(!showPicker);
                        toggleEmojiColor();
                        setSelectedOptionIndex(index);
                      }}
                      style={{ fontSize: "24px", color: emojiColor }}
                    >
                      <PiSmileyLight />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="top_bottom ">
              <div className="Autorisation" style={{ paddingLeft: "12px" }}>
                Autoriser plusieurs réponses
              </div>
              <div>
                <PinkSwitch
                  style={{ color: "#4a044e" }}
                  checked={isMultiple}
                  onChange={(event) => setIsMultiple(event.target.checked)}
                />
              </div>
            </div>

            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                float: "right",
                cursor: "pointer",
              }}
              onClick={afterSubmit}
            >
              <IoSendSharp style={{ color: "white", fontSize: "20px" }} />
            </div>
          </div>
        </div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Poll;
