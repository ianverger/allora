import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './NavBar.css';
import DropdownMenu from './DropdownMenu';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  
  // const logoutUser = e => {
  //     e.preventDefault();
  //     dispatch(logout());
  // }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/profile'}>
            <img src="https://hippark-photos.s3.amazonaws.com/allora-logos/allora-logo-pink_adobe_express.png" alt="allora-logo" id="allora-nav-logo"/>
          </Link>
          {/* <div id="middle-nav-links">
            <i className="fa-solid fa-plane"/>Trips
          </div> */}
          <div id="right-nav-links">
            <button>
              <Link style={{textDecoration: "none", color: "inherit"}} to={'/profile'}>{currentUser.username}</Link>
            </button>
            |
            <DropdownMenu currentUser={currentUser} />
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