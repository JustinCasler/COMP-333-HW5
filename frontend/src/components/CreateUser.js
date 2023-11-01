import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateUser() {
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

    if (Object.keys(inputs).length < 3) {
      setError("Please dont leave any field blank");
    } else if(inputs.password !== inputs.confirm) {
      setError("Password and Confirm Password must match.");
    } else if (inputs.password.length < 10) {
      setError("Password must be at least 10 characters long.");
    } else {
      setError(null);

      // Perform your axios post request here
      axios.post("http://localhost/backend/index.php", { inputs, action: "register" })
        .then((response) => {
          if (response.data.status === 1) {
            // Registration was successful
            navigate("/user/login");
          } else {
            // Registration failed, display the error message from the backend
            setMessage(response.data.message);
          }
        })
        .catch((error) => {
          setMessage("An error occurred while processing your request.");
        });
    }
  };

  const handleClear = () => {
    setInputs({});
    setError(null);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
            <h1 className="card-title text-center">Sign Up for PlaylistPulse</h1>
              {error && <p className="text-danger text-center">{error}</p>}
              {message && <p className="text-danger text-center">{message}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
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
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm" className="form-label">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirm"
                    className="form-control"
                    name="confirm"
                    value={inputs.confirm || ""}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="mr-3 btn btn-primary" name="submit">
                Submit
                </button>
                <button type="button" className="ml-3 btn btn-secondary" name="clear" onClick={handleClear}>
                Clear
                </button>
                <p>
                  Already have an account? <Link to="/user/login">Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}