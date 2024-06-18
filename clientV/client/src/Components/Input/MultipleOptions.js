import React from "react";
import Switch from "./Switch";
export default function MultipleOptions() {
  return (
    <div className="flex items-center justify-between pt-2">
      <span className="flex items-center mr-3">
        Autoriser plusieurs réponses
      </span>
      <Switch />
    </div>
  );
}
