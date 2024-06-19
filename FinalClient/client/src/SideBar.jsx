import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import entreprisepic from './assets/company.jpg';
import { IoMdNotifications } from "react-icons/io";
import { IoMdChatbubbles } from "react-icons/io";
import { HiMiniHome } from "react-icons/hi2";
import elon from'./assets/elon.jpg';


function SideBar(props)
{
 return(<>
    <div className='sidebar'>
        <div style={{height:"30px",marginTop:"28px"}}>
        <img id='company' src={entreprisepic} style={{textAlign:"center",width:"40px",borderRadius:"8px"}} alt="img" />
        </div>
           
            
                <button className="btn-sideBar">
                <div >
                    <span className="icon_container">
                    <HiMiniHome className="icon" />
                    </span>
                
            <span className='title'>Acceuil</span>
            </div>
                </button>
        <button className="btn-sideBar">
        <div onClick={()=>{props.SetProfilClicked(false);
props.setleft_side('WELCOME');
        }
        }>
            <span className="icon_container">
            <IoMdChatbubbles  className="icon" />
            </span>
           <span className='title' > Messages Directs</span>
            </div>
        </button>
          <button className="btn-sideBar">
          <div>
            <span className="icon_container">
            <FaRegCalendarAlt className="icon" />
            </span>
         
            <span className='title'>Reunions</span>
           </div></button>  
{/* <button className="btn-sideBar">
          <div>
            <span className="icon_container">
            <IoIosStats  className="icon" />
            </span>
         <span className='title'>Sondage</span>
           </div></button> */}
            <button className="btn-sideBar">
          <div>
            <span className="icon_container">
            <IoMdNotifications  className="icon" />
            </span>
         <span className='title'>Notifications</span>
           </div></button>
           <div style={{height:'100%',justifyContent:'end',position:'relative'}} onClick={()=>{

props.SetProfilClicked(true);
props.setleft_side('PROFILE');
           }
            
           }>
      <span style={{position:"relative"}}>
      <img src={props.userdata.img}  style={{width:"40px",borderRadius:"50%"}}alt="profile" />
      <span style={{backgroundColor:'rgb(0, 200, 0)',position:'absolute',width:"10px",height:"10px",borderRadius:"50%",border:"2px solid white",bottom:"0px",right:"2px"}}></span>
      </span>     
    
               
               <span className="title">Profile</span>
            
            </div>

            

        </div></>);
}
export default SideBar