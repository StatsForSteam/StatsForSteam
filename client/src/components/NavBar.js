import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.scss';
import '../index.scss';
import {AiFillHome} from 'react-icons/ai';
import LogoutButton from './buttons/LogoutButton';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function NavBar(){
  const [Username, setUsername] = useState();
  const [ProfilePicture, setProfilePicture] = useState();
  const location = useLocation()


  useEffect(() => {
    if (!(location.pathname === "/" || location.pathname === "/404" || location.pathname === "/authentication")) {
      fetch('/getUserData')
        .then(response => response.json()).then(data => {
          setUsername(data.username);
          setProfilePicture(data.profile_picture);
        })}
  }, [location]);
    
    if ((location.pathname === "/" || location.pathname === "/404" || location.pathname === "/authentication")){
      return null;
    }

    return(
      <Navbar className="navbar" expand="lg">
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Logout</Tooltip>}
          >
            <Nav.Link>
              <LogoutButton />
            </Nav.Link>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Home</Tooltip>}
          >
            <Nav.Link style={{ color: 'var(--tertiary-color)' }} href="/Profile">
              <AiFillHome size={40} />
            </Nav.Link>
          </OverlayTrigger>
        </Nav>

        <Navbar.Text style={{ color: 'var(--tertiary-color)', fontWeight: 500 }}>
          {Username}
        </Navbar.Text>
        <Navbar.Text>
          <img alt="user steam logo" className="pfp" src={ProfilePicture} />
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    )
}

export default NavBar;

