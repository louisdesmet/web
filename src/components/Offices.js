import React, { useRef, useEffect } from "react";
import {connect, useSelector} from "react-redux";
import { addOffice } from "../redux/actions/index";
function mapDispatchToProps(dispatch) {
  return {
    addOffice: (payload) => dispatch(addOffice(payload))
  };
}
/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {

    if (ref.current && !ref.current.contains(event.target)) {
      let offices = document.querySelector('.offices');
      offices.style.display = 'none';
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

/**
 * Component that alerts if you click outside of it
 */
function ConnectedOffices(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function choose(el) {
    props.addOffice(el);
    let officeEl = document.querySelector('.office-wrapper div');
    officeEl.style.display = 'none';
  }

  const offices = useSelector(state => state.remoteOffices);
  let officeList;
  if (offices.data) {
    officeList = <ul>
      {offices.data.map(el => (
        <li key={el.id} onClick={() => choose(el)}>
          {el.name}
        </li>
      ))}
    </ul>;
  }

  return (
    <div className="offices" ref={wrapperRef}>
      {officeList}
    </div>
  );
}


const Offices = connect(
  null,
  mapDispatchToProps
)(ConnectedOffices);

export default Offices;