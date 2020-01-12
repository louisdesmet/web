import React, { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faBuilding, faPhone, faMapMarkerAlt, faCamera} from "@fortawesome/free-solid-svg-icons";
import Datepicker from "./Datepicker";
import Customers from "./Customers";
import Offices from "./Offices";
import Subjects from "./Subjects";
import Contacts from "./Contacts";
import {useSelector} from "react-redux";

export const Popup = props => {
  const [meetingType, setMeetingType] = useState('office');

  const start = new Date(props.start);
  const end = new Date(props.end);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [showCustomer, setShowCustomer] = useState(false);
  const [showSubject, setShowSubject] = useState(false);
  const [showOffice, setShowOffice] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showDatepicker, setShowDatepicker] = useState(false);

  function close() {
    props.hide();
    let element = document.querySelector('.fc-highlight');
    element.style.display = 'none';
  }

  const storeCustomer = useSelector(state => state.customer);
  const storeOffice = useSelector(state => state.office);
  const storeSubject = useSelector(state => state.subject);
  const storeContact = useSelector(state => state.contact);

  function submit() {
    fetch('http://api.test/api/appointments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("tokens")).access_token,
      },
      body: JSON.stringify({
        customer: storeCustomer.id,
        office: storeOffice.id,
        subject: storeSubject.id,
        contact: storeContact.id,
        meetingType: meetingType,
        start: (new Date(start)).toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " "),
        end: (new Date(end)).toISOString().slice(0, 19).replace(/-/g, "-").replace("T", " ")
      })
    });
  }

  return (
    props.show && (
      <div className="popup">
        <div className="title">
          <h2>New Event</h2>
          <FontAwesomeIcon onClick={close} className="close" icon={faTimes} color="#939399"/>
        </div>
        <div className="time">
          <p className="date" onClick={() => setShowDatepicker(true)}>{days[start.getDay()] + ' ' + ("0" + start.getDate()).slice(-2) + ' ' + months[start.getMonth()] + ' ' + start.getFullYear()}</p>
          <input defaultChecked="12/12/1993"/>
          <p className="start">{("0" + start.getHours()).slice(-2) + ':' + ("0" + start.getMinutes()).slice(-2)}</p>
          <p>to</p>
          <p className="end">{("0" + end.getHours()).slice(-2) + ':' + ("0" + end.getMinutes()).slice(-2)}</p>
        </div>
        <div className="datepicker-container">
          <Datepicker show={showDatepicker} hide={() => setShowDatepicker(false)}/>
        </div>
        <div className="client-wrapper">
          <input className="client" onClick={() => setShowCustomer(true)} placeholder={(storeCustomer.first_name !== null ? storeCustomer.first_name + ' ' + storeCustomer.last_name :'Client')}/>
          <Customers show={showCustomer} hide={() => setShowCustomer(false)}/>
        </div>
        <div className="subject-wrapper">
          <input className="subject" onClick={() => setShowSubject(true)} placeholder={(storeSubject.name !== null ? storeSubject.name :'Subject')}/>
          <Subjects show={showSubject} hide={() => setShowSubject(false)}/>
        </div>
        <div className="meeting-types">
          <div onClick={() => setMeetingType('office')} className={(meetingType === 'office') ? 'current' : ''}><FontAwesomeIcon icon={faBuilding} color="#939399"/></div>
          <div onClick={() => setMeetingType('phone')} className={(meetingType === 'phone') ? 'current' : ''}><FontAwesomeIcon icon={faPhone} color="#939399"/></div>
          <div onClick={() => setMeetingType('on_location')} className={(meetingType === 'on_location') ? 'current' : ''}><FontAwesomeIcon icon={faMapMarkerAlt} color="#939399"/></div>
          <div onClick={() => setMeetingType('video')} className={(meetingType === 'video') ? 'current' : ''}><FontAwesomeIcon icon={faCamera} color="#939399"/></div>
        </div>
        <div className="office-wrapper">
          <input className="office" onClick={() => setShowOffice(true)} placeholder={(storeOffice.name !== null ? storeOffice.name :'Office')}/>
          <Offices show={showOffice} hide={() => setShowOffice(false)}/>
        </div>
        <div className="contact-wrapper">
          <input className="contact" onClick={() => setShowContact(true)} placeholder={(storeContact.name !== null ? storeContact.name :'Contact')}/>
          <Contacts show={showContact} hide={() => setShowContact(false)}/>
        </div>
        <button onClick={submit} className="create">Create</button>
      </div>
    )
  );
};

export default Popup;