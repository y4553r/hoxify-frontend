import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Input from './Input';

beforeEach(cleanup);

describe('layout', () => {
  it('has input item', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });
  it('displays the label provided in props', () => {
    const { queryByText } = render(<Input label='Test label' />);
    const label = queryByText('Test label');
    expect(label).toBeInTheDocument();
  });
  it('does not display the label when no label was provided in props', () => {
    const { container } = render(<Input />);
    const label = container.querySelector('label');
    expect(label).not.toBeInTheDocument();
  });
  it('has text type of input when type is not provided as prop', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input.type).toBe('text');
  });
  it('has password type for input when password type is provided in prop', () => {
    const { container } = render(<Input type='password' />);
    const input = container.querySelector('input');
    expect(input.type).toBe('password');
  });
  it('displays placeholder when it is provided as prop', () => {
    const { container } = render(<Input placeholder='placeholder-test' />);
    const input = container.querySelector('input');
    expect(input.placeholder).toBe('placeholder-test');
  });
  it('displays value when it is provided as prop', () => {
    const { container } = render(<Input value='test value' />);
    const input = container.querySelector('input');
    expect(input.value).toBe('test value');
  });
  it('has onChange callback when it is provided as prop', () => {
    const onChange = jest.fn();
    const { container } = render(<Input onChange={onChange} />);
    const input = container.querySelector('input');
    const changeEvent = {
      target: {
        value: 'test-change',
      }
    }
    fireEvent.change(input, changeEvent);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('has default style when theres no validation error or success', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input.className).toBe('form-control');
  });
  it('has style for error case when there is an error', () => {
    const { container } = render(<Input hasError={true} />);
    const input = container.querySelector('input');
    expect(input.className).toBe('form-control is-invalid');
  });
  it('displays the error text when it is provided', () => {
    const { queryByText } = render(<Input hasError={true} error='test-error' />);
    const error = queryByText('test-error');
    expect(error).toBeInTheDocument();
  });
  it('does not display error when hasError is not provided', () => {
    const { queryByText } = render(<Input error='test-error' />);
    const error = queryByText('test-error');
    expect(error).not.toBeInTheDocument();
  })
});