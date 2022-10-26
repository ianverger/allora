import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../../store/session';
import './SessionForm.css';

function SignupForm () {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);



  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const usernameSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user)); 
  }


  return (
    <form className="session-form" onSubmit={usernameSubmit}>
      <h2 id="signup-heading">Sign Up</h2>
      <label>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
          className="inputs"
        />
      </label>
      <label>
        <input type="text"
          value={username}
          onChange={update('username')}
          placeholder="Username"
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
      <label>
        <input type="password"
          value={password2}
          onChange={update('password2')}
          placeholder="Confirm Password"
          className="inputs"
        />
      </label>
      <input
        type="submit"
        value="Sign Up"
        disabled={!email || !username || !password || password !== password2}
        id="signup-button"
      />
      {errors && <div className="errors">{errors?.email}</div>}
      {errors && <div className="errors">{errors?.username}</div>}
      {errors && <div className="errors">{errors?.password}</div>}
      <div className="errors">
        {password !== password2 && 'Confirm Password field must match'}
      </div>
    </form>
  );
}

export default SignupForm;