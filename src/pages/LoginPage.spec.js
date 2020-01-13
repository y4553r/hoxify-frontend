import React from 'react';
import { render, fireEvent, waitForElement, queryByTestId } from '@testing-library/react';

import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  describe('Layout', () => {
    it('has header of Login', () => {
      const { container } = render(<LoginPage />);
      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('Login');
    });
    it('has input for username', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const usernameInput = queryByPlaceholderText("Your username");
      expect(usernameInput).toBeInTheDocument();
    });
    it('has input for password', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const passwordInput = queryByPlaceholderText("Your password");
      expect(passwordInput).toBeInTheDocument();
    });
    it('has password type for password input', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const passwordInput = queryByPlaceholderText("Your password");
      expect(passwordInput.type).toBe("password");
    });
    it("has login button", () => {
      const { container } = render(<LoginPage />);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    const changeEvent = content => ({
      target: {
        value: content
      }
    });

    let usernameInput, passwordInput, button;
    const setupForSubmit = (props) => {
      const rendered = render(<LoginPage {...props} />);
      usernameInput = rendered.queryByPlaceholderText("Your username");
      passwordInput = rendered.queryByPlaceholderText("Your password");
      button = rendered.container.querySelector("button");
      fireEvent.change(usernameInput, changeEvent("test-username"));
      fireEvent.change(passwordInput, changeEvent("P4ssword"));
      return rendered;
    }

    it('sets the username value into state', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const usernameInput = queryByPlaceholderText("Your username");
      fireEvent.change(usernameInput, changeEvent("test-username"));
      expect(usernameInput.value).toBe("test-username");
    });
    it('sets the password value into state', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const passwordInput = queryByPlaceholderText("Your password");
      fireEvent.change(passwordInput, changeEvent("P4ssword"));
      expect(passwordInput.value).toBe("P4ssword");
    });
    it('calls postLogin when the actions are provided in props and input fields have value', () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({}),
      };
      setupForSubmit({ actions });
      fireEvent.click(button);
      expect(actions.postLogin).toHaveBeenCalledTimes(1);
    });
    it('does not throw exception when clicking the button when actions not provided in props', () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });
    it('calls postLogin with credentials in body', () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({}),
      };
      setupForSubmit({ actions });
      fireEvent.click(button);
      const expectedUserObject = {
        username: 'test-username',
        password: 'P4ssword',
      };
      expect(actions.postLogin).toHaveBeenCalledWith(expectedUserObject);
    });
    it('enables the button when the username and password are not empty', () => {
      setupForSubmit();
      expect(button).not.toBeDisabled();
    });
    it('disables the button when the username is empty', () => {
      setupForSubmit();
      fireEvent.change(usernameInput, changeEvent(''));
      expect(button).toBeDisabled();
    });
    it('disables the button when the password is empty', () => {
      setupForSubmit();
      fireEvent.change(passwordInput, changeEvent(''));
      expect(button).toBeDisabled();
    });
    it('displays alert when login fails', async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'Login failed',
            }
          }
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      const alert = await waitForElement(() => queryByText('Login failed'));
      expect(alert).toBeInTheDocument();
    });
    it('clears alert when user changes username', async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'Login failed',
            }
          }
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      await waitForElement(() => queryByText('Login failed'));
      fireEvent.change(usernameInput, changeEvent('username-update'));
      const alert = queryByText('Login failed');
      expect(alert).not.toBeInTheDocument();
    });
    it('clears alert when user changes password', async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'Login failed'
            }
          }
        })
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      await waitForElement(() => queryByText('Login failed'));
      fireEvent.change(passwordInput, changeEvent('password update'));
      const alert = queryByText('Login failed');
      expect(alert).not.toBeInTheDocument();
    });
  });
});