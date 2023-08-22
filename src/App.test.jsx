//App.test.jsx

import { render, screen, fireEvent } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import App from './App';
import { expect } from 'vitest';

expect.extend(matchers);

test('renders App component', () => {
  render(<App />);
  const header = screen.getByText('My Todolist');
  expect(header).toBeInTheDocument();
});

test('add todo',() => {
  render(<App/>);

  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Go to coffee' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '29.12.2023' } });
  const status = screen.getByPlaceholderText('Status');
  fireEvent.change(status, { target: { value: 'Open' } });
  const button = screen.getByText('Add');
  fireEvent.click(button);

  const table = screen.getByRole('table');
  expect(table).toHaveTextContent('Go to coffee','29.12.2023','Open');

  const button2 = screen.getByText('Clear');
  fireEvent.click(button2);
  expect(table).not.toHaveTextContent('Go to coffee','29.12.2023','Open')
})

test('delete todo',() => {
  render(<App/>);

  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Buy coffee' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '22.12.2023' } });
  const status = screen.getByPlaceholderText('Status');
  fireEvent.change(status, { target: { value: 'Close' } });
  const button = screen.getByText('Add');
  fireEvent.click(button);

  const table = screen.getByRole('table');
  expect(table).toHaveTextContent('Buy coffee','22.12.2023','Close');

  const button2 = screen.getByText('Delete');
  fireEvent.click(button2);
  expect(table).not.toHaveTextContent('Buy coffee','22.12.2023','Close')
})

