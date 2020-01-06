import React, { Component } from 'react';

export class UserSignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      username: '',
      password: '',
      passwordRepeat: '',
    };
  }

  onChangeHandler = (name, e) => {
    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <div>
          <input
            type="text"
            placeholder="Your display name"
            value={this.state.displayName}
            onChange={(e) => this.onChangeHandler('displayName', e)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Your username"
            value={this.state.username}
            onChange={e => this.onChangeHandler('username', e)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder='Your password'
            value={this.state.password}
            onChange={e => this.onChangeHandler('password', e)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder='Repeat your password'
            value={this.state.passwordRepeat}
            onChange={e => this.onChangeHandler('passwordRepeat', e)}
          />
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </div>
    );
  }
}

export default UserSignupPage;