import React, { useState, useEffect } from 'react';
import axios from 'axios';


function See_members(props) {
  const [memberInfo, setmemberInfo] = useState(null);

  useEffect(() => {
    const fetchmemberInfo = async () => {
      try {
        console.log(`http://localhost:8087/usersGRP/${props.groupeselected.grpid}`);
        const response = await axios.get(`http://localhost:8087/usersGRP/${props.groupeselected.grpid}`);
        console.log("see members in grp: " + JSON.stringify(response.data));
        setmemberInfo(response.data); // Update state with parsed JSON data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchmemberInfo();

  }, [props.groupeselected.grpid]); // Dependency array to re-fetch if grpid changes

  return (
    <>
      
      {memberInfo && (
        <div>
          {memberInfo.map((member, index) => (
          
          
          <div
          className={`conversation conversation-margin ${props.selectedConversation === member.id? 'clickedconversation' : ''}`}
          onClick={() => {
              props.setischatroom(false);
              props.setUserData({ ...props.userData, receivername: member.firstName+" "+member.lastName,receiverImg:member.imageName});
             props.setSelectedConversation(member.id);
             console.log(" user image clicked is : "+member.imageName);
          }}
      >
          <span style={{ position: "relative" }}>
              <img src={member.imageName} className="profile_pic_chat" alt="pic" />
              {member.online===true ? <span className='online'></span>:''}
              {/* <span className='online'></span> */}
          </span>
          <div style={{ display: "inline-block" }}>
              <div><span className='name'>{member.id===props.userData.id? "vous ": member.firstName+" "+member.lastName}</span></div>
              <div><span className='statut'>{member.functionality}</span></div>
          </div>
      </div>   
          
          
          
       
          ))}
        </div>
      )}
    </>
  );
}

export default See_members;
