import React from "react";
import '../assets/css/pages/Subject.scss';
import TopNav from "../components/includes/TopNav";
import Sidebar from "../components/includes/Sidebar";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export default function SubjectTranslations(props) {

  const subjects = useSelector(state => state.remoteSubjects);
  const { id } = useParams();
  const subject = subjects.data ? subjects.data.find(subject => subject.id === parseInt(id)) : null;

  return(
    <div className="organization">
      <Sidebar/>
      <div className="main">
        <TopNav/>
        <div className="subject-wrapper">
          <h2 className="title">{subject.name}</h2>
          <div className="tabs">
            <Link className="subject" to={"/subject/"+subject.id}>General</Link>
            <Link className="subject" to={"/subject/"+subject.id+'/translations'}>Translations</Link>
            <Link className="subject" to={"/subject/"+subject.id+'/availability'}>Scheduling settings</Link>
          </div>
          <div className="wrapper">
            translations
          </div>
        </div>
      </div>
    </div>
  );
}