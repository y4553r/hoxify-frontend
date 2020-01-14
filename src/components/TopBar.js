import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../assets/hoaxify-logo.png';

export class TopBar extends Component {
  render() {
    const { user } = this.props;
    const { id, username, displayName, password, image, isLoggedIn } = user;

    let links = (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            Sign up
                </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
                </Link>
        </li>
      </ul>
    );
    if (isLoggedIn) {
      links = (
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={`/${username}`} className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <div className="bg-white shadow-sm mb-2">
        <div className="wontainer">
          <nav className="navbar navbar-light navbar-expand">
            <Link to="/" className="navbar-brand">
              <img src={logo} width="60" alt="Hoaxify" /> Hoaxify
            </Link>
            {links}
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(TopBar);