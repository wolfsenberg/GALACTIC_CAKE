<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galactic Cake - Register</title>
    <link rel="stylesheet" href="../cake_login.css">
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <h2 class="login-title">Register for Galactic Cake</h2>
            <?php
                if (isset($_GET['error'])) {
                    echo '<div class="error-message">';
                    if ($_GET['error'] == "emptyfields") {
                        echo 'Fill in all fields!';
                    } else if ($_GET['error'] == "usernametaken") {
                        echo 'Username is already taken!';
                    } else if ($_GET['error'] == "nameistaken") {
                        echo 'That name is already registered.';
                    } else if ($_GET['error'] == "dberror") {
                        echo 'A database error occurred. Please try again later.';
                    }
                    echo '</div>';
                }
            ?>
            <form action="../handlers/register.php" method="POST">
                <div class="form-group">
                    <label for="customer_name" class="form-label">Full Name</label>
                    <input type="text" name="customer_name" id="customer_name" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" name="address" id="address" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" name="username" id="username" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" name="password" id="password" class="form-input" required>
                </div>
                <button type="submit" class="login-btn">Register</button>
            </form>
            <p style="margin-top: 20px;">Already have an account? <a href="cake_login.html">Login here</a>.</p>
        </div>
    </div>
</body>
</html> 