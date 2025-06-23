 // Create animated stars
        function createStars() {
            const starsContainer = document.getElementById('stars');
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }

        // Load cart from localStorage and display order summary
        function loadOrderSummary() {
            const cartItems = JSON.parse(localStorage.getItem('cakeCart')) || [];
            const orderSummary = document.getElementById('orderSummary');
            let html = '';
            let total = 0;

            if (cartItems.length === 0) {
                html = '<p>No items in your order. Please go back to customize your cake.</p>';
            } else {
                cartItems.forEach(item => {
                    html += `
                        <div class="order-item">
                            <div>${item.name}</div>
                            <div>₪${item.price} </div>
                        </div>
                    `;
                    total += item.price;
                });

                html += `
                    <div class="order-total order-item">
                        <div>Total</div>
                        <div>₪${total} </div>
                    </div>
                `;

                // Check if any item has matcha flavor or layer
                const hasMatcha = cartItems.some(item => 
                    item.options.flavor === 'matcha' || 
                    item.options.layers.includes('matcha')
                );

                // Disable matcha lover promo if no matcha items
                if (!hasMatcha) {
                    document.getElementById('matchaLoverBtn').disabled = true;
                    document.getElementById('matchaLoverBtn').style.opacity = '0.5';
                    document.getElementById('matchaLoverBtn').style.cursor = 'not-allowed';
                }
            }

            orderSummary.innerHTML = html;
        }

        // Setup promo code buttons for multi-selection
        function setupPromoButtons() {
            const promoButtons = document.querySelectorAll('.promo-btn:not([disabled])');
            const promoCodeInput = document.getElementById('promoCode');
            let selectedPromos = [];

            promoButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const promoCode = button.dataset.code;
                    
                    // Toggle selection
                    if (button.classList.contains('selected')) {
                        // Remove from selected
                        button.classList.remove('selected');
                        selectedPromos = selectedPromos.filter(code => code !== promoCode);
                        
                        // Re-enable all buttons when below limit
                        if (selectedPromos.length < 2) {
                            promoButtons.forEach(btn => {
                                btn.classList.remove('limit-reached');
                            });
                        }
                    } else {
                        // Check if we can add another (max 2)
                        if (selectedPromos.length < 2) {
                            button.classList.add('selected');
                            selectedPromos.push(promoCode);
                            
                            // If we've reached the limit, disable non-selected buttons
                            if (selectedPromos.length === 2) {
                                promoButtons.forEach(btn => {
                                    if (!btn.classList.contains('selected')) {
                                        btn.classList.add('limit-reached');
                                    }
                                });
                            }
                        } else {
                            // Visual feedback for reaching limit
                            button.classList.add('limit-reached');
                            setTimeout(() => {
                                button.classList.remove('limit-reached');
                            }, 300);
                        }
                    }
                    
                    // Update hidden input value
                    promoCodeInput.value = selectedPromos.join(',');
                });
            });
        }

        // Handle form submission
        function setupFormSubmission() {
            const form = document.getElementById('deliveryForm');
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form values
                const formData = {
                    name: document.getElementById('customerName').value,
                    address: document.getElementById('deliveryAddress').value,
                    deliveryType: document.querySelector('input[name="deliveryType"]:checked').value,
                    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
                    promoCode: document.getElementById('promoCode').value,
                    feedback: document.getElementById('customerFeedback').value
                };
                
                // In a real app, you would process the order here
                alert('Order submitted successfully! Thank you for your cosmic cake order!');
                
                // Clear cart
                localStorage.removeItem('cakeCart');
                
                // Redirect to home page or show confirmation
                // window.location.href = 'index.html';
            });
        }

        // Initialize the page
        function init() {
            createStars();
            loadOrderSummary();
            setupPromoButtons();
            setupFormSubmission();
        }

