import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../store/session';
import './DropdownMenu.css';

function DropdownMenu({ currentUser }) {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.currentUser);
    // const userId = currentUser.id
    // const selectedUser = useSelector(getUser(userId));
    // const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    
    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };
    
    useEffect(() => {
      if (!showMenu) return;
  
      const closeMenu = () => {
        setShowMenu(false);
      };
  
      document.addEventListener('click', closeMenu);
    
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
  
    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }

    // const profilePicSrc = currentUser.profilePicUrl ? currentUser.profilePicUrl : require('../../assets/blank_profile_pic.png');
    
    return (
      <>
        <button onClick={openMenu} id="ellipses">
          {/* {currentUser && <img src={profilePicSrc}  id="profile-icon"/>} */}
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      
        {showMenu && (
          <ul id="dropdown-menu">
            <button>
                <Link className="ddm-buttons" style={{textDecoration: "none", color: "inherit"}} to={'/profile'}>
                    <i id="user-solid" style={{fontSize: "25px", width: "30px"}} className="fa-solid fa-user"></i><p className="ddm-text">View Profile</p>
                </Link>
            </button>
            {/* <hr style={{height: "2px"}}/> */}
              <button>
                <Link className="ddm-buttons" style={{textDecoration: "none", color: "inherit"}} to={'/meetTheTeam'}>
                    <i id="people-solid" style={{fontSize: "25px", width: "30px"}} class="fa-solid fa-people-group"></i><p className="ddm-text">Hire Us!</p>
                </Link>
              </button>
              <button className="ddm-buttons" onClick={logoutUser}>
                <i id="logout-solid"style={{fontSize: "25px", width: "30px"}} className="fa-solid fa-right-from-bracket"></i><p className="ddm-text">Logout</p>
              </button>
              {/* <button onClick={(e) => history.push(`/ProfilePage/${currentUser.id}`)}>
                {currentUser && <img src={profilePicSrc}  id="dropdown-profile-icon"/>}
                <p className="button-text">&nbsp;&nbsp;{currentUser.firstName} {currentUser.lastName}</p>
              </button>
              <button onClick={logout}>
                <i style={{fontSize: "32px", width: "35px"}} className="fa-solid fa-right-from-bracket"></i>
                <p className="button-text">&nbsp;&nbsp;Log Out</p>
              </button> */}
            
          </ul>
        )}
      </>
    );
  }
  
  export default DropdownMenu;