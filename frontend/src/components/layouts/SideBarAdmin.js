// import React, { useState } from "react";
import './styles/navbar.css'
// import AdminCarListPage from "../../pages/admin/car/AdminCarListPage";
import sidebar_logo from "../../assets/icon/sidebar_logo.svg"

import {
  FaTh,
  FaCartArrowDown,
  FaCar
} from "react-icons/fa";

import {
  HiUsers
} from "react-icons/hi"
import { NavLink } from "react-router-dom";
export default function SideBarAdmin({ children }) {
    const menuItem = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: <FaTh />,
      },
      {
        path: "/admin/carlist",
        name: "car",
        icon: <FaCar/>,
      },
      {
        path: "/admin/order",
        name: "order",
        icon: <FaCartArrowDown/>,
      },
      {
        path: "/customer",
        name: "customer",
        icon: <HiUsers />,
      },
    ];
  return (

<>

<div className="ant-sidenav">
   <img src={sidebar_logo} alt="brand little" className="ant-little-brand img-fluid" /> 
   <ul className="ant-list-clip">
  {menuItem.map((item, index) => {
    return (
      <li key={index}>
        <NavLink to={item.path}>
          <span className="icon-ant">{item.icon}</span>
          {item.name}
        </NavLink>
      </li>
      
    );
  })}
 

</ul>
</div>


<div className="container-fluid">
  <div className="row">

    <div className="col ant-content d-flex align-items-stretch">
   {children}
    </div>
    <div>
      
    </div>
  </div>
</div>

</>    
  )
}
