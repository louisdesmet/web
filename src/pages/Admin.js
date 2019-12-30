import React, { useState } from "react";
import Timetable from "../components/Timetable";

import '../assets/css/pages/Admin.scss'
import TopNav from "../components/includes/TopNav";
import Office from "../components/includes/Office";

export const Admin = (props) => {

  // Detect all clicks on the document
  document.addEventListener("click", function(event) {
    // If user clicks inside the element, do nothing
    if (event.target.closest(".account")) return;
    let box = document.querySelector(".account ul");
    // If user clicks outside the element, hide it!
    if(box) {
      box.style.display = 'none';
    }

  });

  return (
    <div className="admin">
      <div className="sidebar">
        <Office/>
      </div>
      <div className="main">
        <TopNav/>
        <Timetable/>
      </div>
    </div>
  );
};

export default Admin;