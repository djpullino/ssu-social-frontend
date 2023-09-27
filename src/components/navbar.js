import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  const [user, setUser] = useState({})

  useEffect(() => {
  setUser(getUserInfo())
  }, [])
  
  
  return (
    <ReactNavbar bg="dark" variant="dark">
    <Container>
      <Nav className="me-auto">
        <Nav.Link href="/feed-algorithm">Feed</Nav.Link>
        <Nav.Link href="/project-notes-contributors">About</Nav.Link>
        <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
        <Nav.Link href="/createpost">Create Post</Nav.Link>
       <Nav.Link href="/getallpost">All Posts</Nav.Link>
  

      </Nav>
    </Container>
  </ReactNavbar>

  );
}