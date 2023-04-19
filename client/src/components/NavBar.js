import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
//}import LoginButton from '../components/buttons/LoginButton';
import './NavBar.scss';

function NavBar(){
    const username = "Callum";
    const pfp = "https://avatars.akamai.steamstatic.com/7d110e40accc4fda1623106c001b558f07556bdb_medium.jpg";
    const location = useLocation()

    // Welcome Page
    if (location.pathname === "/"){
      return null
    }
    
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
            
            <Nav.Link href="/home">Profile</Nav.Link>
          </Nav>
        {/*}  <Form className="d-flex">
            <LoginButton />
    </Form>  {*/}
          <Navbar.Text class = "username">
           {username} 
          </Navbar.Text>
          <Navbar.Text><img class="pfp" src={pfp} /></Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default NavBar;

