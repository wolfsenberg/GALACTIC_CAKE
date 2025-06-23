<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['customer_id']) && isset($_SESSION['customer_name'])) {
    echo json_encode([
        'success' => true,
        'customerId' => $_SESSION['customer_id'],
        'customerName' => $_SESSION['customer_name']
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'User not logged in.'
    ]);
}
?> 