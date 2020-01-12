import React, {useState} from "react";
import {useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons'
import '../../assets/css/components/includes/Office.scss'

export const TopNav = props => {
  const [icon, setIcon] = useState(faAngleDown);
  const offices = useSelector(state => state.remoteOffices);
  const office = useSelector(state => state.officeSidebar);

  const [showOffices, setShowOffices] = useState(false);
  const officeList = offices.data ? (<ul className="offices-sidebar">
    {offices.data.map(el => (
      <li key={el.id} className={(office.id === el.id ? 'currentOffice' : '')}>
        {el.name}
      </li>
    ))}
  </ul>) : null;

  function toggle() {
    if(icon === faAngleDown) {
      setShowOffices(true);
      setIcon(faAngleUp);
    } else if(icon === faAngleUp) {
      setShowOffices(false);
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
      {showOffices && (officeList)}
    </div>
  );
};

export default TopNav;





