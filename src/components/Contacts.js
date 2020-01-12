import React, { useRef, useEffect } from "react";
import {connect, useSelector} from "react-redux";
import { addContact } from "../redux/actions/index";
function mapDispatchToProps(dispatch) {
  return {
    addContact: (payload) => dispatch(addContact(payload))
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

function ConnectedContacts(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props);

  function choose(el) {
    props.addContact(el);
    props.hide();
  }

  const contacts = useSelector(state => state.remoteContacts);
  const contactList = contacts.data ? (<ul>
    {contacts.data.map(el => (
      <li key={el.id} onClick={() => choose(el)}>
        {el.user.name}
      </li>
    ))}
  </ul>) : null;

  return (
    props.show && (
      <div className="contacts" ref={wrapperRef}>
        {contactList}
      </div>
    )
  );
}


const Contacts = connect(
  null,
  mapDispatchToProps
)(ConnectedContacts);

export default Contacts;