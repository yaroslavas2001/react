import { render, screen } from '@testing-library/react';
import MainApp from './App';
test('renders learn react link', () => {
  render(<MainApp />);
  const linkElement = screen.getByRole(/main/i);
  expect(linkElement).toBeInTheDocument();
});
