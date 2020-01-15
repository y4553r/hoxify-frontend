import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import App from './App';
import configureStore from '../redux/configureStore';

const setup = path => {
  const store = configureStore(false);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};
const changeEvent = content => ({
  target: {
    value: content,
  }
});

describe('App', () => {
  it('displays HomePage when url is /', () => {
    const { queryByTestId } = setup('/');
    expect(queryByTestId('homepage')).toBeInTheDocument();
  });
  it('displays LoginPage when url is /login', () => {
    const { container } = setup('/login');
    expect(container.querySelector('h1')).toHaveTextContent('Login');
  });
  it('displays only LoginPage when url is /login', () => {
    const { queryByTestId } = setup('/login');
    const homepageDiv = queryByTestId('homepage');
    expect(homepageDiv).not.toBeInTheDocument();
  });
  it('displays UserSignupPage when url is /signup', () => {
    const { container } = setup('/signup');
    expect(container.querySelector('h1')).toHaveTextContent('Sign Up');
  });
  it('displays userpage when path is other than /, /login or /signup', () => {
    const { queryByTestId } = setup('/user1');
    expect(queryByTestId('userpage')).toBeInTheDocument();
  });
  it('displays topBar when url is /', () => {
    const { container } = setup('/');
    const navigation = container.querySelector('nav');
    expect(navigation).toBeInTheDocument();
  });
  it('displays topBar when url is /login', () => {
    const { container } = setup('/login');
    const navigation = container.querySelector('nav');
    expect(navigation).toBeInTheDocument();
  });
  it('displays topBar when url is /signup', () => {
    const { container } = setup('/signup');
    const navigation = container.querySelector('nav');
    expect(navigation).toBeInTheDocument();
  });
  it('displays topBar when path is other than /, /login or /signup', () => {
    const { container } = setup('/user1');
    const navigation = container.querySelector('nav');
    expect(navigation).toBeInTheDocument();
  });
  it('shows UserSignupPage when clicking signup', () => {
    const { container, queryByText } = setup('/');
    const signupLink = queryByText('Sign up');
    fireEvent.click(signupLink);
    const header = container.querySelector('h1');
    expect(header).toHaveTextContent('Sign Up');
  });
  it('show LoginPage when clicking login', () => {
    const { container, queryByText } = setup('/');
    const loginLink = queryByText('Login');
    fireEvent.click(loginLink);
    const header = container.querySelector('h1');
    expect(header).toHaveTextContent('Login');
  });
  it('show HomePage when clicking the logo', () => {
    const { container, queryByTestId } = setup('/login');
    const logo = container.querySelector('img');
    fireEvent.click(logo);
    expect(queryByTestId('homepage')).toBeInTheDocument();
  });
  it('displays my profile on topbar after login success', async () => {
    const { queryByPlaceholderText, container, queryByText } = setup('/login');
    const userNameInput = queryByPlaceholderText('Your username');
    const passwordInput = queryByPlaceholderText('Your password');
    fireEvent.change(userNameInput, changeEvent('user1'));
    fireEvent.change(passwordInput, changeEvent('P4ssword'));
    const button = container.querySelector('button');
    axios.post = jest.fn().mockResolvedValue({
      data: {
        id: 1,
        username: 'user1',
        displayName: 'display1',
        image: 'profile1.png',
      }
    });
    fireEvent.click(button);
    const myProfileLink = await waitForElement(() => queryByText('Profile'));
    expect(myProfileLink).toBeInTheDocument();
  });
  it('displays profile on topbar after signup success', async () => {
    const { queryByPlaceholderText, container, queryByText } = setup('/signup');

    const displayNameInput = queryByPlaceholderText('Your display name');
    const usernameInput = queryByPlaceholderText('Your username');
    const passwordInput = queryByPlaceholderText('Your password');
    const passwordRepeatInput = queryByPlaceholderText('Repeat your password');

    fireEvent.change(displayNameInput, changeEvent('my-display-name'));
    fireEvent.change(usernameInput, changeEvent('my-username'));
    fireEvent.change(passwordInput, changeEvent('P4ssword'));
    fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'));

    const button = container.querySelector('button');
    axios.post = jest.fn().mockResolvedValueOnce({
      data: {
        message: "User saved",
      },
    }).mockResolvedValueOnce({
      data: {
        id: 1,
        username: 'user1',
        displayName: 'display1',
        image: 'profile1.png',
      } 
    });
    fireEvent.click(button);
    const myProfileLink = await waitForElement(() => queryByText('Profile'));
    expect(myProfileLink).toBeInTheDocument();
  })
});