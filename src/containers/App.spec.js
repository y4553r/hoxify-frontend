import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

const setup = path => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

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
});