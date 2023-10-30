import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./Auth";

export default function UpdateRating() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [ratingData, setRatingData] = useState({});
    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    useEffect(() => {
        if (!user) {
            navigate("/user/login");
        } else {
            // Fetch the song details based on the ID
            axios.get(`http://localhost/backend/index.php?id=${id}`, { params: { action: "getRating" } })
                .then((response) => {
                    setRatingData(response.data);
                    console.log(response);
                    setInputs(response.data); // set initial form data
                })
                .catch((error) => {
                    console.error("Error fetching song details: ", error);
                });
        }
    }, [id, user, navigate]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Perform update request
        axios.post("http://localhost/backend/index.php", { inputs, action: "update", id })
            .then((response) => {
                if (response.data.status === 1) {
                    // Song was updated
                    navigate("/");
                } else {
                    // Update failed, display the error message from the backend
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
                    <h1>Update Song Rating</h1>
                    {message && <p className="text-danger">{message}</p>}
                    {user && <p>Username: {user}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Artist:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="artist"
                                onChange={handleChange}
                                value={inputs.artist || ''}
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
                                value={inputs.song || ''}
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
                                value={inputs.rating || ''}
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                        <button type="submit" className="mr-3 btn btn-primary" name="submit">
                            Update
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
