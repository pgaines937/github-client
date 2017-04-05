import React, { Component } from "react";
import { IndexLink } from "react-router";
import "./header.css";

export default class Header extends Component {
  onLogoutClick = event => {
    event.preventDefault();
    this.props.handleLogout();
  };

  render() {

    return <nav
    className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
      <button
        type="button"
        className="navbar-toggler navbar-toggler-right"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <IndexLink to="/" className="navbar-brand">
        <div title="Home" className="brand" />
        Home
      </IndexLink>
      </nav>;
  }
}

Header.propTypes = {
  location: React.PropTypes.object
};
