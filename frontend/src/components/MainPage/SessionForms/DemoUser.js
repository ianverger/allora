import React from "react";
import { useDispatch } from 'react-redux';
import { login, clearSessionErrors } from '../../../store/session';

function DemoUserButton() {
  const dispatch = useDispatch();


  const demoUser = (e) => {
    e.preventDefault();
    dispatch(login({
        email: 'heather@allora.com',
        password: 'password'
    }));
  };


  return (
    <button onClick={demoUser} id="demo-user-button">Demo User</button>
  )
}

export default DemoUserButton;

     