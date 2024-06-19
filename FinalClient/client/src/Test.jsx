import React, { useState, useEffect } from "react";
import ChatRoom from "./chatcomponents/chatr";
import axios from "axios";
// import ChatRoom from "./ChatRoom";
function Test(props) {
  const [userBackendData, setuserBackendData] = useState(null); // State to store fetched user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8888/Enter/${props.userid}`
        );
        // Parse JSON data
        setuserBackendData(response.data);
        console.log("1234" + JSON.stringify(response.data));

        // Update state with parsed JSON data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run the effect only once

  return userBackendData ? (
    <ChatRoom userBackendData={userBackendData} />
  ) : (
    <h1>Loading...</h1>
  );
}
export default Test;

/*
import React, { useState, useEffect } from "react";
import ChatRoom from "./chatcomponents/chatr";
import axios from 'axios';

function Test() {
  const [userData, setUserData] = useState(null); // State to store fetched user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8888/Enter/1");
   // Parse JSON data
        setUserData(response.data);
        console.log(JSON.stringify(response.data));
         // Update state with parsed JSON data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run the effect only once

  // Render ChatRoom component when userData is available
  return userData ? <ChatRoom userData={userData} /> : null;
}

export default Test;

*/
