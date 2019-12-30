import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import dayGridPlugin from '@fullcalendar/daygrid'
import Popup from "./Popup";
import '../assets/css/components/Timetable.scss'
import {useSelector} from "react-redux";

export const Timetable = props => {

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const events = useSelector(state => state.events);


  function select(info) {
    //let start = new Date(info.startStr);
    //let end = new Date(info.endStr);
    setStart(info.startStr);
    setEnd(info.endStr);

    let element = document.querySelector('.fc-highlight');
    let popup = document.querySelector('.popup');
    popup.style.display = 'block';
    popup.style.left = ((window.pageXOffset + element.getBoundingClientRect().left) - 60) + 'px';
    popup.style.top = ((window.pageYOffset + element.getBoundingClientRect().top) - 80) + 'px';
  }

  return (
    <div className="timetable">
      <FullCalendar
        defaultView="timeGridWeek"
        header={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={events}
        //dateClick={}
        eventColor='#606E7B'
        selectable={true}
        selectHelper={true}
        select={select}
        //slotDuration='00:30:00'
        //snapDuration='00:60:00'
        nowIndicator={true}
        editable={true}
        unselectAuto={false}
        height="parent"
      />
      <Popup start={start} end={end}/>
    </div>
  );
};

export default Timetable;