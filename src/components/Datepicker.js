import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

function useOutsideAlerter(ref) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      let datepicker = document.querySelector('.datepicker');
      datepicker.style.display = 'none';
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

const months = ['Januari', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export default function Datepicker(props) {

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);


  const [items, setItems] = useState([]);
  const [date] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [daysMonth, setDaysMonth] = useState(new Date(year,month + 1, 0).getDate());
  const [daysMonthPrev, setDaysMonthPrev] = useState((month === 0 ? new Date(year - 1, month, 0).getDate() : new Date(year, month, 0).getDate()));
  const [firstDay, setFirstDay] = useState(new Date(year + '-' + (month + 1) + '-01').getDay());
  const [lastDay, setLastDay] = useState(new Date(year + '-' + (month + 1) + '-' + daysMonth).getDay());

  useEffect(() => {
  }, []);

  function next() {
    if(month === 11) {
      let daysMonthTemp = new Date(year + 1, 1, 0).getDate();
      setItems([]);
      setMonth(0);
      setYear(year + 1);
      setDaysMonth(daysMonthTemp);
      setDaysMonthPrev(new Date(year, 12, 0).getDate());
      setFirstDay(new Date((year + 1) + '-' + 1 + '-01').getDay());
      setLastDay(new Date((year + 1) + '-' + 1 + '-' + daysMonthTemp).getDay());
    } else {
      let daysMonthTemp = new Date(year,month + 2, 0).getDate();
      setItems([]);
      setMonth(month + 1);
      setDaysMonth(daysMonthTemp);
      setDaysMonthPrev(new Date(year,month + 1, 0).getDate());
      setFirstDay(new Date(year + '-' + (month + 2) + '-01').getDay());
      setLastDay(new Date(year + '-' + (month + 2) + '-' + daysMonthTemp).getDay());
    }
  }

  function prev() {
    if(month === 0) {
      let daysMonthTemp = new Date(year - 1, 12, 0).getDate();
      setItems([]);
      setMonth(11);
      setYear(year - 1);
      setDaysMonth(daysMonthTemp);
      setDaysMonthPrev(new Date(year,12,0).getDate());
      setFirstDay(new Date((year - 1) + '-' + 12 + '-01').getDay());
      setLastDay(new Date((year - 1) + '-' + 12 + '-' + daysMonthTemp).getDay());
    } else {
      let daysMonthTemp = new Date(year, month, 0).getDate();
      setItems([]);
      setMonth(month - 1);
      setDaysMonth(daysMonthTemp);
      setDaysMonthPrev(new Date(year,month - 1,0).getDate());
      setFirstDay(new Date(year + '-' + month + '-01').getDay());
      setLastDay(new Date(year + '-' + month + '-' + daysMonthTemp).getDay());
    }
  }

  function dateClass(i) {
    if(i === date.getDate() && month === date.getMonth() && year === date.getFullYear()) {
      return 'date'
    }
  }

  if(items.length === 0) {
    for (let i = daysMonthPrev - firstDay + 1; i <= daysMonthPrev; i++) {
      items.push(<div className="extra" key={month + '-' + i}>{i}</div>);
    }
    for (let i = 1; i <= daysMonth; i++) {
      items.push(<div className={dateClass(i)} key={(month + 1) + '-' + i}>{i}</div>);
    }
    let counter = 1;
    for (let i = 5; i >= lastDay; i--) {
      items.push(<div className="extra" key={(month + 2) + '-' + counter}>{counter}</div>);
      counter++;
    }
  }

  return(
    <div className="datepicker" ref={wrapperRef}>
      <div className="header">
        <h2>{months[month]}, {year}</h2>
        <FontAwesomeIcon onClick={prev} icon={faAngleLeft} color="#939399"/>
        <FontAwesomeIcon onClick={next} icon={faAngleRight} color="#939399"/>
      </div>
      <div className="week">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="days">
        {items}
      </div>
    </div>
  );
}