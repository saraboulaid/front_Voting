import React, { useState } from "react";
import PieChart from "./PieChart";
import { IoClose } from "react-icons/io5";
import Optioni from "./Optioni";

import "./VoirDetail.css";

export default function VoirDetail() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={`left_side ${isVisible ? "visible" : "hidden"}`}
      style={{ overflowY: "scroll", scrollbarWidth: "thin" }}
    >
      <div
        className="d-flex align-items-center space-x-6"
        style={{ height: "8%", backgroundColor: "#fdf2f8" }}
      >
        <div style={{ paddingLeft: "7%" }} onClick={toggleVisibility}>
          <IoClose size={22} style={{ color: "gray", cursor: "pointer" }} />
        </div>
        <div style={{ color: "gray" }}>Détails du sondage</div>
      </div>
      <div className="grid grid-cols-1 divide-y-4 divide-rose-100">
        <div
          style={{
            color: "#4a044e",
            padding: "5%",
            paddingLeft: "9%",
            paddingTop: "9px",
            marginTop: "5px",
            fontSize: "14px",
            backgroundColor: "yellow",
          }}
        >
          Question
          <div style={{ fontSize: "10px", paddingTop: "9px" }}>
            Membres ayant voté : 2 sur 20
          </div>
        </div>

        <div style={{ padding: "5%" }}>
          <PieChart />
        </div>
        <Optioni />
      </div>
    </div>
  );
}
