import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from '../src/pages/Login';
import { BrowserRouter } from 'react-router-dom';

// Mock the useAuth hook
vi.mock('../src/hooks/useAuth', () => ({
  default: () => ({
    login: vi.fn(),
    loading: false,
  }),
}));

describe('Login Component', () => {
  test('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    // Check that main elements are rendered
    expect(screen.getByText('Employee Stock Dashboard')).toBeDefined();
    expect(screen.getByLabelText(/Email Address/i)).toBeDefined();
    expect(screen.getByLabelText(/Password/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeDefined();
    
    // Check for demo credentials text
    expect(screen.getByText(/For demo purposes/i)).toBeDefined();
    expect(screen.getByText(/demo@example.com/i)).toBeDefined();
  });
});