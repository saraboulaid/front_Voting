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
        <div onClick={()=>props.SetProfilClicked(false)}>
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
           <div style={{height:'100%',justifyContent:'end',position:'relative'}} onClick={()=>
            props.SetProfilClicked(true)
           }>
           
    <img src={props.userdata.img}  style={{width:"40px",borderRadius:"50%"}}alt="profile" />
               
               <span className="title">Profile</span>
               <span style={{backgroundColor:'rgb(0, 200, 0)',position:'absolute',width:'10px',height:'10px',fontSize:'10px',top:'62%',right:'8px',border:'2px solid white',borderRadius:'50%'}}></span>
            </div>

            

        </div></>);
}
export default SideBar