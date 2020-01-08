import React from 'react';
import { render,  fireEvent, cleanup, waitForDomChange, waitForElement } from '@testing-library/react';

import { UserSignupPage } from './UserSignupPage';

beforeEach(cleanup);

describe('UserSignupPage', () => {
  describe('layout', () => {
    it('has header of Sign up', () => {
      const { container } = render(<UserSignupPage />);
      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('Sign Up');
    });
    it('has input for display name', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText('Your display name');
      expect(displayNameInput).toBeInTheDocument();
    });
    it('has input for username', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const usernameInput = queryByPlaceholderText('Your username');
      expect(usernameInput).toBeInTheDocument();
    });
    it('has input for password', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Your password');
      expect(passwordInput).toBeInTheDocument();
    });
    it('has password type for password input', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Your password');
      expect(passwordInput.type).toBe("password");
    });
    it('has input for password repeat', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Repeat your password');
      expect(passwordInput).toBeInTheDocument();
    });
    it('has password type for password repeat input', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeat = queryByPlaceholderText('Repeat your password');
      expect(passwordRepeat.type).toBe("password");
    });
    it('has submit button', () => {
      const { container } = render(<UserSignupPage />);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    const changeEvent = content => ({
      target: {
        value: content,
      }
    });

    let button, displayNameInput, usernameInput, passwordInput, passwordRepeatInput;

    const setupForSubmit = (props) => {
      const rendered = render(<UserSignupPage {...props} />);
      const { container, queryByPlaceholderText } = rendered;

      displayNameInput = queryByPlaceholderText('Your display name');
      usernameInput = queryByPlaceholderText('Your username');
      passwordInput = queryByPlaceholderText('Your password');
      passwordRepeatInput = queryByPlaceholderText('Repeat your password');

      fireEvent.change(displayNameInput, changeEvent('my-display-name'));
      fireEvent.change(usernameInput, changeEvent('my-username'));
      fireEvent.change(passwordInput, changeEvent('P4ssword'));
      fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'));

      button = container.querySelector('button');

      return rendered;
    }

    const mockAsyncDelai = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({});
          }, 300);
        })
      })
    }

    it('sets the display name value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText('Your display name');
      fireEvent.change(displayNameInput, changeEvent('my-display-name'));
      expect(displayNameInput).toHaveValue('my-display-name');
    });
    it('sets the username value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const usernameInput = queryByPlaceholderText('Your username');
      fireEvent.change(usernameInput, changeEvent('my-username'));
      expect(usernameInput).toHaveValue('my-username');
    });
    it('sets the password value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Your password');
      fireEvent.change(passwordInput, changeEvent('P4ssword'));
      expect(passwordInput).toHaveValue('P4ssword');
    });
    it('sets the password repeat value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeatInput = queryByPlaceholderText('Repeat your password');
      fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'));
      expect(passwordRepeatInput).toHaveValue('P4ssword');
    });
    it('calls postSignup when the fields are valid and the actions are provided in props', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({})
      };
      setupForSubmit({ actions });
      fireEvent.click(button);
      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });
    it('does not throw exception when clicking the button when actions are not provided in props', () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });
    it('calls post with user body when the fields are valid', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({})
      };
      setupForSubmit({ actions });
      fireEvent.click(button);
      const expectedUserObject = {
        username: 'my-username',
        displayName: 'my-display-name',
        password: 'P4ssword'
      }
      expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
    });
    it('does not allow user to click submit button when there is an ongoing api call', () => {
      const actions = {
        postSignup: mockAsyncDelai(),
      };
      setupForSubmit({ actions });
      fireEvent.click(button);
      fireEvent.click(button);
      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });
    it('displays spinner when there is an ongoing api call', () => {
      const actions = {
        postSignup: mockAsyncDelai(),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      const spinner = queryByText('Loading...');
      expect(spinner).toBeInTheDocument();
    });
    it('hides spinner after api call finishes successfuly', async () => {
      const actions = {
        postSignup: mockAsyncDelai(),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      await waitForDomChange();
      const spinner = queryByText('Loading...');
      expect(spinner).not.toBeInTheDocument();
    });
    it('hides spinner after api call finishes with error', async () => {
      const actions = {
        postSignup: jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject({
                response: { data: {} }
              });
            }, 300);
          });
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      await waitForDomChange();
      const spinner = queryByText('Loading...');
      expect(spinner).not.toBeInTheDocument();
    });
    it('displays validation error for displayName when error is received for the field', async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                displayName: 'Cannot be null',
              }
            }
          }
        })
      };

      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      const errorMessage = await waitForElement(() => queryByText('Cannot be null'));
      expect(errorMessage).toBeInTheDocument();
    })
  });
});

console.error = () => { };