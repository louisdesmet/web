import React, {useState, useEffect} from "react";
import Office from "../components/includes/Office";
import TopNav from "../components/includes/TopNav";
import '../assets/css/pages/Templates.scss'

const months = ['Januari', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const Templates = (props) => {

  const [items, setItems] = useState([]);
  const [date] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const [daysMonths, setDaysMonths] = useState(loadDaysMonths);
  const [monthsNames, setMonthsNames] = useState(loadMonthsNames);
  const [years, setYears] = useState(loadYears);
  const [firstDays, setFirstDays] = useState(loadFirstDays);


  function loadDaysMonths() {
    let array = [];
    for (let i = 0; i < 12; i++) {
      let current = new Date();
      let newDate = new Date(current.setMonth(current.getMonth()+ i));
      array.push(new Date(newDate.getFullYear(),newDate.getMonth() + 1, 0).getDate());
    }
    return array;
  }

  function loadMonthsNames() {
    let array = [];
    for (let i = 0; i < 12; i++) {
      let current = new Date();
      let newDate = new Date(current.setMonth(current.getMonth()+ i));
      array.push(months[newDate.getMonth()]);
    }
    return array;
  }

  function loadYears() {
    let array = [];
    for (let i = 0; i < 12; i++) {
      let current = new Date();
      let newDate = new Date(current.setMonth(current.getMonth()+ i));
      array.push(newDate.getFullYear());
    }
    return array;
  }

  function loadFirstDays() {
    let array = [];
    for (let i = 0; i < 12; i++) {
      let current = new Date();
      let newDate = new Date(current.setMonth(current.getMonth()+ i));
      array.push(new Date(newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-01').getDay());
    }
    return array;
  }

  function mouseDown(e) {
    console.log(e.target.style.display);
    e.target.style.background = '#A7CAEC';
  }

  let temp = new Date(date.setMonth(date.getMonth()+1));
  new Date(temp.getFullYear(),temp.getMonth() + 1, 0).getDate()

  function dateClass(i) {
    if(i === date.getDate() && month === date.getMonth() && year === date.getFullYear()) {
      return 'date'
    }
  }

  if(items.length === 0) {
    daysMonths.forEach(function(days, index) {
      let pre = [];
      let array = [];
      for (let i = 0; i <= (firstDays[index]) - 1; i++) {
        pre.push(<div key={index + '' + i}></div>);
      }
      for (let i = 1; i <= days; i++) {
        array.push(<div onMouseDown={mouseDown} className={dateClass(i)} key={(month + i) + '-' + i}>{i}</div>);
      }
      items.push(pre.concat(array));
    });
    debugger;
  }

  let templates = [];

  for (let i = 0; i < 12; i++) {
    console.log(month);
    templates.push(
      <div className="month" key={i}>
        <div className="header">
          <h2>{monthsNames[i]} {years[i]}</h2>
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

  return (
    <div className="admin">
      <div className="sidebar">
        <Office/>
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