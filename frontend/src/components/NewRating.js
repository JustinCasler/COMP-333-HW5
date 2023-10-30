import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "./Auth"

export default function NewRating() {
    const { user } = useAuth();
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform your axios post request here
        axios.post("http://localhost/backend/index.php", { inputs, action: "addnew", username: user })
        .then((response) => {
            if (response.data.status === 1) {
                // Song was added
                navigate("/");
            } else {
                // Registration failed, display the error message from the backend
                setMessage(response.data.message);
            }
        })
        .catch((error) => {
            setMessage("An error occurred while processing your request.");
        });
    
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Add New Rating</h1>
                    {user && <p>Username: {user}</p>}
                    {message && <p className="text-danger">{message}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Artist:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="artist"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Song:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="song"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Rating:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="rating"
                                onChange={handleChange}
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                        <button type="submit" className="mr-3 btn btn-primary" name="submit">
                            Submit
                        </button>
                        <Link to="/" className="btn btn-secondary ms-2">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
