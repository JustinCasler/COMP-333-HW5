<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'includes/DbConnect.php';

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "POST":
        register();
}
function register() {
    
    $objDb = new DbConnect;
    $conn = $objDb->connect();
    $user = json_decode( file_get_contents('php://input') );
    $sql = "INSERT INTO users(username, password) VALUES(:username, :password)";
    $stmt = $conn->prepare($sql);
    $created_at = date('Y-m-d');
    $stmt->bindParam(':username', $user->username);
    $stmt->bindParam(':password', $user->password);
    print_r($user->username);
    print_r($user->password);
    
    if($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Record created successfully.'];
    } else {
        $response = ['status' => 0, 'message' => 'Failed to create record.'];
    }
    /*
    echo json_encode($response);
    */
}
