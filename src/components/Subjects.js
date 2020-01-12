import React, { useRef, useEffect } from "react";
import {connect, useSelector} from "react-redux";
import { addSubject } from "../redux/actions/index";
function mapDispatchToProps(dispatch) {
  return {
    addSubject: (payload) => dispatch(addSubject(payload))
  };
}
function useOutsideAlerter(ref, props) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      props.hide();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

function ConnectedSubjects(props) {

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props);

  function choose(el) {
    props.addSubject(el);
    props.hide();
  }

  const subjects = useSelector(state => state.remoteSubjects);
  const subjectList = subjects.data ? (<ul>
    {subjects.data.map(el => (
      <li key={el.id} onClick={() => choose(el)}>
        {el.name}
      </li>
    ))}
  </ul>) : null;

  return (
    props.show && (
      <div className="subjects" ref={wrapperRef}>
        {subjectList}
      </div>
    )
  );
}

const Subjects = connect(
  null,
  mapDispatchToProps
)(ConnectedSubjects);

export default Subjects;