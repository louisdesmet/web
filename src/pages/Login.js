import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useAuth } from "../context/auth";

import '../assets/css/pages/Login.scss';

axios.defaults.baseURL = 'http://api.test/api';
axios.defaults.headers.common['Accept'] = 'application/json';

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  let referer;
  if(props.location.state !== undefined) {
    referer = props.location.state.referer;
  } else if(localStorage.getItem('tokens')  !== undefined){
    return <Redirect to='/admin' />;
  }

  function postLogin(event) {
    event.preventDefault();

    axios.post("/login", {
      email,
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }


  return (
    <div className="login">
      <div>
        <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="-104.4 470 314.7 73.7" enableBackground ="new -104.4 470 314.7 73.7"><path d="M-88.2 485c-1.1.9-1.7 2.2-1.7 3.7s.7 2.8 2.1 3.7c1.4.9 4.6 2 9.7 3.2 5 1.2 9 3.1 11.7 5.6 2.8 2.5 4.2 6.1 4.2 10.9 0 4.8-1.8 8.6-5.4 11.6-3.6 3-8.3 4.4-14.1 4.4-8.4 0-16-3.1-22.7-9.4l7.1-8.7c5.7 5 11 7.5 15.9 7.5 2.2 0 3.9-.5 5.1-1.4 1.2-.9 1.9-2.2 1.9-3.8 0-1.6-.7-2.9-2-3.8-1.3-.9-3.9-1.9-7.8-2.9-6.2-1.5-10.7-3.4-13.6-5.7-2.9-2.4-4.3-6.1-4.3-11.1s1.8-8.9 5.4-11.7c3.6-2.7 8.1-4.1 13.6-4.1 3.5 0 7.1.6 10.6 1.8 3.5 1.2 6.6 2.9 9.3 5.2l-6 8.7c-4.6-3.5-9.4-5.2-14.3-5.2-2 .1-3.5.6-4.7 1.5zm51.3 42.6h-11.4v-56.5h11.4v29l12.7-13.5h14.4l-15.6 16.6 16.2 24.4h-13.5l-10.4-15.7-3.7 3.9-.1 11.8zm75.1.6h-19.6c-6.2 0-11.3-1.9-15.4-5.7s-6.1-9-6.1-15.4 2.1-11.6 6.2-15.4c4.1-3.8 9-5.7 14.6-5.7s10.4 1.7 14.3 5.1 5.9 8.1 5.9 14v6.1h-29.8c.4 2.2 1.5 4.1 3.5 5.5s4.2 2.1 6.7 2.1h19.6l.1 9.4zm-14.3-30.8c-1.6-1.3-3.5-2-5.7-2-2.3 0-4.3.7-6.2 2.1-1.9 1.4-3 3.2-3.3 5.6h17.9c-.2-2.5-1.1-4.4-2.7-5.7zm43.9 30.8c-4.8 0-9.2-2.1-13-6.2s-5.7-9.2-5.7-15.3c0-6.1 1.9-11.1 5.6-14.9 3.7-3.9 8-5.8 13-5.8s9 1.7 12.2 5.2v-20.1h11.4v57.1h-23.5zm-7.2-21c0 3.3 1 6 3 8.1 2 2.1 4.3 3.2 6.9 3.2s4.9-1.1 6.7-3.2c1.9-2.1 2.8-4.8 2.8-8.1s-.9-6.1-2.8-8.3c-1.9-2.2-4.1-3.3-6.8-3.3s-5 1.1-6.9 3.3c-1.9 2.2-2.9 5-2.9 8.3zm57.7 20.4h-11.4v-40.6h11.4v40.6zm28.8-43.3v2.7h9.9v8.2h-9.9v32.3h-11.5v-32.3h-4.8v-8.2h4.8v-2.5c0-4.5 1.4-8 4.1-10.6s6.1-3.9 10.1-3.9h11v9.4h-9.7c-1.2 0-2.1.4-2.9 1.3-.8.8-1.1 2-1.1 3.6zm31 59.4h-12.2v-10.5h12c1.1 0 2-.5 2.7-1.6.8-1 1.1-2.1 1.1-3.3s-5.3-15.1-15.8-41.7h12.2l10 25.5 10-25.5h12.2l-19 48.2c-1.1 2.8-2.9 5-5.2 6.5-2.5 1.6-5.1 2.4-8 2.4zm-71.3-72.8h11.4v11.5h-11.4v-11.5z"/></svg>
        <div className="section">
          <form>
            <label>Email</label>
            <div className="wrapper">
              <input type="email" value={email} onChange={e => { setEmail(e.target.value); }}/>
              <FontAwesomeIcon icon={faUser} color="#939399"/>
            </div>
            <label>Password</label>
            <div className="wrapper">
              <input type="password" value={password} onChange={e => { setPassword(e.target.value); }}/>
              <FontAwesomeIcon icon={faLock} color="#939399"/>
            </div>
            <button onClick={postLogin}>Let's get started!</button>
          </form>
          { isError && 'The username or password provided were incorrect!' }
          <a href="/forgot">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
}
export default Login;
