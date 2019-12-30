import React, { useRef, useEffect } from "react";
import {connect, useSelector} from "react-redux";
import { addSubject } from "../redux/actions/index";
function mapDispatchToProps(dispatch) {
  return {
    addSubject: (payload) => dispatch(addSubject(payload))
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
      let subjects = document.querySelector('.subjects');
      subjects.style.display = 'none';
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
function ConnectedSubjects(props) {

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function choose(el) {
    props.addSubject(el);
    let subjectEl = document.querySelector('.subject-wrapper div');
    subjectEl.style.display = 'none';
  }

  const subjects = useSelector(state => state.remoteSubjects);
  let subjectList;
  if (subjects.data) {
    subjectList = <ul>
      {subjects.data.map(el => (
        <li key={el.id} onClick={() => choose(el)}>
          {el.name}
        </li>
      ))}
    </ul>;
  }

  return (
    <div className="subjects" ref={wrapperRef}>
      {subjectList}
    </div>
  );
}

const Subjects = connect(
  null,
  mapDispatchToProps
)(ConnectedSubjects);

export default Subjects;