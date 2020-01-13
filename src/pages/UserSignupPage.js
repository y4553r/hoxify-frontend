import React, { Component } from 'react';

import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';

export class UserSignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      username: '',
      password: '',
      passwordRepeat: '',
      pendingApiCall: false,
      errors: {},
      passwordRepeatConfirmed: undefined
    };

    this.onClickSignup = this.onClickSignup.bind(this);
  }

  onChangeHandler = (name, e) => {
    const value = e.target.value;
    const errors = { ...this.state.errors };
    delete errors[name];
    this.setState({
      [name]: value,
      errors
    }, () => {
      if (name === "password") {
        const passwordRepeatConfirmed = this.state.passwordRepeat === value;
        const errors = { ...this.state.errors };
        errors.passwordRepeat = passwordRepeatConfirmed ?
          '' : 'Does not match to password';
        this.setState({ passwordRepeatConfirmed, errors });
      } else if (name === "passwordRepeat") {
        const passwordRepeatConfirmed = this.state.password === value;
        const errors = { ...this.state.errors };
        errors.passwordRepeat = passwordRepeatConfirmed ?
          '' : 'Does not match to password';
        this.setState({ passwordRepeatConfirmed, errors });
      }
    });
  }

  onClickSignup = () => {
    const { displayName, username, password } = this.state;
    const userObject = {
      username,
      displayName,
      password
    };
    this.setState({ pendingApiCall: true });
    this.props.actions.postSignup(userObject)
      .then(response => {
        this.setState({ pendingApiCall: false }, () => {
          this.props.history.push('/');
        });
      })
      .catch(apiError => {
        let errors = { ...apiError };
        if (apiError.response.data && apiError.response.data.validationErrors) {
          errors = { ...apiError.response.data.validationErrors };
        }
        this.setState({ pendingApiCall: false, errors: errors });
      });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Sign Up</h1>
        <div className="col-12 mb-3">
          <Input
            label="Your display name"
            type="text"
            placeholder="Your display name"
            value={this.state.displayName}
            onChange={(e) => this.onChangeHandler('displayName', e)}
            hasError={this.state.errors.displayName && true}
            error={this.state.errors.displayName}
          />
        </div>
        <div className="col-12 mb-3">
          <Input
            label="Your username"
            type="text"
            placeholder="Your username"
            value={this.state.username}
            onChange={e => this.onChangeHandler('username', e)}
            hasError={this.state.errors.username && true}
            error={this.state.errors.username}
          />
        </div>
        <div className="col-12 mb-3">
          <Input
            label="Your password"
            type="password"
            placeholder='Your password'
            value={this.state.password}
            onChange={e => this.onChangeHandler('password', e)}
            hasError={this.state.errors.password && true}
            error={this.state.errors.password}
          />
        </div>
        <div className="col-12 mb-3">
          <Input
            label="Repeat your password"
            type="password"
            placeholder='Repeat your password'
            value={this.state.passwordRepeat}
            onChange={e => this.onChangeHandler('passwordRepeat', e)}
            hasError={this.state.errors.passwordRepeat && true}
            error={this.state.errors.passwordRepeat}
          />
        </div>
        <ButtonWithProgress
          onClick={this.onClickSignup}
          disabled={this.state.pendingApiCall || !this.state.passwordRepeatConfirmed}
          pendingApiCall={this.state.pendingApiCall}
          text='Sign up'
        />
      </div>
    );
  }
}

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () => new Promise((resolve, reject) => {
      resolve({});
    }),
  },
  history: {
    push: () => {}
  }
};

export default UserSignupPage;