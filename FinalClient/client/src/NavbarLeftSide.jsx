import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
function NavbarLeftSide()
{
return(<div className="left-side">
            <FaArrowLeft style={{ color: 'rgb(207, 200, 207)', fontSize: '14px',marginLeft: '8px' }} /> {/* Left arrow */}
      <FaArrowRight style={{ color: 'rgb(130, 74, 130)', fontSize: '14px',marginLeft: '10px' }} /> {/* Right arrow */}
      <i className="material-icons" style={{ color: 'rgb(207, 200, 207)',marginLeft: '8px',marginRight:'8px',fontSize:'18px' }}
            >access_time</i>
            </div>);
}
export default NavbarLeftSide