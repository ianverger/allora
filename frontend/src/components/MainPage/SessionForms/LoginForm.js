import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
    <h2 id="login-heading">Log In</h2>
      <label>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
          className="inputs"
        />
      </label>
      <label>
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
          className="inputs"
        />
      </label>
      <input
        id="login-button"
        type="submit"
        value="Log In"
        disabled={!email || !password}
      />
      <div className="errors">{errors?.email}</div>
      <div className="errors">{errors?.password}</div>
    </form>
  );
}

export default LoginForm;