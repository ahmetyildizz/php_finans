<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
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

$goal->id = isset($_GET['id']) ? $_GET['id'] : die();
$goal->user_id = JWTHandler::getUserIdFromToken($token);

if($goal->delete()) {
    http_response_code(200);
    echo json_encode(["message" => "Goal deleted successfully"]);
} else {
    http_response_code(503);
    echo json_encode(["message" => "Unable to delete goal"]);
}
?>