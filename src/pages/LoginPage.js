import React, { Component } from 'react'
import { connect } from 'react-redux';

import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import * as authActions from '../redux/authActions';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      apiError: null,
      pendingApiCall: false,
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
    this.setState({ pendingApiCall: true });
    this.props.actions.postLogin(userObject)
      .then(response => {
        this.setState({ pendingApiCall: false }, () => {
          this.props.history.push('/');
        });
      })
      .catch(error => {
        this.setState({ pendingApiCall: false });
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
        <ButtonWithProgress
          onClick={this.onClickLogin}
          disabled={disableButton || this.state.pendingApiCall}
          pendingApiCall={this.state.pendingApiCall}
          text="Login"
        />
      </div>
    );
  }
}

LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({})),
  },
  dispatch: () => { }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      postLogin: body => dispatch(authActions.loginHandler(body)),
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginPage);