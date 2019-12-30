import React, { useRef, useEffect } from "react";
import { connect, useSelector} from "react-redux";
import { addCustomer } from "../redux/actions/index";
function mapDispatchToProps(dispatch) {
  return {
    addCustomer: (payload) => dispatch(addCustomer(payload))
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
      let clients = document.querySelector('.clients');
      clients.style.display = 'none';
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

function ConnectedCustomer(props) {

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function choose(el) {
    props.addCustomer(el);
    let customerEl = document.querySelector('.client-wrapper div');
    customerEl.style.display = 'none';
  }

  const customers = useSelector(state => state.remoteCustomers);
  let customerList;
  if (customers.data) {
    customerList = <ul>
      {customers.data.map(el => (
        <li key={el.id} onClick={() => choose(el)}>
          {el.first_name + ' ' + el.last_name}
        </li>
      ))}
    </ul>;
  }

  return (
    <div className="clients" ref={wrapperRef}>
      {customerList}
    </div>
  );
}

const Customer = connect(
  null,
  mapDispatchToProps
)(ConnectedCustomer);

export default Customer;

