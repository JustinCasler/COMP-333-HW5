import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./Auth";

export default function SongOverview() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);
    const [sortBy, setSortBy] = useState(""); // State to store the selected sorting option

    const handleLogout = () => {
        navigate("/user/login");
    };

    useEffect(() => {
        if (!user) {
            navigate("/user/login");
        } else {
            axios.get("http://localhost/backend/index.php", { params: { action: "overview", sort_by: sortBy } })
                .then((response) => {
                    setSongs(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error("Error fetching songs: ", error);
                });
        }
    }, [user, navigate, sortBy]);

    const handleSort = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-center">
                <div className="d-flex align-items-center">
                    <img src="/pulse.jpeg" alt="PlaylistPulse" style={{ width: "80px", marginRight: "10px" }} />
                    <h1 style={{ margin: "0" }}>PlaylistPulse</h1>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1>Song Overview</h1>
                <div className="d-flex justify-content-end">
                    {user && (
                        <button className="btn btn-secondary btn-sm me-2" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                    <Link to="/user/newrating" className="btn btn-secondary btn-sm">
                        Add New Song Rating
                    </Link>
                    <select className="form-select ms-3" onChange={handleSort}>
                        <option value="">Sort By</option>
                        <option value="artist">Artist (A-Z)</option>
                        <option value="-artist">Artist (Z-A)</option>
                        <option value="rating">Rating (Low to High)</option>
                        <option value="-rating">Rating (High to Low)</option>
                    </select>
                </div>
            </div>


            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Artist</th>
                                <th>Song</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.map((song) => (
                                <tr key={song.ID}>
                                    <td>{song.username}</td>
                                    <td>{song.artist}</td>
                                    <td>{song.song}</td>
                                    <td>{song.rating}</td>
                                    <td>
                                        {user === song.username && (
                                            <>
                                                <Link to={`/user/update?id=${song.ID}`} className="btn btn-warning me-1">
                                                    Update
                                                </Link>
                                                <Link to={`/user/delete?id=${song.ID}`} className="btn btn-danger">
                                                    Delete
                                                </Link>
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
