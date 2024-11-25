<?php
require_once __DIR__ . '/../config/jwt_config.php';
require_once __DIR__ . '/../vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

class JWTHandler {
    public static function generateToken($data) {
        $issuedAt = time();
        $expirationTime = $issuedAt + JWT_EXPIRATION_TIME;

        $payload = array(
            "iat" => $issuedAt,
            "exp" => $expirationTime,
            "data" => $data
        );

        return JWT::encode($payload, JWT_SECRET_KEY, JWT_ALGORITHM);
    }

    public static function verifyToken($token) {
        if(empty($token)) {
            return false;
        }

        try {
            $token = str_replace('Bearer ', '', $token);
            JWT::decode($token, new Key(JWT_SECRET_KEY, JWT_ALGORITHM));
            return true;
        } catch(Exception $e) {
            return false;
        }
    }

    public static function getUserIdFromToken($token) {
        try {
            $token = str_replace('Bearer ', '', $token);
            $decoded = JWT::decode($token, new Key(JWT_SECRET_KEY, JWT_ALGORITHM));
            return $decoded->data->id;
        } catch(Exception $e) {
            return null;
        }
    }
}
?>