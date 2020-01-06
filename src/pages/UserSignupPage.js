import React, { Component } from 'react';

export class UserSignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      username: '',
      password: '',
      passwordRepeat: '',
      pending: false,
    };

    this.onClickSignup = this.onClickSignup.bind(this);
  }

  onChangeHandler = (name, e) => {
    this.setState({
      [name]: e.target.value,
    });
  }

  onClickSignup = () => {
    const { displayName, username, password } = this.state;
    const userObject = {
      username,
      displayName,
      password
    };
    this.setState({ pending: true });
    this.props.actions.postSignup(userObject)
      .then(response => {
        this.setState({ pending: false });
      })
      .catch(error => {
        this.setState({ pending: false });
      });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Sign Up</h1>
        <div className="col-12 mb-3">
          <label>Display Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Your display name"
            value={this.state.displayName}
            onChange={(e) => this.onChangeHandler('displayName', e)}
          />
        </div>
        <div className="col-12 mb-3">
          <label>Username</label>
          <input
            className="form-control"
            type="text"
            placeholder="Your username"
            value={this.state.username}
            onChange={e => this.onChangeHandler('username', e)}
          />
        </div>
        <div className="col-12 mb-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            placeholder='Your password'
            value={this.state.password}
            onChange={e => this.onChangeHandler('password', e)}
          />
        </div>
        <div className="col-12 mb-3">
          <label>Repeat password</label>
          <input
            className="form-control"
            type="password"
            placeholder='Repeat your password'
            value={this.state.passwordRepeat}
            onChange={e => this.onChangeHandler('passwordRepeat', e)}
          />
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={this.onClickSignup}
            disabled={this.state.pending}
          >
            {this.state.pending && (
              <div className="spinner-border text-light spinner-border-sm mr-sm-1" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            Sign Up
          </button>
        </div>
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
};

export default UserSignupPage;