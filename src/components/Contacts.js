import React, { useRef, useEffect } from "react";
import {connect, useSelector} from "react-redux";
import { addContact } from "../redux/actions/index";
function mapDispatchToProps(dispatch) {
  return {
    addContact: (payload) => dispatch(addContact(payload))
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
      let contacts = document.querySelector('.contacts');
      contacts.style.display = 'none';
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
function ConnectedContacts(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function choose(el) {
    props.addContact(el);
    let contactEl = document.querySelector('.contact-wrapper div');
    contactEl.style.display = 'none';
  }

  const contacts = useSelector(state => state.remoteContacts);
  let contactList;
  if (contacts.data) {
    contactList = <ul>
      {contacts.data.map(el => (
        <li key={el.id} onClick={() => choose(el)}>
          {el.user.name}
        </li>
      ))}
    </ul>;
  }

  return (
    <div className="contacts" ref={wrapperRef}>
      {contactList}
    </div>
  );
}


const Contacts = connect(
  null,
  mapDispatchToProps
)(ConnectedContacts);

export default Contacts;