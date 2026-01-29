// Authentication and Admin Panel System

// Default passwords (stored in localStorage for persistence)
const DEFAULT_USER_PASSWORD = 'unblockedproxyjet';
const ADMIN_PASSWORD = 'Admin10419!';

// Initialize localStorage if not exists
function initializeStorage() {
    if (!localStorage.getItem('gamePassword')) {
        localStorage.setItem('gamePassword', DEFAULT_USER_PASSWORD);
    }
    if (!localStorage.getItem('adminChangelog')) {
        localStorage.setItem('adminChangelog', 'Welcome to the game site! Check back for updates.');
    }
    if (!localStorage.getItem('adminPopupMessage')) {
        localStorage.setItem('adminPopupMessage', '');
    }
    if (!localStorage.getItem('showPopup')) {
        localStorage.setItem('showPopup', 'false');
    }
}

// Check if user is authenticated
function isAuthenticated() {
    return sessionStorage.getItem('authenticated') === 'true';
}

// Check if admin is logged in
function isAdminLoggedIn() {
    return sessionStorage.getItem('adminAuthenticated') === 'true';
}

// Show password screen
function showPasswordScreen() {
    const passwordScreen = document.createElement('div');
    passwordScreen.id = 'passwordScreen';
    passwordScreen.innerHTML = `
        <div class="password-container">
            <div class="password-box">
                <h1>🎮 Game Access</h1>
                <p>Enter password to continue</p>
                <input type="password" id="passwordInput" placeholder="Enter password" />
                <button onclick="checkPassword()">Enter</button>
                <button onclick="showAdminLogin()" class="admin-btn">Admin Login</button>
                <p id="passwordError" class="error"></p>
            </div>
        </div>
    `;
    document.body.insertBefore(passwordScreen, document.body.firstChild);
}

// Show admin login
function showAdminLogin() {
    const passwordScreen = document.getElementById('passwordScreen');
    passwordScreen.innerHTML = `
        <div class="password-container">
            <div class="password-box">
                <h1>🔐 Admin Login</h1>
                <p>Enter admin credentials</p>
                <input type="password" id="adminPasswordInput" placeholder="Admin password" />
                <button onclick="checkAdminPassword()">Login</button>
                <button onclick="showPasswordScreen()" class="back-btn">Back</button>
                <p id="adminError" class="error"></p>
            </div>
        </div>
    `;
}

// Check user password
function checkPassword() {
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('passwordError');
    const correctPassword = localStorage.getItem('gamePassword');
    
    if (input.value === correctPassword) {
        sessionStorage.setItem('authenticated', 'true');
        document.getElementById('passwordScreen').style.display = 'none';
        showMainContent();
        checkForPopup();
    } else {
        error.textContent = 'Incorrect password!';
        input.value = '';
        input.focus();
    }
}

// Check admin password
function checkAdminPassword() {
    const input = document.getElementById('adminPasswordInput');
    const error = document.getElementById('adminError');
    
    if (input.value === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        document.getElementById('passwordScreen').style.display = 'none';
        showAdminPanel();
    } else {
        error.textContent = 'Incorrect admin password!';
        input.value = '';
        input.focus();
    }
}

// Show main content
function showMainContent() {
    document.getElementById('container').style.display = 'grid';
    document.getElementById('featuredZonesWrapper').style.display = 'block';
    document.getElementById('allZonesWrapper').style.display = 'block';
    document.querySelector('main').style.display = 'block';
}

