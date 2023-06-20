import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.scss';
import '../index.scss';
import {AiFillHome} from 'react-icons/ai';
import {MdContactSupport} from 'react-icons/md';
import LogoutButton from './buttons/LogoutButton';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from "react-router-dom";

function NavBar(){
  const location = useLocation()

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
            <Nav.Link as={Link} style={{ color: 'var(--tertiary-color)' }} to="/Profile">
              <AiFillHome size={40} />
            </Nav.Link>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Contact & FAQ</Tooltip>}
          >
            <Nav.Link as={Link} style={{ color: 'var(--tertiary-color)' }} to="/Contact">
              <MdContactSupport size={40} />
            </Nav.Link>
          </OverlayTrigger>

        </Nav>

        <Navbar.Text style={{ color: 'var(--tertiary-color)', fontWeight: 500 }}>
          {localStorage.getItem('username')}
        </Navbar.Text>
        <Navbar.Text>
          <img alt="user steam logo" className="pfp" src={localStorage.getItem('profilePicture')} />
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    )
}

export default NavBar;