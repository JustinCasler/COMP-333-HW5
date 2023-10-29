<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

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

    // Username is not taken, proceed with the registration
    $sql = "INSERT INTO users(username, password) VALUES(:username, :password)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':username', $data->inputs->username);
    $stmt->bindParam(':password', $data->inputs->password);

    if ($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Record created successfully.'];
    } else {
        $response = ['status' => 0, 'message' => 'Failed to create record.'];
    }

    echo json_encode($response);
}