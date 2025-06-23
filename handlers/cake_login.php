<?php
session_start();
include '../config/db_connect.php';

header('Content-Type: application/json');

$response = ['success' => false, 'message' => 'Invalid request.'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    if (empty($username) || empty($password)) {
        $response['message'] = 'Username and password are required.';
    } else {
        $sql = "SELECT customer_id, customer_name, username, password_hash FROM customer WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password_hash'])) {
                $_SESSION['username'] = $user['username'];
                $_SESSION['customer_id'] = $user['customer_id'];
                $_SESSION['customer_name'] = $user['customer_name'];
                $response = ['success' => true, 'username' => $user['username']];
            } else {
                $response['message'] = 'Invalid credentials! Please check your username and password.';
            }
        } else {
            $response['message'] = 'Invalid credentials! Please check your username and password.';
        }
    }
}

echo json_encode($response);
?>