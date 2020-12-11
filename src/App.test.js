import { render, screen } from '@testing-library/react';
import ReactToDo from './ToDo';

test('renders learn react link', () => {
  render(<ReactToDo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
