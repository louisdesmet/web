import React from "react";
import {useSelector} from "react-redux";
import '../assets/css/pages/Team.scss'
import {Link} from "react-router-dom";
import TopNav from "../components/includes/TopNav";
import Office from "../components/includes/Office";

export default function Offices(props) {

  const contacts = useSelector(state => state.remoteContacts);
  const contactsList = contacts.data ? (<div className="contacts"> {
    contacts.data.map(contact =>
      <div className="contact">
        <p>{contact.user.name}</p>
        <p>{contact.user.email}</p>
      </div>
    )
  }
  </div>) : null;

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