document.addEventListener('DOMContentLoaded', function() {
    // Create stars background
    function createStars() {
        const starsContainer = document.getElementById('stars');
        const starCount = 100;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            const size = Math.random() * 3;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            
            starsContainer.appendChild(star);
        }
    }

    // Load order summary from localStorage
    function loadOrderSummary() {
        const cartItems = JSON.parse(localStorage.getItem('cakeCart')) || [];
        const orderSummary = document.getElementById('orderSummary');
        updateOrderSummaryUI(cartItems, orderSummary);
    }

    function updateOrderSummaryUI(cartItems, orderSummaryElement) {
        let html = '';
        let total = 0;

        if (cartItems.length === 0) {
            html = '<p>No items in your order. Please go back to customize your cake.</p>';
        } else {
            cartItems.forEach(item => {
                html += `
                    <div class="order-item">
                        <div>${item.name}</div>
                        <div>₪${item.price}</div>
                    </div>
                `;
                total += item.price;
            });

            html += `
                <div class="order-total order-item">
                    <div>Total</div>
                    <div>₪${total}</div>
                </div>
            `;

            // Check for matcha items
            const hasMatcha = cartItems.some(item => 
                item.options?.flavor === 'matcha' || 
                item.options?.layers?.includes('matcha')
            );

            if (!hasMatcha) {
                const matchaBtn = document.getElementById('matchaLoverBtn');
                if (matchaBtn) {
                    matchaBtn.disabled = true;
                    matchaBtn.style.opacity = '0.5';
                    matchaBtn.style.cursor = 'not-allowed';
                }
            }
        }

        orderSummaryElement.innerHTML = html;
    }

    // Setup promo code buttons
    function setupPromoButtons() {
        const promoButtons = document.querySelectorAll('.promo-btn:not([disabled])');
        const promoCodeInput = document.getElementById('promoCode');
        let selectedPromos = [];

        promoButtons.forEach(button => {
            button.addEventListener('click', () => {
                const promoCode = button.dataset.code;
                
                if (button.classList.contains('selected')) {
                    button.classList.remove('selected');
                    selectedPromos = selectedPromos.filter(code => code !== promoCode);
                    
                    if (selectedPromos.length < 2) {
                        promoButtons.forEach(btn => {
                            btn.classList.remove('limit-reached');
                        });
                    }
                } else {
                    if (selectedPromos.length < 2) {
                        button.classList.add('selected');
                        selectedPromos.push(promoCode);
                        
                        if (selectedPromos.length === 2) {
                            promoButtons.forEach(btn => {
                                if (!btn.classList.contains('selected')) {
                                    btn.classList.add('limit-reached');
                                }
                            });
                        }
                    } else {
                        button.classList.add('limit-reached');
                        setTimeout(() => {
                            button.classList.remove('limit-reached');
                        }, 300);
                    }
                }
                
                promoCodeInput.value = selectedPromos.join(',');
            });
        });
    }

    // Initialize the page
    createStars();
    loadOrderSummary();
    setupPromoButtons();

    // Get form and modal elements
    const deliveryForm = document.getElementById('deliveryForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeModal = document.getElementById('closeModal');
    const confirmBtn = document.getElementById('confirmBtn');
    const orderDetails = document.getElementById('orderDetails');
    const deliveryTime = document.getElementById('deliveryTime');
    const orderSummary = document.getElementById('orderSummary');

    // Handle form submission
    deliveryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('customerName').value;
        const address = document.getElementById('deliveryAddress').value;
        const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        const promoCode = document.getElementById('promoCode').value;
        const instructions = document.getElementById('customerFeedback').value;
        const cartItems = JSON.parse(localStorage.getItem('cakeCart')) || [];
        
        // Generate order summary
        let summaryHTML = `
            <h3>Order Summary</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Delivery Address:</strong> ${getAddressText(address)}</p>
            <p><strong>Delivery Type:</strong> ${getDeliveryTypeText(deliveryType)}</p>
            <p><strong>Payment Method:</strong> ${getPaymentMethodText(paymentMethod)}</p>
        `;
        
        if (promoCode) {
            summaryHTML += `<p><strong>Promo Code(s):</strong> ${promoCode}</p>`;
        }
        
        if (instructions) {
            summaryHTML += `<p><strong>Special Instructions:</strong> ${instructions}</p>`;
        }
        
        // Add order items from cart
        summaryHTML += generateOrderItemsSummary(cartItems);
        
        orderDetails.innerHTML = summaryHTML;
        
        // Set delivery estimate
        deliveryTime.textContent = getDeliveryEstimate(deliveryType);
        
        // Show confirmation modal
        confirmationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal handlers
    closeModal.addEventListener('click', closeConfirmationModal);
    confirmBtn.addEventListener('click', confirmOrder);
    
    // Close modal when clicking outside or pressing ESC
    window.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            closeConfirmationModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && confirmationModal.style.display === 'block') {
            closeConfirmationModal();
        }
    });

    // Helper functions
    function closeConfirmationModal() {
        confirmationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function confirmOrder() {
        // Clear the cart
        localStorage.removeItem('cakeCart');
        
        // Reset the order summary UI
        updateOrderSummaryUI([], orderSummary);
        
        // Reset promo codes
        document.querySelectorAll('.promo-btn').forEach(btn => {
            btn.classList.remove('selected', 'limit-reached');
        });
        document.getElementById('promoCode').value = '';
        
        // Reset form (optional)
        // deliveryForm.reset();
        
        closeConfirmationModal();
        
        // In a real app, you might redirect here
        // window.location.href = 'index.html';
    }
    
    function getAddressText(addressValue) {
        const addresses = {
            'moon-base-4': 'Moon Base 4',
            'mars-colony-1': 'Mars Colony 1'
        };
        return addresses[addressValue] || addressValue;
    }
    
    function getDeliveryTypeText(deliveryType) {
        return deliveryType === 'lunar' ? 'Lunar Delivery (Standard)' : 'Planetary Express (Faster)';
    }
    
    function getPaymentMethodText(paymentMethod) {
        return paymentMethod === 'credits' ? 'Galactic Credits' : 'G-Coin';
    }
    
    function getDeliveryEstimate(deliveryType) {
        return deliveryType === 'lunar' ? '2-3 Earth days' : '1 Earth day';
    }
    
    function generateOrderItemsSummary(cartItems) {
        let itemsHTML = '<h4>Your Cosmic Treats:</h4>';
        
        if (cartItems.length === 0) {
            itemsHTML += '<p>No items in your order</p>';
        } else {
            itemsHTML += '<ul style="list-style-type: none; padding-left: 0; margin-top: 10px;">';
            
            cartItems.forEach(item => {
                itemsHTML += `<li>${item.emoji || '✨'} ${item.name} × ${item.quantity || 1}</li>`;
            });
            
            itemsHTML += '</ul>';
            
            const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
            itemsHTML += `<p style="margin-top: 15px;"><strong>Total: ${total} Galactic Credits</strong></p>`;
        }
        
        return itemsHTML;
    }
});