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
function useOutsideAlerter(ref, props) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {

    if (ref.current && !ref.current.contains(event.target)) {
      props.hide();
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

function ConnectedOffices(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props);

  function choose(el) {
    props.addOffice(el);
    props.hide();
  }

  const offices = useSelector(state => state.remoteOffices);
  const officeList = offices.data ? (<ul>
    {offices.data.map(el => (
      <li key={el.id} onClick={() => choose(el)}>
        {el.name}
      </li>
    ))}
  </ul>) : null;

  return (
    props.show && (
      <div className="offices" ref={wrapperRef}>
        {officeList}
      </div>
    )
  );
}


const Offices = connect(
  null,
  mapDispatchToProps
)(ConnectedOffices);

export default Offices;