<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/Database.php';
include_once '../../models/User.php';
include_once '../../utils/JWTHandler.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$user->email = $data->email;
$user->password = $data->password;

$user_data = $user->login();

if($user_data) {
    $jwt = JWTHandler::generateToken([
        'id' => $user_data['id'],
        'email' => $user_data['email'],
        'role' => $user_data['role']
    ]);

    http_response_code(200);
    echo json_encode([
        "message" => "Login successful",
        "token" => $jwt,
        "user" => [
            "id" => $user_data['id'],
            "name" => $user_data['name'],
            "email" => $user_data['email'],
            "role" => $user_data['role']
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Invalid credentials"]);
}
?>