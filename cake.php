<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CakeVerse - Custom Cosmic Cakes</title>
    <link href="https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="cake.css">
</head>
<body>
    <div class="stars" id="stars"></div>
    
    <div class="planet-decoration planet-1"></div>
    <div class="planet-decoration planet-2"></div>
    <div class="planet-decoration planet-3"></div>

    <!-- Checkout Modal -->
    <div class="modal-overlay" id="checkoutModal">
        <div class="checkout-modal">
            <div class="modal-header">
                <h3 class="modal-title">Your Cart</h3>
                <button class="close-modal" id="closeModal">&times;</button>
            </div>
            <div class="modal-body" id="cartItems">
                <!-- Cart items will be added here -->
            </div>
            <div class="total-price" id="cartTotal">Total: ₪0</div>
            <div class="modal-footer">
                <button class="modal-btn continue-btn" id="proceedToDelivery">Proceed to Delivery</button>
                <button class="modal-btn cancel-btn" id="cancelCheckout">Continue Shopping</button>
            </div>
        </div>
    </div>

    <div class="container">
        <header>
            <h1>Welcome to CakeVerse</h1>
            <p class="subtitle">Where Every Bite is a Journey Through the Stars!</p>
        </header>

        <div class="main-content">
            <div class="customization-section">
                <h2 class="section-title">Design Your Intergalactic Cake</h2>
                
                <div class="option-group">
                    <h3 class="option-title">Cake Design</h3>
                    <div class="options-container" id="designOptions">
                        <button class="option-btn" data-value="galactic">
                            <img src="/assets/galactic.jpg" alt="Galactic Cake">
                            <span class="option-label">Galactic</span>
                        </button>
                        <button class="option-btn" data-value="meteor">
                            <img src="/assets/meteor.jpg" alt="Meteor Cake">
                            <span class="option-label">Meteor</span>
                        </button>
                        <button class="option-btn" data-value="nebula">
                            <img src="/assets/nebula.jpg" alt="Nebula Cake">
                            <span class="option-label">Nebula</span>
                        </button>
                    </div>
                </div>
                
                <div class="option-group">
                    <h3 class="option-title">Cake Flavor</h3>
                    <div class="options-container" id="flavorOptions">
                        <button class="option-btn" data-value="chocolate">
                            <img src="/assets/chocolate.jpg" alt="Chocolate">
                            <span class="option-label">Chocolate</span>
                        </button>
                        <button class="option-btn" data-value="red velvet">
                            <img src="/assets/redvelvet.jpg" alt="Red Velvet">
                            <span class="option-label">Red Velvet</span>
                        </button>
                        <button class="option-btn" data-value="matcha">
                            <img src="/assets/matcha.jpg" alt="Matcha">
                            <span class="option-label">Matcha</span>
                        </button>
                    </div>
                </div>
                
                <div class="option-group">
                    <h3 class="option-title">Number of Layers</h3>
                    <div class="options-container" id="layerCountOptions">
                        <button class="option-btn" data-value="1">
                            <img src="/assets/1layer.jpg" alt="1 Layer">
                            <span class="option-label">1 Layer</span>
                        </button>
                        <button class="option-btn" data-value="2">
                            <img src="/assets/2layer.jpg" alt="2 Layers">
                            <span class="option-label">2 Layers</span>
                        </button>
                        <button class="option-btn" data-value="3">
                            <img src="/assets/3layer.jpg" alt="3 Layers">
                            <span class="option-label">3 Layers</span>
                        </button>
                    </div>
                </div>
                
                <div class="option-group">
                    <h3 class="option-title">Layer Composition</h3>
                    <div class="options-container" id="layerOptions">
                        <button class="option-btn" data-value="choco sponge">
                            <img src="assets/chocosponge.jpg" alt="Choco Sponge">
                            <span class="option-label">Choco Sponge</span>
                        </button>
                        <button class="option-btn" data-value="vanilla cream">
                            <img src="assets/vanillacream.jpg" alt="Vanilla Cream">
                            <span class="option-label">Vanilla Cream</span>
                        </button>
                        <button class="option-btn" data-value="red velvet">
                            <img src="assets/redvelvet2.jpg" alt="Red Velvet">
                            <span class="option-label">Red Velvet</span>
                        </button>
                        <button class="option-btn" data-value="raspberry jam">
                            <img src="assets/raspberryjam.jpg" alt="Raspberry Jam">
                            <span class="option-label">Raspberry Jam</span>
                        </button>
                        <button class="option-btn" data-value="matcha">
                            <img src="assets/matcha2.jpg" alt="Matcha">
                            <span class="option-label">Matcha</span>
                        </button>
                        <button class="option-btn" data-value="cream cheese">
                            <img src="assets/creamcheese.jpg" alt="Cream Cheese">
                            <span class="option-label">Cream Cheese</span>
                        </button>
                        <button class="option-btn" data-value="choco chips">
                            <img src="assets/chocochips.jpg" alt="Choco Chips">
                            <span class="option-label">Choco Chips</span>
                        </button>
                    </div>
                </div>  
                
                <div class="option-group">
                    <h3 class="option-title">Toppings</h3>
                    <div class="options-container" id="toppingOptions">
                        <button class="option-btn" data-value="sprinkles">
                            <img src="assets/sprinkles.jpg" alt="Sprinkles">
                            <span class="option-label">Sprinkles</span>
                        </button>
                        <button class="option-btn" data-value="rocket candy">
                            <img src="assets/rocketcandy.jpg" alt="Rocket Candy">
                            <span class="option-label">Rocket Candy</span>
                        </button>
                        <button class="option-btn" data-value="nuts">
                            <img src="assets/nuts.jpg" alt="Nuts">
                            <span class="option-label">Nuts</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="preview-panel">
                <h2 class="preview-title">Your Cake Creation</h2>
                
                <div class="cake-preview">
                    <div class="cake-name" id="cakeName">CakeVerse</div>
                </div>
                
                <div class="customization-display" id="customizationDisplay">
                    <!-- Customization choices will appear here -->
                </div>
                
                <div class="price-section">
                    <div class="price" id="cakePrice">₪0</div>
                    <button class="add-to-cart-btn" id="addToCartBtn" disabled>
                        Add to Cart 
                    </button>
                </div>
            </div>
        </div>

        <div class="notification" id="notification">
            Cake added to cart! 🎉
        </div>
    </div>

    <script src="js/cake.js"></script>
</body>
</html>