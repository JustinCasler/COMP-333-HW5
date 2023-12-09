import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import Login from './Login';
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Auth";
import userEvent from '@testing-library/user-event';

describe('Login', () => {
  it('renders the login page', () => {
    render(
        <MemoryRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </MemoryRouter>
    );

    // Check if the input fields are rendered
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Check if the buttons are rendered
    const loginButton = screen.getByRole('button', { name: /login/i });
    const clearButton = screen.getByRole('button', { name: /clear/i });
    expect(loginButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();

    // Check if the text elements are rendered
    const pageTitle = screen.getByText(/login to playlistpulse/i);
    const createAccountText = screen.getByText(/don't have an account?/i);
    expect(pageTitle).toBeInTheDocument();
    expect(createAccountText).toBeInTheDocument();

  });

  it('navigates from login to registration page', () => {
    render(
        <BrowserRouter>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </BrowserRouter>
    );
    
        // Click the link to navigate
        fireEvent.click(screen.getByText(/Create one here/i));
        const createElement = screen.getByText(/Create one here/i);
        expect(createElement).toBeInTheDocument();
      
  });

  it('simulates user input for login', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
  
    // Simulate user typing into input fields using userEvent
    userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/password/i), 'testpassword');
  
    // Check if the input values are updated
    expect(screen.getByLabelText(/username/i).value).toBe('testuser');
    expect(screen.getByLabelText(/password/i).value).toBe('testpassword');
  });

  test('detects missing login credentials', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
  
    // Simulate user typing only username and not password
    userEvent.type(screen.getByLabelText(/username/i), 'incorrectuser');
    
    // Trigger the login action (replace with your actual login function)
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  

    // Check if the error message is displayed
    expect(screen.getByText(/Please don't leave any field blank./i)).toBeInTheDocument();

  });

});
