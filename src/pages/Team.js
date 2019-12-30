import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import Map from "../components/Map";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../assets/css/pages/Team.scss'
import {Link} from "react-router-dom";
import TopNav from "../components/includes/TopNav";
import Office from "../components/includes/Office";

export default function Offices(props) {

  const contacts = useSelector(state => state.remoteContacts);


  let contactsList;

  if (contacts.data) {
    contactsList = <div className="contacts"> {
      contacts.data.map(contact =>
        <div className="contact">
          <p>{contact.user.name}</p>
          <p>{contact.user.email}</p>
        </div>
      )
    }
    </div>
    ;
  }

  return(
    <div className="organization">
      <div className="sidebar">
        <Office/>
        <ul>
          <li><Link to="/team">Team</Link></li>
        </ul>
      </div>

      <div className="main">
        <TopNav/>
        <div className="contacts-wrapper">
          <h2 className="title">My Team</h2>
          {contactsList}
        </div>
      </div>
    </div>
  );
}