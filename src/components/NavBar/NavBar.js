import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer,
} from "mdbreact";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {
    collapseFlag: false,
  };
  toggleCollapse = (collapseFlag) => () =>
    this.setState((prevState) => ({
      collapseFlag:
        prevState.collapseFlag !== collapseFlag ? collapseFlag : false,
    }));
  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse(true)}
      />
    );

    return (
      <div>
        <MDBNavbar dark expand="md" fixed="top">
          <MDBNavbarToggler onClick={this.toggleCollapse(true)} />
          <MDBCollapse
            id="navbarCollapse"
            isOpen={this.state.collapseFlag}
            navbar
          >
            <img
              className="icon"
              src={require("../../assets/img/jukebox.png")}
              alt=""
            />
            <strong className="text-white">JukeBox100</strong>
            <MDBContainer className="nav-bar-items">
              <NavLink
                exact
                to="/"
                className="navbar-default"
                activeClassName="navbar-active"
              >
                <strong className="white-text">Home</strong>
              </NavLink>
              <NavLink
                to="/favourites"
                className="navbar-default"
                activeClassName="navbar-active"
              >
                <strong className="white-text">Favourites</strong>
              </NavLink>
            </MDBContainer>
          </MDBCollapse>
        </MDBNavbar>
        {this.state.collapseFlag && overlay}
      </div>
    );
  }
}

export default NavBar;
