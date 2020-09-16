import React from "react";
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer,
} from "mdbreact";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

class NavBar extends React.Component {
  state = {
    collapseID: "",
  };
  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("navbarCollapse")}
      />
    );

    return (
      <div>
        <MDBNavbar dark expand="md" fixed="top">
          <MDBCollapse
            className="nav-bar-icon"
            id="navbarCollapse"
            isOpen={this.state.collapseID}
            navbar
          >
            <img
              className="icon"
              src={require("../../assets/img/jukebox.png")}
              alt=""
            />
            <strong className="text-white">JukeBox100</strong>
          </MDBCollapse>
          <MDBContainer>
            <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse")} />
            <MDBCollapse
              id="navbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
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
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        {this.state.collapseID && overlay}
      </div>
    );
  }
}

export default NavBar;
