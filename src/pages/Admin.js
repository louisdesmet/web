import React, {useState} from "react";
import Timetable from "../components/Timetable";

import '../assets/css/pages/Admin.scss'
import TopNav from "../components/includes/TopNav";
import Office from "../components/includes/Office";

export const Admin = (props) => {

  const [showAccount, setShowAccount] = useState(false);

  document.addEventListener("click", function(event) {
    // If user clicks inside the element, do nothing
    if (event.target.closest(".account")) return;
    setShowAccount(false);
  });

  return (
    <div className="admin">
      <div className="sidebar">
        <Office/>
      </div>
      <div className="main">
        <TopNav show={showAccount} setShow={() => setShowAccount(true)} />
        <Timetable/>
      </div>
    </div>
  );
};

export default Admin;