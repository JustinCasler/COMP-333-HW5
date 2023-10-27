import { useState } from "react";
import axios from "axios";
export default function CreateUser() {
    const [inputs, setInputs] = useState({})

    const handleChange = (event) => {
        const name = event.target.name 
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost/backend/user/save', inputs)
        console.log(inputs)

        function validateForm() {
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            var confirmPassword = document.getElementById("confirmPassword").value;
            console.log(username)
            if (username == null || username.length ==0){
                alert("Username cannot be blank");
                // Prevent form submission
                return false; 
            }
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                // Prevent form submission
                return false; 
            }
            if (password.length < 10) {
                alert("Password must be at least 10 characters long!");
                // Prevent form submission
                return false; 
            }
            // Allow form submission
            return true; 
        }
        function clearForm() {
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            document.getElementById("confirmPassword").value = "";
            // You can add more input fields to clear here
        }
    }
    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input type="text" name="username" onChange={handleChange}/>
                <br />
                <label>Password: </label>
                <input type="password" name="password" onChange={handleChange}/>
                <br />
                <label>Confirm Password: </label>
                <input type="password" name="confirm" onChange={handleChange}/>
                <br />
                <button>Submit</button>
            </form>
        </div>
    )
}