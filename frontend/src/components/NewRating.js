import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewRating() {
    return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h1>Add New Rating</h1>
            </div>
          </div>
        </div>
      );
}