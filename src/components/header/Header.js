import React, { Component, PropTypes } from "react";
import { Link, IndexLink } from "react-router";
import "./header.css";

export default class Header extends Component {
  onLogoutClick = event => {
    event.preventDefault();
    this.props.handleLogout();
  };

  render() {
    const { user } = this.props;
    const pathname = this.props.location.pathname;
    const isReposPage = pathname.indexOf("repos") > -1;

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
  user: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
  location: React.PropTypes.object
};
