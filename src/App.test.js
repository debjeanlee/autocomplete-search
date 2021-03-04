import { render, screen } from '@testing-library/react';
import App from './App';

test('renders autocomplete search', () => {
    render(<App />);
    const linkElement = screen.getByText(/autocomplete/i);
    const linkElement2 = screen.getByText(/search/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
  });