import React from "react";

export default function Switch() {
  return (
    <div>
      <label
        htmlFor="check"
        className="bg-gray-300 relative w-14 h-7 rounded-full cursor-pointer"
      >
        <input type="checkbox" id="check" className="sr-only peer" />
        <span className="w-5 h-5 bg-gray-600 absolute rounded-full left-1 top-1/2 transform -translate-y-1/2 peer-checked:bg-black peer-checked:left-7 peer-checked:-translate-y-1/2 transition-all duration-200"></span>
      </label>
    </div>
  );
}
