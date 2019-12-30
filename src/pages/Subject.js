import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {
  faTimes,
  faUser,
  faBuilding,
  faSitemap,
  faCog,
  faPhone,
  faMapMarkerAlt, faCamera
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BrowserRouter as Router, Link} from "react-router-dom";
import '../assets/css/pages/Subject.scss';
import TopNav from "../components/includes/TopNav";
import Office from "../components/includes/Office";
import PrivateRoute from "../PrivateRoute";
import Sidebar from "../components/includes/Sidebar";

export default function Subject(props) {
  const { path } = props.match;
  const {subject} = props.location.state;
  const [tab, setTab] = useState('General');

  console.log(subject);

  const categories = useSelector(state => state.remoteSubjectCategories);
  let categoryList;
  if (categories.data) {
    categoryList = categories.data.map(category => <option key={category.id} value={category.id}>{category.name}</option>);
  }
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