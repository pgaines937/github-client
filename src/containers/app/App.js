import React, { Component, PropTypes } from "react";

import { connect } from "react-redux";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import "./app.css";

class App extends Component {

  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="container">
          <Header
            location={this.props.location}
          />
          <div className="appContent">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

App.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { auth } = state;
  return {
    user: auth ? auth.user : null
  };
};

export default connect(mapStateToProps)(App);
