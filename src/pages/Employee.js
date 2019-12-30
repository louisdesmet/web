import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {faTimes, faUser, faBuilding, faSitemap, faCog} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BrowserRouter as Router, Link} from "react-router-dom";
import '../assets/css/pages/Employee.scss';
import TopNav from "../components/includes/TopNav";
import Office from "../components/includes/Office";
import PrivateRoute from "../PrivateRoute";
import Sidebar from "../components/includes/Sidebar";

export default function Employee(props) {

  const {contact} = props.location.state;

  let officesList;

  if (contact.offices) {
    officesList = <ul> {
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
    ;
  }



  function isContact(roles) {
    let found = null;
    roles.forEach(function (role) {
      if(role.name === 'Contact') {
        found = true;
      }
    });
    if (found) {
      return found;
    } else {
      return false;
    }
  }

  function isOfficeManager(roles) {

    let found = null;
    roles.forEach(function (role) {
      if(role.name === 'Office manager') {
        found = true;
      } else {

      }
    });
    if (found) {
      return found;
    } else {
      return false;
    }
  }

  function isCentralPlanner(roles) {
    let found = null;
    roles.forEach(function (role) {
      if(role.name === 'Central planner') {
        found = true;
      }
    });
    if (found) {
      return found;
    } else {
      return false;
    }
  }

  function isAdmin(roles) {
    let found = null;
    roles.forEach(function (role) {
      if(role.name === 'Admin') {
        found = true;
      }
    });
    if (found) {
      return found;
    } else {
      return false;
    }
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
                <div className={(isContact(contact.roles) ? 'selected' : '')}>
                  <FontAwesomeIcon icon={faUser} color={isContact(contact.roles)}/>
                </div>
                <div className={(isOfficeManager(contact.roles) ? 'selected' : '')}>
                  <FontAwesomeIcon icon={faBuilding} color={isOfficeManager(contact.roles)}/>
                </div>
                <div className={(isCentralPlanner(contact.roles) ? 'selected' : '')}>
                  <FontAwesomeIcon icon={faSitemap} color={isCentralPlanner(contact.roles)}/>
                </div>
                <div className={(isAdmin(contact.roles) ? 'selected' : '')}>
                  <FontAwesomeIcon icon={faCog} color={isAdmin(contact.roles)}/>
                </div>
              </div>
              <div className="general">
                <label>Email</label>
                <input value={contact.user.email}/>
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