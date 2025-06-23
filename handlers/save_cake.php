<?php
session_start();
include '../config/db_connect.php';

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['customer_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit();
}

// Get the POST data from the JavaScript fetch
$data = json_decode(file_get_contents('php://input'), true);

$cakeDesign = $data['design'] ?? null;
$layers = $data['layerCount'] ?? null;
$toppings = $data['toppings'] ?? [];

// Basic validation
if (!$cakeDesign || !$layers) {
    echo json_encode(['success' => false, 'message' => 'Incomplete cake details provided.']);
    exit();
}

// Convert toppings array to a comma-separated string
$toppingsString = implode(', ', $toppings);

// Hardcode artist_id for now. We can change this later.
$artistId = 1;

// Prepare and execute the INSERT statement
try {
    $sql = "INSERT INTO cake (artist_id, cake_design, layers, toppings) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isis", $artistId, $cakeDesign, $layers, $toppingsString);
    
    if ($stmt->execute()) {
        $newCakeId = $conn->insert_id;
        echo json_encode(['success' => true, 'cakeId' => $newCakeId]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save cake.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

$stmt->close();
$conn->close();
?> 