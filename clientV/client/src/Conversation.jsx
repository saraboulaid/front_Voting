import { useState } from "react";

function Conversation(props) {
    let users = props.users;
console.log("content "+JSON.stringify(props.userContacts[0]) );

    const [selectedConversation, setSelectedConversation] = useState(null);
    // const conversations = users.map((user, index) => (
    //     <div
    //         className={`conversation conversation-margin ${selectedConversation === user.username ? 'clickedconversation' : ''}`}
    //         onClick={() => {
    //             props.setischatroom(false);
    //             props.setUserData({ ...props.userData, receivername: user.username });
    //             setSelectedConversation(user.username);
    //         }}
    //     >
    //         <span style={{ position: "relative" }}>
    //             <img src={`member-${index + 1}.png`} className="profile_pic_chat" alt="pic" />
    //             {user.Online === "true" && <span className='online'></span>}
    //         </span>
    //         <div style={{ display: "inline-block" }}>
    //             <div><span className='name'>{user.username}</span></div>
    //             <div><span className='statut'>{user.Service}</span></div>
    //         </div>
    //     </div>
    // ));

    const usersArray = props.userContacts[0];

    const conversations =usersArray.map((user, index) => (
        <div
            className={`conversation conversation-margin ${selectedConversation === user.id? 'clickedconversation' : ''}`}
            onClick={() => {
                props.setischatroom(false);
                props.setUserData({ ...props.userData, receivername: user.firstName+" "+user.lastName,receiverImg:user.imageName});
                setSelectedConversation(user.id);
            }}
        >
            <span style={{ position: "relative" }}>
                <img src={user.imageName} className="profile_pic_chat" alt="pic" />
                {user.online===true ? <span className='online'></span>:''}
                {/* <span className='online'></span> */}
            </span>
            <div style={{ display: "inline-block" }}>
                <div><span className='name'>{user.firstName+" "+user.lastName}</span></div>
                <div><span className='statut'>{user.functionality}</span></div>
            </div>
        </div>
    ));
    console.log(conversations);

    return (
        <>
            {conversations}
        </>
    );
}

export default Conversation;
