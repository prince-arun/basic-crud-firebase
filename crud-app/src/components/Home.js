import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import headPhone from "../assets/headphones.jpg";
import shoe from "../assets/shoes.jpg";
import watch from "../assets/watchs.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home h-100vh">
      {/*----------------------------------- Nav bar-------------------- */}
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary pt-3 pb-3"
      >
        <Container>
          <Navbar.Brand href="#home" className="bName">
            Pine Frost
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav>
              <Link to="/register">
                <Button variant="outline-info" className="ps-10px">
                  Sign Up
                </Button>{" "}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ------------------------------carousal-------------------------------- */}
      <Carousel className="w-90  ">
        <Carousel.Item>
          <img className="d-block w-100 " src={headPhone} alt="First slide" />
          <Carousel.Caption className="brands">
            <h3>Branded Headpones</h3>
            <p>Sony, SkullCandy, BoAt, Realme, </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={shoe} alt="Second slide" />

          <Carousel.Caption className="brands">
            <h3>Branded Shoes</h3>
            <p>Adidas, Rebook, Nike</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={watch} alt="Third slide" />

          <Carousel.Caption className="brands">
            <h3>Branded Digital Watch</h3>
            <p>Sonata, i-watch, Rolex, Swiss</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
