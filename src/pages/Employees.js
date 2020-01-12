import React, {useState} from "react";
import {useSelector} from "react-redux";
import {faTimes, faUser, faBuilding, faSitemap, faCog} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import '../assets/css/pages/Employees.scss'
import TopNav from "../components/includes/TopNav";
import Sidebar from "../components/includes/Sidebar";

export default function Employees(props) {

  const [email, setEmail] = useState('');
  const [newSubjectModal, setNewSubjectModal] = useState(false);

  const contacts = useSelector(state => state.remoteContacts);

  const contactList = contacts.data ? (
    <div className="employees">
      {
        contacts.data.map(contact =>
          <Link key={contact.id} className="employee" to={"/employee/"+contact.id}>
            <p>{contact.user.name}</p>
            <p>{contact.user.email}</p>
            <div className="icons">
              <div>
                <FontAwesomeIcon icon={faUser} color={isContact(contact.roles)}/>
              </div>
              <div>
                <FontAwesomeIcon icon={faBuilding} color={isOfficeManager(contact.roles)}/>
              </div>
              <div>
                <FontAwesomeIcon icon={faSitemap} color={isCentralPlanner(contact.roles)}/>
              </div>
              <div>
                <FontAwesomeIcon icon={faCog} color={isAdmin(contact.roles)}/>
              </div>
            </div>
          </Link>
        )
      }
    </div>
  ) : null;

  function isContact(roles) {
    let found = null;
    roles.forEach(function (role) {
      if(role.name === 'Contact') {
        found = "#2C3E50";
      }
    });
    if (found) {
      return found;
    } else {
      return '#DBDBDB';
    }
  }

  function isOfficeManager(roles) {

    let found = null;
    roles.forEach(function (role) {
      if(role.name === 'Office manager') {
        found = "#2C3E50";
      } else {

      }
    });
    if (found) {
      return found;
    } else {
      return '#DBDBDB';
    }
  }

  function isCentralPlanner(roles) {
    let found = null;
    roles.forEach(function (role) {
      if(role.name === 'Central planner') {
        found = "#2C3E50";
      }
    });
    if (found) {
      return found;
    } else {
      return '#DBDBDB';
    }
  }

  function isAdmin(roles) {
    let found = null;
    roles.forEach(function (role) {
      if(role.name === 'Admin') {
        found = "#2C3E50";
      }
    });
    if (found) {
      return found;
    } else {
      return '#DBDBDB';
    }
  }

  function inviteEmployee() {

  }

  return(
    <div className="organization">
      <Sidebar/>
      <div className="main">
        <TopNav/>
        <div className="employees-wrapper">
          <h2 className="title">Employees</h2>
          <div className="wrapper">

            <div className="tools">
              <input placeholder="search on title"/>
              <div>
                <FontAwesomeIcon icon={faUser} color="#939399"/>
              </div>
              <div>
                <FontAwesomeIcon icon={faBuilding} color="#939399"/>
              </div>
              <div>
                <FontAwesomeIcon icon={faSitemap} color="#939399"/>
              </div>
              <div>
                <FontAwesomeIcon icon={faCog} color="#939399"/>
              </div>
              <button onClick={() => setNewSubjectModal(true)}>Invite employee</button>
            </div>

            {contactList}

            <div className={'modal' + (newSubjectModal === true ? ' display': '')}>
              <div>
                <h2>Invite</h2>
                <span onClick={() => setNewSubjectModal(false)}>
                  <FontAwesomeIcon icon={faTimes} color="#939399"/>
                </span>
              </div>
              <label>Email</label>
              <input onChange={event => setEmail(event.target.value)}/>
              <button onClick={inviteEmployee}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}