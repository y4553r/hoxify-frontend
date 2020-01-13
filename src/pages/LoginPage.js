import React, { Component } from 'react'

import Input from '../components/Input';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      apiError: null,
    };
  }

  onChangeHandler = (name, event) => {
    this.setState({
      [name]: event.target.value,
      apiError: null
    });
  }

  onClickLogin = () => {
    const userObject = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.actions.postLogin(userObject)
      .catch(error => {
        if (error.response)
          this.setState({ apiError: error.response.data.message })
      });
  }

  render() {
    const { username, password, apiError } = this.state;
    const disableButton = username === '' || password === '';
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
        {apiError && (
          <div className="col-12 mb-3">
            <div className="alert alert-danger" role="alert">
              {apiError}
            </div>
          </div>
        )}
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={this.onClickLogin}
            disabled={disableButton}
          >Login</button>
        </div>
      </div>
    );
  }
}

LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({})),
  }
}

export default LoginPage;