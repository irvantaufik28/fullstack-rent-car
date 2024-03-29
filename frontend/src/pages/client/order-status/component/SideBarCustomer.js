// import './styles/navbar.css'
import sidebar_logo from "../../../../assets/icon/sidebar_logo.svg"

import {
  FaTh,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
export default function SideBarCustomer({ children }) {

    const menuItem = [
      {
        path: "/",
        name: "home",
        icon: <FaTh />,
      },
      {
        path: "/order",
        name: "order",
        icon: <FaRegChartBar />,
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
          <span className="icon-customer-sidebar">{item.icon}</span>
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
