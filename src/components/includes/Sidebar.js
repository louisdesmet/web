import {Link} from "react-router-dom";
import React from "react";
import '../../assets/css/components/includes/Sidebar.scss'
import Office from "./Office";

export const Sidebar = props => {

  return (
    <div className="sidebar">
      <Office/>
      <ul>
        <li><Link to="/subjects">Subjects</Link></li>
        <li><Link to="/offices">Offices</Link></li>
        <li><Link to="/employees">Employees</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;