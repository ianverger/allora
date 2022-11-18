import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './NavBar.css';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/profile'}>
            <img src="https://hippark-photos.s3.amazonaws.com/allora-logos/allora-logo-pink_adobe_express.png" alt="allora-logo" id="allora-nav-logo"/>
          </Link>
          <div id="right-nav-links">
            <button>
              <Link style={{textDecoration: "none", color: "inherit"}} to={'/meetTheTeam'}>Hire Us!</Link>
            </button>
            <button>
              <Link style={{textDecoration: "none", color: "inherit"}} to={'/profile'}>Profile</Link>
            </button>
            <button onClick={logoutUser}>Logout</button>
          </div>
        </div>
      );
    } 
  }

  return (
    <>
      { getLinks() }
    </>
  );
}

export default NavBar;