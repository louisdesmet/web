import React, { useRef, useEffect } from "react";
import { connect, useSelector} from "react-redux";
import { addCustomer } from "../redux/actions/index";
function mapDispatchToProps(dispatch) {
  return {
    addCustomer: (payload) => dispatch(addCustomer(payload))
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

function ConnectedCustomer(props) {

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props);

  function choose(el) {
    props.addCustomer(el);
    props.hide();
  }

  const customers = useSelector(state => state.remoteCustomers);
  const customerList = customers.data ? (<ul>
    {customers.data.map(el => (
      <li key={el.id} onClick={() => choose(el)}>
        {el.first_name + ' ' + el.last_name}
      </li>
    ))}
  </ul>) : null;

  return (
    props.show && (
      <div className="clients" ref={wrapperRef}>
        {customerList}
      </div>
    )
  );
}

const Customer = connect(
  null,
  mapDispatchToProps
)(ConnectedCustomer);

export default Customer;