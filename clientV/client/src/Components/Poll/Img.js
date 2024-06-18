import React from "react";
import Avatar from "@mui/material/Avatar";

export default function Img(props) {
  return (
    <div>
      <div
        style={{
          paddingLeft: "15px",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <Avatar
            sx={{
              bgcolor: "#4a044e",
              width: 38,
              height: 38,
              marginRight: "10px",
            }}
            alt="Rokia Bouirig"
            src="/static/images/avatar/1.jpg"
          />
        </div>
        <div className="flex flex-col space-y" style={{ color: "#4a044e" }}>
          <div style={{ maxWidth: "180px" }}>{props.username}</div>
          <div>{props.dateF}</div>
        </div>
      </div>
    </div>
  );
}
