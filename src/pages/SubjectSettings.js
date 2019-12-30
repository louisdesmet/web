import React, {useState, useEffect} from "react";
import '../assets/css/pages/Subject.scss';
import TopNav from "../components/includes/TopNav";
import Sidebar from "../components/includes/Sidebar";
import {Link} from "react-router-dom";

export default function SubjectSettings(props) {
  const {subject} = props.location.state;

  console.log(subject);
  return(
    <div className="organization">
      <Sidebar/>
      <div className="main">
        <TopNav/>
        <div className="subject-wrapper">
          <h2 className="title">{subject.name}</h2>
          <div className="tabs">
            <Link className="subject" to={{
              pathname: "/subject/"+subject.id,
              state: {
                subject: subject
              }
            }}>General</Link>
            <Link className="subject" to={{
              pathname: "/subject/"+subject.id+'/translations',
              state: {
                subject: subject
              }
            }}>Translations</Link>
            <Link className="subject" to={{
              pathname: "/subject/"+subject.id+'/availability',
              state: {
                subject: subject
              }
            }}>Scheduling settings</Link>
          </div>
          <div className="wrapper">

          </div>
        </div>
      </div>
    </div>
  );
}