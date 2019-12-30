import {Link} from "react-router-dom";
import React from "react";
import {useAuth} from "../../context/auth";
import '../../assets/css/components/includes/TopNav.scss'

export const TopNav = props => {
  const { setAuthTokens } = useAuth();
  function logOut() {
    setAuthTokens();
    localStorage.removeItem('tokens');
  }

  function account() {
    let account = document.querySelector('.account ul');
    account.style.display = 'block';
  }

  return (
    <div className="nav">
      <ul className="navUl">
        <li><Link to="/admin">Calendar</Link></li>
        <li><Link to="/appointments">My appointments</Link></li>
        <li><Link to="/team">My team</Link></li>
        <li><Link to="/availability">Appointment hours</Link></li>
        <li><Link to="/subjects">Manage Organization</Link></li>
        <li><a href="https://skedify.zendesk.com/hc/en-us" target="_blank">Help</a></li>
        <li className="account" onClick={account}>
          Account
          <ul>
            <li onClick={logOut}>Log out</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default TopNav;





