import React from "react";
import '../../assets/css/components/includes/Sidebar.scss'
import Office from "./Office";

export const Sidebar = props => {

  return (
    <div className="sidebar">
      <Office/>
    </div>
  );
};

export default Sidebar;