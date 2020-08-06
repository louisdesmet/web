import React from "react";
import {useParams} from "react-router-dom";
import TopNav from "../components/includes/TopNav";
import '../assets/css/pages/Outcome.scss';
import {useSelector} from "react-redux";
import AdminSidebar from "../components/includes/AdminSidebar";

export default function Outcome(props) {
  const outcomes = useSelector(state => state.remoteOutcomes);
  const { id } = useParams();
  const outcome = outcomes.data ? outcomes.data.find(outcome => outcome.id === parseInt(id)) : null;



  return(
    <div className="organization">
      <AdminSidebar/>
      <div className="main">
        <TopNav/>
        <div className="outcome-wrapper">
          <h2 className="title">{outcome.name}</h2>
          <div className="wrapper">
            <div className="general">
              <label>Name</label>
              <input defaultValue={outcome.name}/>
              <label>Description</label>
              <input defaultValue={outcome.description}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}