import React, { Component } from 'react'

import Input from '../components/Input';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onChangeHandler = (name, event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="container">
        <h1 className="text-center">Login</h1>
        <div className="col-12 mb-3">
          <Input
            label="Username"
            value={username}
            onChange={e => this.onChangeHandler("username", e)}
            placeholder="Your username"
          />
        </div>
        <div className="col-12 mb-3">
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={e => this.onChangeHandler("password", e)}
            placeholder="Your password"
          />
        </div>
        <div className="text-center">
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    );
  }
}

export default LoginPage;