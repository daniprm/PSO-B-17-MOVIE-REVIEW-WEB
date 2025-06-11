/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserLoginPage from '../auth/login/page'
import * as loginAction from '../auth/actions'

jest.mock('../src/app/auth/actions', () => ({
  login: jest.fn(),
}));

describe('Integration Test - Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login form', () => {
    render(<UserLoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show alert if email or password is empty', () => {
    global.alert = jest.fn();
    render(<UserLoginPage />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(global.alert).toHaveBeenCalledWith('Email dan password wajib diisi.');
  });

  it('should show error message from login action', async () => {
    (loginAction.login as jest.Mock).mockResolvedValue('Email atau password salah');
    render(<UserLoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(screen.getByText(/email atau password salah/i)).toBeInTheDocument()
    );
  });

  it('should call login with correct credentials', async () => {
    (loginAction.login as jest.Mock).mockResolvedValue(null);
    render(<UserLoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'correctpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(loginAction.login).toHaveBeenCalledWith('test@example.com', 'correctpassword')
    );
  });
});
