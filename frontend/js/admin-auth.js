// Admin Authentication Helper

// Check if user is authenticated
function checkAuth() {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    
    if (!token) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Logout function with animation
function logout() {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    
    if (token) {
        // Clear storage
        localStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminToken');
        
        // Add logout animation
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.95)';
        document.body.style.transition = 'all 0.3s ease';
        
        // Redirect after animation
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 300);
    } else {
        window.location.href = 'login.html';
    }
}

// Get current user info from token
function getCurrentUser() {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    
    if (!token) return null;
    
    try {
        // Decode JWT token (simple decode, not verification)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        return payload;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

// Add logout event listener with confirmation
document.addEventListener('DOMContentLoaded', () => {
    // Check auth on page load (except for login page)
    if (!window.location.pathname.includes('login.html') && 
        !window.location.pathname.includes('index.html')) {
        checkAuth();
    }
    
    // Attach logout handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Custom confirmation dialog
            if (confirm('Are you sure you want to logout? 👋')) {
                // Add button animation
                logoutBtn.style.transform = 'scale(0.95)';
                logoutBtn.style.opacity = '0.7';
                
                logout();
            }
        });
    }
    
    // Display user info in dashboard if available
    const userEmailElement = document.getElementById('user-email');
    if (userEmailElement) {
        const user = getCurrentUser();
        if (user && user.email) {
            userEmailElement.textContent = user.email;
        }
    }
});

// Helper function to make authenticated API calls
async function authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    
    if (!token) {
        window.location.href = 'login.html';
        return null;
    }
    
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };
    
    try {
        const response = await fetch(url, { ...options, headers });
        
        // Check if token is invalid/expired
        if (response.status === 401) {
            // Show elegant message
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Session expired. Please login again.';
            messageDiv.style.position = 'fixed';
            messageDiv.style.top = '20px';
            messageDiv.style.right = '20px';
            messageDiv.style.zIndex = '9999';
            document.body.appendChild(messageDiv);
            
            setTimeout(() => {
                logout();
            }, 2000);
            
            return null;
        }
        
        return response;
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
}

// Add keyboard shortcut for logout (Ctrl+Shift+L)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        e.preventDefault();
        if (confirm('Quick logout? 👋')) {
            logout();
        }
    }
});