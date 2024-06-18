import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { PiSmileyLight } from "react-icons/pi";

const TextInputWithEmojiPicker = ({ onEmojiClick, ...props }) => {
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (_, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);

    if (onEmojiClick) {
      onEmojiClick(emojiObject.emoji);
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="relative cursor-pointer text-slate-500"
        onClick={() => setShowPicker((val) => !val)}
        style={{ fontSize: "24px" }}
      >
        <PiSmileyLight
          style={{ backgroundColor: "yellow", display: "inline-block" }}
        />
      </div>
      {showPicker && (
        <Picker
          pickerStyle={{ width: "100%" }}
          onEmojiClick={handleEmojiClick}
          style={{
            position: "absolute",
            top: "30px",
            left: "0",
            zIndex: "1000px",
            backgroundColor: "rgba(0, 0, 0,1)",
            marginRight: "-16px",
          }}
        />
      )}
    </div>
  );
};

export default TextInputWithEmojiPicker;