// Show admin panel
function showAdminPanel() {
    const adminPanel = document.createElement('div');
    adminPanel.id = 'adminPanel';
    
    const currentChangelog = localStorage.getItem('adminChangelog');
    const currentPopup = localStorage.getItem('adminPopupMessage');
    const showPopup = localStorage.getItem('showPopup') === 'true';
    
    adminPanel.innerHTML = `
        <div class="admin-container">
            <div class="admin-box">
                <h1>⚙️ Admin Panel</h1>
                
                <div class="admin-section">
                    <h2>Change User Password</h2>
                    <input type="text" id="newPassword" placeholder="New user password" />
                    <button onclick="changeUserPassword()">Update Password</button>
                </div>
                
                <div class="admin-section">
                    <h2>Changelog</h2>
                    <textarea id="changelogText" rows="5">${currentChangelog}</textarea>
                    <button onclick="updateChangelog()">Update Changelog</button>
                </div>
                
                <div class="admin-section">
                    <h2>Popup Message</h2>
                    <textarea id="popupText" rows="3">${currentPopup}</textarea>
                    <label>
                        <input type="checkbox" id="enablePopup" ${showPopup ? 'checked' : ''} />
                        Enable popup on login
                    </label>
                    <button onclick="updatePopup()">Update Popup</button>
                </div>
                
                <div class="admin-section">
                    <h2>View Changelog</h2>
                    <button onclick="viewChangelog()">View Current Changelog</button>
                </div>
                
                <button onclick="adminLogout()" class="logout-btn">Logout</button>
                <p id="adminSuccess" class="success"></p>
            </div>
        </div>
    `;
    
    document.body.appendChild(adminPanel);
}

// Change user password
function changeUserPassword() {
    const newPassword = document.getElementById('newPassword').value;
    const success = document.getElementById('adminSuccess');
    
    if (newPassword.length < 3) {
        success.textContent = 'Password must be at least 3 characters!';
        success.className = 'error';
        return;
    }
    
    localStorage.setItem('gamePassword', newPassword);
    success.textContent = 'User password updated successfully!';
    success.className = 'success';
    document.getElementById('newPassword').value = '';
}

// Update changelog
function updateChangelog() {
    const changelog = document.getElementById('changelogText').value;
    const success = document.getElementById('adminSuccess');
    
    localStorage.setItem('adminChangelog', changelog);
    success.textContent = 'Changelog updated successfully!';
    success.className = 'success';
}

// Update popup message
function updatePopup() {
    const popup = document.getElementById('popupText').value;
    const enabled = document.getElementById('enablePopup').checked;
    const success = document.getElementById('adminSuccess');
    
    localStorage.setItem('adminPopupMessage', popup);
    localStorage.setItem('showPopup', enabled.toString());
    success.textContent = 'Popup settings updated successfully!';
    success.className = 'success';
}

// View changelog
function viewChangelog() {
    const changelog = localStorage.getItem('adminChangelog');
    alert('Current Changelog:\n\n' + changelog);
}

// Admin logout
function adminLogout() {
    sessionStorage.removeItem('adminAuthenticated');
    document.getElementById('adminPanel').remove();
    showPasswordScreen();
}

// Check for popup message
function checkForPopup() {
    const showPopup = localStorage.getItem('showPopup') === 'true';
    const popupMessage = localStorage.getItem('adminPopupMessage');
    
    if (showPopup && popupMessage) {
        setTimeout(() => {
            alert(popupMessage);
        }, 500);
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initializeStorage();
    
    if (!isAuthenticated() && !isAdminLoggedIn()) {
        // Hide main content
        document.getElementById('container').style.display = 'none';
        document.getElementById('featuredZonesWrapper').style.display = 'none';
        document.getElementById('allZonesWrapper').style.display = 'none';
        
        showPasswordScreen();
    } else if (isAuthenticated()) {
        showMainContent();
        checkForPopup();
    } else if (isAdminLoggedIn()) {
        showAdminPanel();
    }
});

// Handle Enter key for password inputs
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const passwordInput = document.getElementById('passwordInput');
        const adminPasswordInput = document.getElementById('adminPasswordInput');
        
        if (passwordInput && document.activeElement === passwordInput) {
            checkPassword();
        } else if (adminPasswordInput && document.activeElement === adminPasswordInput) {
            checkAdminPassword();
        }
    }
});
