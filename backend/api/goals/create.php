<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/Database.php';
include_once '../../models/Goal.php';
include_once '../../utils/JWTHandler.php';

$database = new Database();
$db = $database->getConnection();

$goal = new Goal($db);

// Verify JWT token
$headers = apache_request_headers();
$token = $headers['Authorization'] ?? '';

if (!JWTHandler::verifyToken($token)) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

$goal->user_id = JWTHandler::getUserIdFromToken($token);
$goal->name = $data->name;
$goal->target_amount = $data->target_amount;
$goal->current_amount = $data->current_amount ?? 0;
$goal->deadline = $data->deadline;
$goal->category = $data->category;

if($goal->create()) {
    http_response_code(201);
    echo json_encode(["message" => "Goal created successfully"]);
} else {
    http_response_code(503);
    echo json_encode(["message" => "Unable to create goal"]);
}
?>