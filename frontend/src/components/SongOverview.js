import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./Auth";

export default function SongOverview() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);

    const handleLogout = () => {
        navigate("/user/login");
    };

    useEffect(() => {
        if (!user) {
            navigate("/user/login");
        } else {
            axios.get("http://localhost/backend/index.php", { params: { action: "overview" } })
                .then((response) => {
                    setSongs(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching songs: ", error);
                });
        }
    }, [user, navigate]);

    return (
        <div className="container mt-4">
            {user ? <p>Welcome, {user}!</p> : <p>You are not logged in.</p>}

            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1>Song Overview</h1>
                <div className="d-flex justify-content-end">
                    {user && (
                        <button className="btn btn-secondary me-2" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                    <Link to="/user/newrating" className="btn btn-secondary">
                        Add new Song Rating
                    </Link>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Artist</th>
                                <th>Song</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.map((song) => (
                                <tr key={song.ID}>
                                    <td>{song.ID}</td>
                                    <td>{song.username}</td>
                                    <td>{song.artist}</td>
                                    <td>{song.song}</td>
                                    <td>{song.rating}</td>
                                    <td>
                                        <Link to={`viewrating.php?id=${song.ID}`} className="btn btn-info me-1">View</Link>
                                        {user === song.username && (
                                            <>
                                                <Link to={`update.php?id=${song.ID}`} className="btn btn-warning me-1">Update</Link>
                                                <Link to={`delete.php?id=${song.ID}`} className="btn btn-danger">Delete</Link>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


