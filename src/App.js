import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Admin from "./pages/Admin";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";
import {connect} from "react-redux";
import {getAppointments, getContacts, getCustomers, getOffices, getSubjects, getSubjectCategories} from "./redux/actions";
import Subjects from "./pages/Subjects";
import Offices from "./pages/Offices";
import Templates from "./pages/Templates";
import Team from "./pages/Team";
import Appointments from "./pages/Appointments";
import Employees from "./pages/Employees";
import Employee from "./pages/Employee";
import Subject from "./pages/Subject";
import SubjectSettings from "./pages/SubjectSettings";
import SubjectTranslations from "./pages/SubjectTranslations";

export const App = ({ getOffices, getSubjects, getSubjectCategories, getCustomers, getContacts, getAppointments }) => {
  const [authTokens, setAuthTokens] = useState();

  if(authTokens === undefined && localStorage.getItem('tokens')  !== undefined) {
    setAuthTokens(localStorage.getItem('tokens'));
  }

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  useEffect(() => {
    getOffices();
    getSubjects();
    getSubjectCategories();
    getCustomers();
    getContacts();
    getAppointments();
  }, []);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/admin" component={Admin} />
        <PrivateRoute path="/availability" component={Templates} />
        <PrivateRoute path="/team" component={Team} />
        <PrivateRoute path="/appointments" component={Appointments} />
        <PrivateRoute path="/subjects" component={Subjects} />
        <PrivateRoute path="/offices" component={Offices} />
        <PrivateRoute path="/employees" component={Employees} />
        <PrivateRoute path="/subject/:id/availability" component={SubjectSettings} />
        <PrivateRoute path="/subject/:id/translations" component={SubjectTranslations} />
        <PrivateRoute path="/subject/:id" component={Subject} />
        <PrivateRoute path="/employee/:id" component={Employee} />
      </Router>
    </AuthContext.Provider>
  );
};

const mapStateToProps = ({ offices }) => ({
  offices
});

export default connect(
  mapStateToProps,
  { getOffices, getSubjects, getSubjectCategories, getCustomers, getContacts, getAppointments }
)(App);