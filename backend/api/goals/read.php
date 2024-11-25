<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
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

$goal->user_id = JWTHandler::getUserIdFromToken($token);
$stmt = $goal->getUserGoals();
$num = $stmt->rowCount();

if($num > 0) {
    $goals_arr = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $goal_item = array(
            "id" => $id,
            "name" => $name,
            "target_amount" => $target_amount,
            "current_amount" => $current_amount,
            "deadline" => $deadline,
            "category" => $category,
            "status" => $status,
            "created_at" => $created_at
        );
        array_push($goals_arr, $goal_item);
    }
    http_response_code(200);
    echo json_encode($goals_arr);
} else {
    http_response_code(200);
    echo json_encode([]);
}
?>