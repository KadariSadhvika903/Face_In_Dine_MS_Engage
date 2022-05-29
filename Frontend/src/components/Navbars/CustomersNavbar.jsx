import React from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

import "../../assets/css/customernavbar.css";
import { auth } from '../../services/firebase.js';
import CartModal from '../CartModal.jsx';


class CustomersNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    })
  }

  logOut = () => {
    auth.signOut().then(() => {
      console.log('Logged out');
    }).catch((error) => {
      console.log(error.message);
    })
    this.props.history.push('/login-page');
  }

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-horizontal navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/home-customers" tag={Link} >
                <img
                  alt="..."
                  src={require("../../assets/img/brand/Logo.png")}
                  style={{ height: "50px" }}
                />
                <span> Face-In Dine </span>
              </NavbarBrand>

              <button
                aria-controls="navbar-primary"
                aria-expanded={false}
                aria-label="Toggle navigation"
                className="navbar-toggler"
                data-target="#navbar-primary"
                data-toggle="collapse"
                id="navbar-primary"
                type="button"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar-primary">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <NavbarBrand className="mr-lg-5 pr-4 pl-3 py-2" style={{ backgroundColor: 'black' }} to="/home-customers" tag={Link} >
                        <img
                          alt="..."
                          src={require("../../assets/img/brand/Logo.png")}
                          style={{ height: "50px" }}
                        />
                        <span> Face-In Dine </span>
                      </NavbarBrand>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button
                        aria-controls="navbar-primary"
                        aria-expanded={false}
                        aria-label="Toggle navigation"
                        className="navbar-toggler"
                        data-target="#navbar-primary"
                        data-toggle="collapse"
                        id="navbar-primary"
                        type="button"
                      >
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="ml-lg-auto" navbar>
                  {/* <NavItem>
                  <NavLink href="/customers-profile" onClick={e => e.preventDefault()}>
                    Profile
                  </NavLink>
                </NavItem> */}
                  <NavItem>
                    <NavLink href="/customers-profile">
                      <i className="ni ni-circle-08" />
                      <span className="nav-link-inner--text d-lg-none">
                        Profile
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          collapseOpen: true
                        })
                      }}
                    >
                      <i className="ni ni-cart" />
                      <span className="nav-link-inner--text d-lg-none">
                        Cart
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/login-page" onClick={this.logOut}>
                      <i className="fa fa-sign-out" />
                      <span className="nav-link-inner--text d-lg-none">
                        Log Out
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
          {
            this.props.cart ? (
              <CartModal data={this.props.cart} placeOrder={this.props.placeOrder} openModal={this.state.collapseOpen} toggleModal={this.toggleCollapse} />
            ) : null
          }
        </header>
      </>
    );
  }
}

export default CustomersNavbar;
