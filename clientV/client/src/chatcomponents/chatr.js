import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import Navbar from "../ChatRoom";
// import users from '../Conversation';

// const last = () => {
//     fetch("http://localhost:8888/Enter/1")
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json(); // Parse the response body as JSON
//         })
//         .then(data => {
//             // Here you have access to the actual data returned by the server
//             console.log("*********", data);
//             console.log("** userId : "+data.user.id);
//             // Do whatever you need to do with the data
//         })n
//             console.error("*********", error.message);
//         });
// }

var stompClient = null;
// localStorage.removeItem(usersinfo);
// let usersinfo='';
// localStorage.setItem('usersinfo',usersinfo);

function ChatRoom(props) {
  // console.log("result : "+props.userBackendData.user.firstName);
  // localStorage.removeItem('usersinfo');

  const storedUsers = localStorage.getItem("usersinfo");
  const pubchat = [
    {
      sendername: "halouma",
      message: " wa fin al 3echrane",
    },
  ];
  const initialisation = storedUsers
    ? JSON.parse(storedUsers)
    : [
        {
          user_id: "1",
          profile_pic: "member-1.png",
          username: "Sanae sahih",
          Service: "Directeur General",
          Online: "true",
        },
        {
          user_id: "5",
          profile_pic: "",
          username: "malik mouahidin",
          Service: "IT",
          Online: "false",
        },
      ];
  localStorage.removeItem("publicChats");

  const publicChatsstored = localStorage.getItem("publicChats");
  const pubchatinitialisation = publicChatsstored
    ? JSON.parse(publicChatsstored)
    : [];

  const [users, SetUsers] = useState(initialisation);
  localStorage.setItem("usersinfo", JSON.stringify(users));

  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState(pubchatinitialisation);
  const [ProfilClicked, SetProfilClicked] = useState(false);

  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    id: props.userBackendData.user.id,
    username: props.userBackendData
      ? props.userBackendData.user.firstName +
        " " +
        props.userBackendData.user.lastName
      : "",
    receivername: "",
    connected: true,
    gender: "M",
    img: props.userBackendData.user.imageName,
    message: "",
    receiverImg: "",
  });

  const userContacts = useState(props.userBackendData.contactes);
  const userGroups = useState(props.userBackendData.groupes);

  console.log("user contacts are : " + JSON.stringify(userContacts));
  console.log("user GROUPES are : " + JSON.stringify(userGroups[0]));

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    console.log("/user/" + userData.username + "/private");
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    // stompClient.subscribe('/user/'+props.userBackendData.id+'/private', onPrivateMessage);
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };
  let count = 6;
  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        //        let new_user={"user_id": ` ${count}`,
        //        "profile_pic" :"member-3.png",
        //    "username":payloadData.senderName,
        //     "Service":"employee",
        //     "Online":true};
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
          //                     SetUsers([...users,new_user]);
          //    let usersinfo= JSON.parse(localStorage.getItem('usersinfo'))!==null ?JSON.parse(localStorage.getItem('usersinfo')) : [] ;
          //    usersinfo.push(new_user);
          //    localStorage.setItem("usersinfo",JSON.stringify(usersinfo));

          console.log("mn JOIN message :: ", privateChats);
        }
        count++;
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        console.log(" WA L3ADAW HHHH  : ", publicChats);
        break;
      case "SONDAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        console.log(" Sondage wsalni  : ", publicChats);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.has(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const gettimestamp = () => {
    var currentDate = new Date();

    // Get the hours and minutes
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();

    // Format the hours and minutes with leading zeros if necessary
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;

    // Concatenate hours and minutes with a colon
    var timeString = hours + ":" + minutes;

    // Display the formatted time
    return timeString;
  };
  const sendValue = () => {
    // Get the current date and time
    let timestamp = gettimestamp();
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
        date: timestamp,
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendValueSondage = (sondage) => {
    // Get the current date and time
    let timestamp = gettimestamp();
    console.log("oumy :" + JSON.stringify(sondage.options));
    if (stompClient) {
      var chatSondage = {
        id: null,
        senderName: userData.username,
        sender_id: userData.id,
        question: sondage.question,
        options: sondage.options,
        ismultiple: sondage.ismultiple,
        status: "SONDAGE",
        date: timestamp,
      };
      console.log(chatSondage);
      stompClient.send("/app/sondage", {}, JSON.stringify(chatSondage));
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      let timestamp = gettimestamp();
      var chatMessage = {
        senderName: userData.username,
        receiverName: userData.receivername,
        message: userData.message,
        status: "MESSAGE",
        date: timestamp,
      };
      console.log("message sent is : " + JSON.stringify(chatMessage));
      const receiverChats = privateChats.get(userData.receivername);
      if (receiverChats) {
        // Create a new array to avoid mutating state directly
        const updatedChats = [...receiverChats, chatMessage];
        // Update privateChats state using a functional approach
        setPrivateChats(
          (prevPrivateChats) =>
            new Map(prevPrivateChats.set(userData.receivername, updatedChats))
        );
      } else {
        console.log("CONNECTION CLOSED");
        setPrivateChats(
          (prevPrivateChats) =>
            new Map(prevPrivateChats.set(userData.receivername, [chatMessage]))
        );
      }

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  // Other component logic here

  useEffect(() => {
    registerUser();
  }, []);

  return (
    <div className="container">
      {userData.connected ? (
        <Navbar
          users={users}
          messages={pubchat}
          userData={userData}
          setUserData={setUserData}
          sendValue={sendValue}
          sendValueSondage={sendValueSondage}
          publicChats={publicChats}
          privateChats={privateChats}
          sendPrivateValue={sendPrivateValue}
          userContacts={userContacts}
          userGroupes={userGroups[0]}
        ></Navbar>
      ) : (
        ""
        // <div className="register">
        //     <input
        //         id="user-name"
        //         placeholder="Enter your name"
        //         name="userName"
        //         value={userData.username}
        //         onChange={handleUsername}
        //         margin="normal"
        //       />
        //          <div style={{"display":"flex","justifyContent":"space-between"}}>
        //          <label>
        //              <input type="radio" name="gender" value={userData.gender} onClick={()=>setUserData({...userData,gender:"F"})} />
        //                                         Female
        //         </label>
        //         <label>
        //              <input type="radio" name="gender" value="male" onClick={()=>setUserData({...userData,gender:"M"})} />
        //                                         Male
        //         </label>
        //             </div>
        //            <div>
        //            <input type="file" accept="image/*"/>
        //            </div>
        //       <button type="button" id='connect_btn' onClick={registerUser}>
        //             connect
        //       </button>

        // </div>
      )}
    </div>
  );
}

export default ChatRoom;
