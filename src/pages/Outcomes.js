import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import '../assets/css/pages/Outcomes.scss'
import TopNav from "../components/includes/TopNav";
import AdminSidebar from "../components/includes/AdminSidebar";
import {Link} from "react-router-dom";

export default function Offices(props) {

  const outcomes = useSelector(state => state.remoteOutcomes);

  const outcomesList = outcomes.data ? (
    <div className="outcomes">
      {
        outcomes.data.map(outcome =>
          <Link key={outcome.id} className="outcome" to={"/outcome/"+outcome.id}>
            <p>{outcome.name}</p>
            <p>{outcome.description}</p>
          </Link>
        )
      }
    </div>
  ) : null;

  return(
    <div className="organization">
      <AdminSidebar/>
      <div className="main">
        <TopNav/>
        <div className="outcomes-wrapper">
          <h2 className="title">Outcomes</h2>
          <div className="wrapper">
            <div className="outcome">
              <p className="header">Name</p>
              <p className="header">Description</p>
            </div>
            {outcomesList}
          </div>
        </div>
      </div>
    </div>
  );
}