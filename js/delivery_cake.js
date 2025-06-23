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

        // Initialize when page loads
        init();