<?php
include '../config/db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $customer_name = $_POST['customer_name'];
    $address = $_POST['address'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (empty($customer_name) || empty($address) || empty($username) || empty($password)) {
        header("Location: ../user/register.php?error=emptyfields");
        exit();
    }

    // Check for unique customer name
    $sql_check_name = "SELECT customer_name FROM customer WHERE customer_name = ?";
    $stmt_check_name = $conn->prepare($sql_check_name);
    $stmt_check_name->bind_param("s", $customer_name);
    $stmt_check_name->execute();
    $stmt_check_name->store_result();

    if ($stmt_check_name->num_rows > 0) {
        $stmt_check_name->close();
        $conn->close();
        header("Location: ../user/register.php?error=nameistaken");
        exit();
    }
    $stmt_check_name->close();

    // unique username checker
    $sql_check = "SELECT username FROM customer WHERE username = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("s", $username);
    $stmt_check->execute();
    $stmt_check->store_result();

    if ($stmt_check->num_rows > 0) {
        $stmt_check->close();
        $conn->close();
        header("Location: ../user/register.php?error=usernametaken");
        exit();
    }
    $stmt_check->close();
    
    // password hasher
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // insert new customer into the database
    $sql_insert = "INSERT INTO customer (customer_name, address, username, password_hash) VALUES (?, ?, ?, ?)";
    $stmt_insert = $conn->prepare($sql_insert);
    $stmt_insert->bind_param("ssss", $customer_name, $address, $username, $password_hash);
    
    if ($stmt_insert->execute()) {
        // Registration successful, redirect to login page
        header("Location: ../user/cake_login.html?registration=success");
    } else {
        // Handle error - database insertion failed
        header("Location: ../user/register.php?error=dberror");
    }
    $stmt_insert->close();
    $conn->close();
    exit();
} else {
    header("Location: ../user/register.php");
    exit();
}
?> 