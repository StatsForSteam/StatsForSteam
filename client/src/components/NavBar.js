import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.scss';
import '../index.scss';
import {AiFillHome} from 'react-icons/ai';

function NavBar(){
  const [Username, setUsername] = useState();
  const [ProfilePicture, setProfilePicture] = useState();

  useEffect(() => {
    Promise.all([
      fetch('/getUserName'),
      fetch('/getUserProfilePicture')
    ]).then(([userResponse, userPfpResponse]) => {
      userResponse.json().then(data => setUsername(data.username));
      userPfpResponse.json().then(data => setProfilePicture(data.pfp));
    })
  }, []);

    const location = useLocation()

    // Welcome Page
    if (location.pathname === "/" || location.pathname === "/404"){
      return null
    }

    return(
        <Navbar className="navbar" expand="lg">
        <Container fluid>
          <Navbar.Brand bsPrefix="navbarlogo"><Nav.Link href="/">Stats For Steam</Nav.Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '200px'}}
              navbarScroll
            >
              <Nav.Link style={{ color: 'var(--tertiary-color)',}} href="/Profile"><AiFillHome id="home"/></Nav.Link>
            </Nav>
            <Navbar.Text style={{ color: 'var(--tertiary-color)', fontWeight: 500 }} >{Username}  </Navbar.Text>
            <Navbar.Text><img className ="pfp" src={ProfilePicture} /></Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavBar;

