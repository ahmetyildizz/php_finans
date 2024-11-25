<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/Database.php';
include_once '../../models/Transaction.php';
include_once '../../utils/JWTHandler.php';

$database = new Database();
$db = $database->getConnection();

$transaction = new Transaction($db);

// Verify JWT token
$headers = apache_request_headers();
$token = $headers['Authorization'] ?? '';

if (!JWTHandler::verifyToken($token)) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

$transaction->user_id = JWTHandler::getUserIdFromToken($token);
$transaction->category = $data->category;
$transaction->amount = $data->amount;
$transaction->type = $data->type;
$transaction->description = $data->description;
$transaction->date = date('Y-m-d H:i:s');

if($transaction->create()) {
    http_response_code(201);
    echo json_encode(["message" => "Transaction created successfully"]);
} else {
    http_response_code(503);
    echo json_encode(["message" => "Unable to create transaction"]);
}
?>