import React, {useState} from "react";
import {useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons'
import '../../assets/css/components/includes/Office.scss'

export const TopNav = props => {
  const [icon, setIcon] = useState(faAngleDown);
  const offices = useSelector(state => state.remoteOffices);
  const office = useSelector(state => state.officeSidebar);
  let officeList;
  if (offices.data) {
    officeList = <ul className="offices-tools">
      {offices.data.map(el => (
        <li key={el.id} className={(office.id === el.id ? 'currentOffice' : '')}>
          {el.name}
        </li>
      ))}
    </ul>;
  }

  function toggle() {
    let offices = document.querySelector('.offices-tools');
    if(icon === faAngleDown) {

      offices.style.display = 'block';
      setIcon(faAngleUp);
    } else if(icon === faAngleUp) {

      offices.style.display = 'none';
      setIcon(faAngleDown);
    }

  }

  return (
    <div>
      <div className="office">
        <img className="logo" src={require('../../assets/img/logo.png')} alt=""/>
        <div>{office.name}</div>
        <div onClick={toggle}>
          <FontAwesomeIcon icon={icon} color="#939399"/>
        </div>
      </div>
      {officeList}
    </div>
  );
};

export default TopNav;





