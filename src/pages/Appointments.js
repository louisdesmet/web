import React from "react";
import Office from "../components/includes/Office";
import TopNav from "../components/includes/TopNav";
import '../assets/css/pages/Appointments.scss'
import {useSelector} from "react-redux";

export const Appointments = (props) => {

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const appointments = useSelector(state => state.remoteAppointments);

  const appointmentsList = appointments.data ? (
    <div className="appointments"> {
      appointments.data.map(appointment =>
        <div className="appointment" key={appointment.id}>
          <p className="date">{days[new Date(appointment.start).getDay()] + ' ' + ("0" + new Date(appointment.start).getDate()).slice(-2) + ' ' + months[new Date(appointment.start).getMonth()] + ' ' + new Date(appointment.start).getFullYear()}</p>
          <div className="appointment-wrapper">
            <div className="time">
              <p>{new Date(appointment.start).getHours() + ':' + ('0' + new Date(appointment.start).getMinutes()).slice(-2)}</p>
              <p>{new Date(appointment.end).getHours() + ':' + ('0' + new Date(appointment.end).getMinutes()).slice(-2)}</p>
            </div>
            <div className="general">
              <p>{appointment.subject.name}</p>
              <p>{appointment.customer.first_name + ' ' + appointment.customer.last_name}</p>
            </div>
          </div>
        </div>
      )
    }
    </div>
  ) : null;

  return (
    <div className="admin">
      <div className="sidebar">
        <Office/>
      </div>
      <div className="main">
        <TopNav/>
        <div className="templates">
          {appointmentsList}
        </div>
      </div>
    </div>
  );
};

export default Appointments;