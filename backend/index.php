<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE");
header("Access-Control-Allow-Credentials: true");

include 'includes/DbConnect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "POST") {
    // Parse the incoming JSON data
    $data = json_decode(file_get_contents('php://input'));

    if (isset($data->action)) {
        $action = $data->action;

        switch ($action) {
            case "register":
                register($data);
                break;
            case "login":
                login($data);
                break;
        }
    }
}

function register($data) {
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    // Check if the username already exists
    $checkUsernameQuery = "SELECT * FROM users WHERE username = :username";
    $checkUsernameStmt = $conn->prepare($checkUsernameQuery);
    $checkUsernameStmt->bindParam(':username', $data->inputs->username);
    $checkUsernameStmt->execute();

    if ($checkUsernameStmt->rowCount() > 0) {
        // Username already exists, return an error response
        $response = ['status' => 0, 'message' => 'Username is already taken.'];
        echo json_encode($response);
        return;
    }

    // Hash the password
    $hashedPassword = password_hash($data->inputs->password, PASSWORD_DEFAULT);

    // Username is not taken, proceed with the registration
    $sql = "INSERT INTO users(username, password) VALUES(:username, :password)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':username', $data->inputs->username);
    // Store the hashed password
    $stmt->bindParam(':password', $hashedPassword);

    if ($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Registration successful.'];
    } else {
        $response = ['status' => 0, 'message' => 'Failed to create record.'];
    }

    echo json_encode($response);
}

function login($data) {
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    // Retrieve the hashed password for the username
    $getPasswordQuery = "SELECT password FROM users WHERE username = :username";
    $getPasswordStmt = $conn->prepare($getPasswordQuery);
    $getPasswordStmt->bindParam(':username', $data->inputs->username);
    $getPasswordStmt->execute();

    if ($getPasswordStmt->rowCount() === 1) {
        $row = $getPasswordStmt->fetch(PDO::FETCH_ASSOC);
        $hashedPassword = $row['password'];

        // Verify the password
        if (password_verify($data->inputs->password, $hashedPassword)) {
            // Password is correct, return a success response
            session_start();
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $data->inputs->username;
            $response = ['status' => 1, 'message' => 'Login successful.'];
        } else {
            // Password is incorrect, return an error response
            $response = ['status' => 0, 'message' => 'Invalid username or password.'];
        }
    } else {
        // Username not found, return an error response
        $response = ['status' => 0, 'message' => 'Invalid username or password.'];
    }

    echo json_encode($response);
}