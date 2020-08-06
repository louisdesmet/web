import {Link} from "react-router-dom";
import React from "react";
import '../../assets/css/components/includes/AdminSidebar.scss'

export const AdminSidebar = props => {

  return (
    <div className="admin-sidebar">
        <div className="admin-sidebar-head">
            <div className="logo">
                <img src={require('../../assets/img/logo.png')} alt=""/>
            </div>
            <div>
                <p className="admin-sidebar-head-role">BEHEERDER</p>
                <p className="admin-sidebar-head-enterprise">VDAB</p>
            </div>
        </div>
        <ul>
            <li className="admin-sidebar-category">Organization and planning</li>
            <li className="admin-sidebar-link"><Link to="/subjects">Subjects</Link></li>
            <li className="admin-sidebar-link"><Link to="/outcomes">Outcomes</Link></li>
            <li className="admin-sidebar-link"><Link to="/lead-segments">Lead segments</Link></li>
            <li className="admin-sidebar-link"><Link to="/offices">Offices</Link></li>
            <li className="admin-sidebar-link"><Link to="/employees">Employees</Link></li>
            <li className="admin-sidebar-category">Settings</li>
            <li className="admin-sidebar-link"><Link to="/general-settings">General settings</Link></li>
            <li className="admin-sidebar-link"><Link to="/plugin-settings">Plugin settings</Link></li>
            <li className="admin-sidebar-link"><Link to="/notifications">Notifications</Link></li>
            <li className="admin-sidebar-link"><Link to="/reminders">Reminders</Link></li>
            <li className="admin-sidebar-link"><Link to="/customer-fields">Customer fields</Link></li>
            <li className="admin-sidebar-category">Insights</li>
            <li className="admin-sidebar-link"><Link to="/dashboard">Dashboard</Link></li>
        </ul>
    </div>
  );
};

export default AdminSidebar;