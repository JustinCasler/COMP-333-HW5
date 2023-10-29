import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputs.username || !inputs.password) {
      setError("Please don't leave any field blank.");
    } else {
      // Reset error state
      setError(null);

      // Perform your login logic here
      axios
        .post("http://localhost/backend/login.php", { inputs, action: "login" })
        .then((response) => {
          if (response.data.status === 1) {
            // Login was successful
            setMessage("Login successful.");
            navigate("/");
          } else {
            // Login failed, display the error message from the backend
            setMessage(response.data.message);
          }
        })
        .catch((error) => {
          setMessage("An error occurred while processing your request.");
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Login to PlaylistPulse</h1>
              {error && <p className="text-danger text-center">{error}</p>}
              {message && <p className="text-danger text-center">{message}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    name="username"
                    value={inputs.username || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="mr-3 btn btn-primary" name="submit">
                  Login
                </button>
                <button
                  type="button"
                  className="ml-3 btn btn-secondary"
                  name="clear"
                  onClick={() => {
                    setInputs({});
                    setError(null);
                  }}
                >
                  Clear
                </button>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <Link to="/user/create">Create one here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}