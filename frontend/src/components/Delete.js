import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./Auth";

export default function DeleteRating() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    useEffect(() => {
        if (!user) {
            navigate("/user/login");
        }
    }, [user, navigate]);

    const handleDelete = () => {
        axios
            .post("http://localhost/backend/index.php", { id: id, action: "delete" })
            .then((response) => {
                if (response.data.status === 1) {
                    // Rating was deleted
                    navigate("/");
                } else {
                    // Deletion failed, display the error message from the backend
                    setMessage(response.data.message);
                }
            })
            .catch((error) => {
                setMessage("An error occurred while processing your request.");
            });
    };

    return (
        <div className="container mt-5">
            
            <h1>Delete Rating</h1>
            {user && <p>Username: {user}</p>}
            <p>Are you sure you want to delete this rating?</p>

            <button className="btn btn-danger" onClick={handleDelete}>
                Yes
            </button>
            <Link to="/" className="btn btn-secondary ms-2">
                No
            </Link>

            {message && <p className="text-danger">{message}</p>}
        </div>
    );
}
