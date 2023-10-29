import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SongOverview() {
    return (
        <div>
            <h1>Song Overview</h1>
            <Link to="/user/newrating" className="btn btn-secondary ms-2">
                Add new Song Rating
            </Link>
        </div>
    );
}