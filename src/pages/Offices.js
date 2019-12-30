import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import Map from "../components/Map";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../assets/css/pages/Offices.scss'
import {Link} from "react-router-dom";
import TopNav from "../components/includes/TopNav";
import Office from "../components/includes/Office";
import Sidebar from "../components/includes/Sidebar";

export default function Offices(props) {

  const [name, setName] = useState('');



  const [newSubjectModal, setNewSubjectModal] = useState(false);
  const [newCategoryModal, setNewCategoryModal] = useState(false);
  const offices = useSelector(state => state.remoteOffices);

  const [office, setOffice] = useState(null);

  useEffect(() => {
    if(offices.data && office === null) {
      setOffice(offices.data[0]);
    }
  });



  let officesList;

  if (offices.data) {
    officesList = <ul> {
      offices.data.map(office =>
        <li key={office.id} onClick={() => setOffice(office)}>
          <div>
            <FontAwesomeIcon icon={faBuilding} color="#2C3E50" size="lg"/>
          </div>
          <div>
            <p>{office.name}</p>
            <p>{office.location.street}</p>
            <p>{office.location.postal} {office.location.city}</p>
          </div>
        </li>
      )
    }
    </ul>
    ;
  }

  return(
    <div className="organization">
      <Sidebar/>
      <div className="main">
        <TopNav/>
        <div className="offices-wrapper">
          <h2 className="title">Offices</h2>
          <div className="wrapper">
            <div className="offices-sidebar">
              <button onClick={() => setNewSubjectModal(true)}>New</button>
              <input placeholder="search on office name"/>
              {officesList}
            </div>
            <div className="map-container">
              <Map offices={offices} office={office}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}