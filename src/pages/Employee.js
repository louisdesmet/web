import React from "react";
import {useParams} from "react-router-dom";
import TopNav from "../components/includes/TopNav";
import Sidebar from "../components/includes/Sidebar";
import {faUser, faBuilding, faSitemap, faCog} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../assets/css/pages/Employee.scss';
import {useSelector} from "react-redux";

export default function Employee(props) {

  const contacts = useSelector(state => state.remoteContacts);
  const { id } = useParams();
  const contact = contacts.data ? contacts.data.find(contact => contact.id === parseInt(id)) : null;

  const officesList = contact.offices ? (
    <ul> {
      contact.offices.map(office =>
        <li key={office.id}>
          <div>
            <FontAwesomeIcon icon={faBuilding} color="#2C3E50" size="lg"/>
          </div>
          <div>
            <p>{office.name}</p>
            <p>{office.location.street}</p>
            <p>{office.location.postal} {office.location.city}</p>
          </div>
        </li>
      )
    }
    </ul>
  ) : null;

  function isRole(roles, name) {
    return roles.find(role => role.name === name);
  }

  return(
    <div className="organization">
    <Sidebar/>

      <div className="main">
        <TopNav/>
        <div className="employee-wrapper">
          <h2 className="title">{contact.user.name}</h2>
          <div className="wrapper">
            <div className="details">
              <div className="icons">
                <div className={(isRole(contact.roles, 'Contact') ? 'selected' : '')}>
                  <FontAwesomeIcon icon={faUser}/>
                </div>
                <div className={(isRole(contact.roles, 'Office manager') ? 'selected' : '')}>
                  <FontAwesomeIcon icon={faBuilding}/>
                </div>
                <div className={(isRole(contact.roles, 'Central planner') ? 'selected' : '')}>
                  <FontAwesomeIcon icon={faSitemap}/>
                </div>
                <div className={(isRole(contact.roles, 'Admin') ? 'selected' : '')}>
                  <FontAwesomeIcon icon={faCog}/>
                </div>
              </div>
              <div className="general">
                <label>Email</label>
                <input defaultValue={contact.user.email}/>
              </div>
            </div>
            <div className="offices">
              <h2>Assigned offices</h2>
              {officesList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}