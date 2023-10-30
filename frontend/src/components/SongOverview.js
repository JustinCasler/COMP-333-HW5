import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "./Auth";

export default function SongOverview() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            // If the user is not logged in, redirect them to the login page
            navigate("/user/login");
        }
    }, [user, navigate]);

    return (
        <div>
            {/*example of how to use the user state in components*/}
            {user ? (
                <p>Welcome, {user}!</p>
            ) : (
                <p>You are not logged in.</p>
            )}
            <h1>Song Overview</h1>
            <Link to="/user/newrating" className="btn btn-secondary ms-2">
                Add new Song Rating
            </Link>
        </div>
    );
}