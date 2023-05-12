import React, { useState } from "react";
import './styles/navbar.css'
import AdminCarListPage from "../../pages/admin/car/AdminCarListPage";
import sidebar_logo from "../../assets/icon/sidebar_logo.svg"

import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Button, Modal, Offcanvas } from "react-bootstrap";
export default function SideBarAdmin({ children }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: <FaTh />,
      },
      {
        path: "/admin/carlist",
        name: "car",
        icon: <FaUserAlt />,
      },
      {
        path: "/order",
        name: "order",
        icon: <FaRegChartBar />,
      },
      {
        path: "/customer",
        name: "customer",
        icon: <FaCommentAlt />,
      },
    ];
  return (
    
// <>
// 	{/* <!-- SIDEBAR --> */}
// 	{/* <div classNameName="container-dashboard">
//         <div style={{ width: isOpen ? "200px" : "50px" }} classNameName="sidebar">
//           <div classNameName="top_section">
//             <h1 style={{ display: isOpen ? "block" : "none" }} classNameName="logo-sidebar">
//               Logo
//             </h1>
//             <div
//               style={{ marginLeft: isOpen ? "50px" : "0px" }}
//               classNameName="bars"
//             >
//               <FaBars onClick={toggle} />
//             </div>
//           </div>
//           {menuItem.map((item, index) => (
//             <NavLink
//               to={item.path}
//               key={index}
//               classNameName="link"
//             >
//               <div classNameName="icon">{item.icon}</div>
//               <div
//                 style={{ display: isOpen ? "block" : "none" }}
//                 classNameName="link_text"
//               >
//                 {item.name}
//               </div>
//             </NavLink>
//           ))}
//         </div>
       
//             {children}
        
//     </div> */}
// </>
<>

<div className="ant-sidenav">
   <img src={sidebar_logo} alt="brand little" className="ant-little-brand img-fluid" /> 
   <ul className="ant-list-clip">
  {menuItem.map((item, index) => {
    return (
      <li key={index}>
        <NavLink to={item.path}>
          <span className="icon">{item.icon}</span>
          {item.name}
        </NavLink>
      </li>
      
    );
  })}
 

</ul>
</div>


<div className="container-fluid">
  <div className="row">

    {/* <div className="ant-siderside animate__animated">
      <ul className="ant-list-clip">
        <li>
          <a href="#"><i className="fa"></i> Adult</a>
        </li>
        <li>
          <a href="#"><i className="fa"></i> Asia</a>
        </li>
      </ul>
    </div> */}
    <div className="col ant-content d-flex align-items-stretch">
   {children}
    </div>
  </div>
</div>

</>    
  )
}
