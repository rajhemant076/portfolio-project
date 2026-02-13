// Admin Authentication Helper

// Check if user is authenticated
function checkAuth() {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('adminToken');
    window.location.href = 'login.html';
}

// Add logout event listener
document.addEventListener('DOMContentLoaded', () => {
    // Check auth on page load (except for login page)
    if (!window.location.pathname.includes('login.html')) {
        checkAuth();
    }
    
    // Attach logout handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                logout();
            }
        });
    }
});

// Helper function to make authenticated API calls
async function authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
        window.location.href = 'login.html';
        return null;
    }
    
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };
    
    const response = await fetch(url, { ...options, headers });
    
    // Check if token is invalid/expired
    if (response.status === 401) {
        alert('Session expired. Please login again.');
        logout();
        return null;
    }
    
    return response;
}