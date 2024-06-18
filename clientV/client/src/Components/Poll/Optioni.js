import React, { useState, useEffect } from "react";
import { IoMdStar } from "react-icons/io";
import Img from "./Img";
import { formatDate } from "./dateFormatter";
export default function Optioni(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const newCount = await props.getCount();
      setCount(newCount);
    };

    fetchData();
  }, [props.getCount]);

  // Générer dynamiquement les composants Img en fonction de count
  const imgComponents = [];
  for (let i = 0; i < count; i++) {
    imgComponents.push(
      <Img key={i} username={props.user_name} dateF={formatDate(props.dateF)} />
    );
  }

  return (
    <div
      className="flex flex-col space-y-1"
      style={{
        paddingBottom: "18px",
        paddingTop: "4px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#4a044e",
          padding: "5%",
          paddingLeft: "9%",
          fontSize: "14px",
        }}
      >
        <div style={{ maxWidth: "174px" }}>{props.option.text}</div>
        <div
          style={{
            width: "50px",
            height: "auto",
            paddingLeft: "3px",
            fontSize: "10px",
            display: "flex",
            justifyContent: "center", // Aligner le contenu sur la droite
            color: "#4a044e",
            alignItems: "center",
            borderRadius: "3px",
            marginRight: "0.25rem",
            backgroundColor: "#fae8ff",
          }}
        >
          <div style={{ color: "#4a044e" }}>{count}</div>
          <div>vote</div>
          <IoMdStar />
        </div>
      </div>
      {imgComponents} {/* Affichage des composants Img générés */}
    </div>
  );
}
