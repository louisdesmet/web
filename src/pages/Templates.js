import React, {useState} from "react";
import { getDate, getDaysInMonth, addMonths, getMonth, getYear, getDay, startOfMonth, isWithinInterval } from 'date-fns';

import Office from "../components/includes/Office";
import TopNav from "../components/includes/TopNav";
import '../assets/css/pages/Templates.scss';
const monthNames = ['Januari', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const Templates = (props) => {

  const [items] = useState([]);
  const [date] = useState(new Date());

  const [daysMonths] = useState(loadDaysMonths);
  const [months] = useState(loadMonths);
  const [years] = useState(loadYears);
  const [firstDays] = useState(loadFirstDays);

  const [startDay, setStartDay] = useState(null);
  const [startMonth, setStartMonth] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [endMonth, setEndMonth] = useState(null);



  function loadDaysMonths() {
    let array = [];
    for (let i = 0; i < 12; i++) {
      array.push(getDaysInMonth(addMonths(date, i)));
    }
    return array;
  }

  function loadMonths() {
    let array = [];
    for (let i = 0; i < 12; i++) {
      array.push({
        name: monthNames[getMonth(addMonths(date, i))],
        number: getMonth(addMonths(date, i))
      });
    }
    return array;
  }

  function loadYears() {
    let array = [];
    for (let i = 0; i < 12; i++) {
      array.push(getYear(addMonths(date, i)));
    }
    return array;
  }

  function loadFirstDays() {
    let array = [];
    for (let i = 0; i < 12; i++) {
      array.push(getDay(startOfMonth(addMonths(date, i))));
    }
    return array;
  }

  function click(i, index) {
    if(!startDay && !startMonth) {
      debugger;
      setStartDay(i);
      setStartMonth(index);
    } else if (!endDay && !endMonth) {
      debugger;
      setEndDay(i);
      setEndMonth(index);
    }
  }

  function dateClass(i, index) {
    if(i === getDate(date) && months[index].name === monthNames[getMonth(date)]) {
      return 'date'
    }
  }

  function isSelected(i, index) {
    console.log(startMonth);
    if(startMonth && startDay && endMonth && endDay) {
      debugger;
      console.log(new Date(years[index], months[index].number, i));
      if(isWithinInterval(
        new Date(years[index], months[index].number, i),
        {
          start: new Date(years[startMonth], months[startMonth].number, startDay),
          end: new Date(years[startMonth], months[endMonth].number, endDay)
        }
      )) {
        debugger;
      }
    }
    return 'selected';
  }

  if(items.length === 0) {
    daysMonths.forEach(function(days, index) {
      let pre = [];
      let array = [];
      for (let i = 0; i <= (firstDays[index]) - 1; i++) {
        pre.push(<div key={index + '' + i}></div>);
      }
      for (let i = 1; i <= days; i++) {
        array.push(<div onClick={() => click(i, index)} className={isSelected(i, index)} key={index + '-' + i}>{i}</div>);
      }
      items.push(pre.concat(array));
    });
  }

  let templates = [];

  for (let i = 0; i < 12; i++) {
    templates.push(
      <div className="month" key={i}>
        <div className="header">
          <h2>{monthNames[i]} {years[i]}</h2>
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
          {items[i]}
        </div>

      </div>
    );
  }
console.log(startDay);
  return (
    <div className="admin">
      <div className="sidebar">
        <Office/>
        <div>{startDay}</div>
      </div>
      <div className="main">
        <TopNav/>
        <div className="templates">
          <div className="templates-months">
            {templates}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;