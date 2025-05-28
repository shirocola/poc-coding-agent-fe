import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from '../src/components/AuthRoute';

// Mock the useAuth hook
vi.mock('../src/hooks/useAuth', () => ({
  default: () => ({
    isAuthenticated: true,
    loading: false,
  }),
}));

describe('AuthRoute Component', () => {
  test('renders child routes when authenticated', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Protected Content')).toBeDefined();
  });
});