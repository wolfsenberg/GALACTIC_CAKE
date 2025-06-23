 const validUsers = {
      'cakeverse': { password: '1234567', displayName: 'Admin' }
    };

    function init() {
      setupLogin();
    }

    function setupLogin() {
      const loginForm = document.getElementById('loginForm');
      loginForm.addEventListener('submit', handleLogin);
    }

    function handleLogin(e) {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const errorDiv = document.getElementById('loginError');

      if (validUsers[username] && validUsers[username].password === password) {
        window.location.href = `cake.html?user=${encodeURIComponent(username)}`;
        errorDiv.style.display = 'none';
      } else {
        errorDiv.textContent = '❌ Invalid credentials! Please check your username and password.';
        errorDiv.style.display = 'block';
        document.getElementById('password').value = '';
      }
    }

    init();