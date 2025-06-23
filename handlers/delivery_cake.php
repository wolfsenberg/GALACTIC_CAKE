<?php
session_start();
include '../config/db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $address = $_POST['address'];
    $phone = $_POST['phone'];

    // Insert delivery information into the database
    $sql = "INSERT INTO deliveries (username, address, phone) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $_SESSION['username'], $address, $phone);
    if ($stmt->execute()) {
        // Delivery information saved successfully
        header("Location: ../success.html");
        exit();
    } else {
        $error = "Error: " . $stmt->error;
    }
}
?>