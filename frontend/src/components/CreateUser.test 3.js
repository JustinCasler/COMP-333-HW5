import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateUser from './CreateUser';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Auth';
import userEvent from '@testing-library/user-event';

describe('CreateUser', () => {
  it('renders the create user page', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CreateUser />
        </AuthProvider>
      </MemoryRouter>
    );

    // Check if the input fields are rendered
    const usernameInput = screen.getByLabelText(/new username/i);
    const passwordInput = screen.getByLabelText(/new password/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmInput).toBeInTheDocument();

    // Check if the buttons are rendered
    const submitButton = screen.getByRole('button', { name: /submit/i });
    const clearButton = screen.getByRole('button', { name: /clear/i });
    expect(submitButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();

    // Check if the text elements are rendered
    const pageTitle = screen.getByText(/sign up for playlistpulse/i);
    const loginLink = screen.getByText(/already have an account?/i);
    expect(pageTitle).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  it('navigates from create user to login page', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CreateUser />
        </AuthProvider>
      </BrowserRouter>
    );

    // Click the link to navigate
    fireEvent.click(screen.getByText(/Login here/i));
    const loginElement = screen.getByText(/Login here/i);
    expect(loginElement).toBeInTheDocument();
  });

  it('simulates user input for create user', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CreateUser />
        </AuthProvider>
      </MemoryRouter>
    );

    // Simulate user typing into input fields using userEvent
    userEvent.type(screen.getByLabelText(/new username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/new password/i), 'testpassword');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'testpassword');

    // Check if the input values are updated
    expect(screen.getByLabelText(/new username/i).value).toBe('testuser');
    expect(screen.getByLabelText(/new password/i).value).toBe('testpassword');
    expect(screen.getByLabelText(/confirm password/i).value).toBe('testpassword');
  });

  test('detects missing create user credentials', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CreateUser />
        </AuthProvider>
      </MemoryRouter>
    );

    // Simulate user typing only username and not password or confirm password
    userEvent.type(screen.getByLabelText(/new username/i), 'testuser');

    // Trigger the submit action
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check if the error message is displayed
    expect(screen.getByText(/Please dont leave any field blank/i)).toBeInTheDocument();
  });

  test('detects mismatched passwords', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CreateUser />
        </AuthProvider>
      </MemoryRouter>
    );

    // Simulate user typing with mismatched passwords
    userEvent.type(screen.getByLabelText(/new username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/new password/i), 'testpassword');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'mismatchedpassword');

    // Trigger the submit action
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check if the error message is displayed
    expect(screen.getByText(/Password and Confirm Password must match./i)).toBeInTheDocument();
  });

});
