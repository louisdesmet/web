import React from "react";
import {useSelector} from "react-redux";
import {faBuilding, faPhone, faMapMarkerAlt, faCamera} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useParams} from "react-router-dom";
import '../assets/css/pages/Subject.scss';
import TopNav from "../components/includes/TopNav";
import Sidebar from "../components/includes/Sidebar";

export default function Subject(props) {
  const subjects = useSelector(state => state.remoteSubjects);
  const { id } = useParams();
  const subject = subjects.data ? subjects.data.find(subject => subject.id === parseInt(id)) : null
  const categories = useSelector(state => state.remoteSubjectCategories);
  const categoryList = categories.data ? categories.data.map(category => <option key={category.id} value={category.id}>{category.name}</option>) : null;
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
            <div className="general">
              <div className="meeting-types">
                <div><FontAwesomeIcon icon={faBuilding} color="#939399"/></div>
                <div><FontAwesomeIcon icon={faPhone} color="#939399"/></div>
                <div><FontAwesomeIcon icon={faMapMarkerAlt} color="#939399"/></div>
                <div><FontAwesomeIcon icon={faCamera} color="#939399"/></div>
              </div>
              <label>Name</label>
              <input defaultValue={subject.name}/>
              <label>Category</label>
              <select defaultValue={subject.category.id}>
                {categoryList}
              </select>
              <label>Description</label>
              <textarea defaultValue={subject.description}>
              </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}