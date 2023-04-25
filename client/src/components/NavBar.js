import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import LoginButton from '../components/buttons/LoginButton';
import './NavBar.scss';

function NavBar(){
  const [Username, setUsername] = React.useState();
  const [ProfilePicture, setProfilePicture] = React.useState();

  useEffect(() => {
    fetch('/getUserName').then(response => 
      response.json().then(data => {
        setUsername(data.username);
    }))

    fetch('/getUserProfilePicture').then(response =>
      response.json().then(data1 => {
        setProfilePicture(data1.pfp);
        console.log(data1);
      }
      ))
  }, [Username, ProfilePicture]);
   
    const username = Username;
    const pfp = ProfilePicture;
    const location = useLocation()
    const loggedIn = true;

    // Welcome Page
    if (location.pathname === "/"){
      return null
    }

  if(loggedIn === true){
    return(
        <Navbar class="navbar" expand="lg">
        <Container fluid>
          <Navbar.Brand bsPrefix="navbarlogo"><Nav.Link href="/">Stats For Steam</Nav.Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '200px'}}
              navbarScroll
            >
              <Nav.Link href="/Profile">Profile</Nav.Link>
            </Nav>
            <Navbar.Text class = "username">{username}  </Navbar.Text>
            <Navbar.Text><img class="pfp" src={pfp} /></Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
  }

export default NavBar;

