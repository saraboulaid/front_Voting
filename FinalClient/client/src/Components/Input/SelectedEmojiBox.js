import React from "react";

const SelectedEmojiBox = ({ selectedEmoji }) => {
  return (
    <div className="absolute right-0 top-0 mt-2 mr-2">
      {selectedEmoji && (
        <span className="text-xl" role="img" aria-label="selected-emoji">
          {selectedEmoji}
        </span>
      )}
    </div>
  );
};

export default SelectedEmojiBox;
