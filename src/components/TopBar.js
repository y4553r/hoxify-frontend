import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hoaxify-logo.png';

export class TopBar extends Component {
  render() {
    return(
      <div className="bg-white shadow-sm mb-2">
        <div className="wontainer">
          <nav className="navbar navbar-light navbar-expand">
            <Link to="/" className="navbar-brand">
              <img src={logo} width="60" alt="Hoaxify" /> Hoaxify
            </Link>
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
          </nav>
        </div>
      </div>
    );
  }
}

export default TopBar;