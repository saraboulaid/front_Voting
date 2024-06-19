import React, { useState, useEffect } from "react";
import { MdWifiCalling3 } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";

function Room_bar(props)
{

   
    return (
<>


<div className='Private-discussion-navbar conversation ' 
style={{marginTop:"0px"}} 
 onClick={()=>props.setleft_side('INFO')}>
              <img src={props.groupeselected.img} className="profile_pic_chat small_profil" alt="pic" />
            
             <div className='contact-name'>{props.groupeselected.username}</div>
             <div style={{width:"50vw",display:"flex",justifyContent:"end"}}>

             <div className='right_camera_call'> <IoMdVideocam style={{"marginRight":"16px"}} />
            <MdWifiCalling3 style={{"marginRight":"16px"}}/>
            <SlOptionsVertical /></div>
             </div>
           
          
              </div>


</>


    );
}

export default Room_bar;