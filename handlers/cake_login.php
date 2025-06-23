<?php
session_start();
include '../config/db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Validate user credentials
    $sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password_hash'])) {
            // User found and password is correct, set session variables
            $_SESSION['username'] = $user['username'];
            $_SESSION['customer_id'] = $user['customer_id'];
            header("Location: ../cake.html");
            exit();
        }
    } else {
        $error = "Invalid username or password.";
    }
}
?>