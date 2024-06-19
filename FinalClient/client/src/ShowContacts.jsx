import React from 'react';
import { VscAdd } from "react-icons/vsc";

function Showcontacts({ userBackendData, setSelectedConversation, selectedConversation, groupeselected,setleft_side }) {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id_user: selectedConversation,
      id_groupe: groupeselected.grpid
    };

    try {
      const response = await fetch('http://localhost:8888/AddToGroupe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add user to group');
      }
      console.log('User added to group successfully');
      setleft_side('SEE_MEMBERS');
     

      // Reset form fields or handle success as needed
    } catch (error) {
      console.error('Error adding user to group:', error.message);
      alert('Error adding user to group. Please try again.');
    }
  };

  return (
    <>
      {userBackendData.contactes && (
        <div>
          {userBackendData.contactes.map((member, index) => (
            <div
              className={`conversation conversation-margin ${selectedConversation === member.id ? 'clickedconversation' : ''}`}
              key={index}
              onClick={() => {
                setSelectedConversation(member.id);
              }}>
              <span style={{ position: "relative" }}>
                <img src={member.imageName} className="profile_pic_chat" alt="pic" />
                {member.online === true ? <span className='online'></span> : ''}
              </span>
              <div style={{ display: "inline-block" }}>
                <div><span className='name'> {member.firstName + " " + member.lastName}</span></div>
                <div><span className='statut'>{member.functionality}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedConversation && (
        <div style={{
          textAlign: "end", backgroundColor: "#16a34a", width: "35px", height: "35px", zIndex: "300",
          position: "absolute", bottom: "20%", right: "10%", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "8px"
        }} onClick={handleSubmit}>
          <VscAdd style={{ color: "white" }} />
        </div>
      )}
    </>
  );
}

export default Showcontacts;
