import { FaUserFriends } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function AddgroupForm(props) {
  const [isHover, setIsHover] = useState(false);
  const fileInputRef = useRef(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [task, setTask] = useState('');

  const formSubmittedRef = useRef(false);

  useEffect(() => {
    if (formSubmittedRef.current) {
      const fetchGroupes = async () => {
        try {
          console.log("userid is " + props.userid);
          const response = await axios.get(`http://localhost:8888/Enter/${props.userid}`);
    
          const { groupes } = response.data; // Destructure groupes from response.data
    
          props.setGroupes(groupes); // Update state with groupes array
          props.setleft_side('WELCOME');
        } catch (error) {
          console.error("Error fetching groupes:", error);
        }
      };
    
      fetchGroupes();
    }
  }, [formSubmittedRef.current, props.userid, props.setGroupes, props.setleft_side]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id_user',props.userid);
    formData.append('name', name);
    formData.append('task', task);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('http://localhost:8888/AddGroupe', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
      
        // Clear form inputs after successful submission
        setName('');
        setTask('');
        setFile(null);
        setIsFileSelected(false);
        
        // Update formSubmittedRef to trigger useEffect
        formSubmittedRef.current = true;
        
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsFileSelected(true);
      console.log("Selected file:", selectedFile);
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "38vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: isHover ? "#44403c" : "#A9A9A9",
            height: "34vh",
            width: "17vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            cursor: "pointer"
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {isFileSelected ? (
            <img src={URL.createObjectURL(file)} alt="profile pic" style={{ height: "35vh", width: "35vw", borderRadius: "50%" }} />
          ) : isHover ? (
            <IoCameraOutline style={{ height: "15vh", width: "15vw", color: "#E8E9EB" }} />
          ) : (
            <FaUserFriends style={{ height: "15vh", width: "15vw", color: "#E8E9EB" }} />
          )}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        name="file"
      />
      <form onSubmit={handleSubmit}>
        <div className="ADDGROUPE_div">
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="entrer le nom du groupe"
            name="name"
          />
        </div>
        <div className="ADDGROUPE_div">
          <label htmlFor="task">Tâche :</label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="entrer la tâche de l'équipe"
            name="task"
          />
        </div>
        <div style={{ height: "20vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <input
            type="submit"
            style={{ padding: "8px", borderRadius: "8px", fontFamily: "cursive", color: "white", backgroundColor: "rgb(22, 163, 74)" }}
            value="Créer"
          />
        </div>
      </form>
    </>
  );
}

export default AddgroupForm;
