// VZT Construction Management Application - Fixed Version
class VZTApp {
    constructor() {
        this.currentUser = null;
        this.map = null;
        this.isCheckedIn = false;
        this.workStartTime = null;
        
        console.log('VZT App constructor called');
        this.initializeData();
    }

    initializeData() {
        console.log('Initializing data...');
        
        // Demo users
        const demoUsers = [
            {
                id: "admin_001",
                name: "Admin Uživatel",
                email: "admin@vzt.cz",
                password: "admin123",
                role: "admin"
            },
            {
                id: "supervisor_001",
                name: "Vedoucí Projektu",
                email: "vedouci@vzt.cz",
                password: "vedouci123",
                role: "supervisor"
            },
            {
                id: "worker_001",
                name: "Montážní Dělník",
                email: "delnik@vzt.cz",
                password: "delnik123",
                role: "worker"
            }
        ];

        // Sample projects
        const sampleProjects = [
            {
                id: "proj_001",
                name: "VZT Montáž - Praha Centrum",
                type: "commercial",
                address: "Praha 1, Národní 123",
                completion: 45,
                description: "Instalace klimatizačního systému v kancelářském centru"
            },
            {
                id: "proj_002",
                name: "Průmyslová VZT - Brno",
                type: "industrial",
                address: "Brno, Průmyslová 45",
                completion: 25,
                description: "Montáž průmyslového vzduchotechnického systému"
            }
        ];

        // Initialize localStorage with error handling
        try {
            if (!localStorage.getItem('vzt_users')) {
                localStorage.setItem('vzt_users', JSON.stringify(demoUsers));
            }
            
            if (!localStorage.getItem('vzt_projects')) {
                localStorage.setItem('vzt_projects', JSON.stringify(sampleProjects));
            }

            if (!localStorage.getItem('vzt_photos')) {
                localStorage.setItem('vzt_photos', JSON.stringify([]));
            }

            if (!localStorage.getItem('vzt_reports')) {
                localStorage.setItem('vzt_reports', JSON.stringify([]));
            }

            if (!localStorage.getItem('vzt_chat_messages')) {
                const sampleMessages = [
                    {
                        id: Date.now() + 1,
                        user: "Admin Uživatel",
                        message: "Dobrý den všem! Nový systém je spuštěn.",
                        timestamp: new Date().toLocaleString(),
                        channel: "general"
                    },
                    {
                        id: Date.now() + 2,
                        user: "Vedoucí Projektu",
                        message: "Výborně! Konečně máme všechno na jednom místě.",
                        timestamp: new Date().toLocaleString(),
                        channel: "general"
                    }
                ];
                localStorage.setItem('vzt_chat_messages', JSON.stringify(sampleMessages));
            }

            if (!localStorage.getItem('vzt_attendance')) {
                localStorage.setItem('vzt_attendance', JSON.stringify([]));
            }

            if (!localStorage.getItem('vzt_audit_log')) {
                localStorage.setItem('vzt_audit_log', JSON.stringify([]));
            }

            if (!localStorage.getItem('vzt_theme')) {
                localStorage.setItem('vzt_theme', 'light');
            }
            
            console.log('Data initialization complete');
        } catch (error) {
            console.error('Error initializing localStorage:', error);
        }
    }

    init() {
        console.log('VZT App initializing...');
        try {
            this.setupEventListeners();
            this.checkAuth();
            this.updateClock();
            this.applyTheme();
            
            // Update clock every second
            setInterval(() => this.updateClock(), 1000);
            console.log('VZT App initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');

        try {
            // Login/Register tabs
            const tabBtns = document.querySelectorAll('.tab-btn');
            console.log('Found tab buttons:', tabBtns.length);
            
            tabBtns.forEach((btn, index) => {
                console.log(`Setting up tab button ${index}:`, btn.textContent);
                btn.addEventListener('click', (e) => {
                    console.log('Tab clicked:', e.target.dataset.tab);
                    
                    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.login-form').forEach(f => f.classList.remove('active'));
                    
                    e.target.classList.add('active');
                    const tab = e.target.dataset.tab;
                    const targetForm = document.getElementById(tab + 'Form');
                    if (targetForm) {
                        targetForm.classList.add('active');
                        console.log('Switched to tab:', tab);
                    } else {
                        console.error('Target form not found for tab:', tab);
                    }
                });
            });

            // Demo account buttons
            const demoBtns = document.querySelectorAll('.demo-btn');
            console.log('Found demo buttons:', demoBtns.length);
            
            demoBtns.forEach((btn, index) => {
                console.log(`Setting up demo button ${index}:`, btn.dataset.role);
                btn.addEventListener('click', (e) => {
                    console.log('Demo button clicked:', e.target.dataset.role);
                    e.preventDefault();
                    
                    const role = e.target.dataset.role;
                    const users = JSON.parse(localStorage.getItem('vzt_users'));
                    const user = users.find(u => u.role === role);
                    
                    if (user) {
                        const emailField = document.getElementById('loginEmail');
                        const passwordField = document.getElementById('loginPassword');
                        
                        console.log('Email field found:', !!emailField);
                        console.log('Password field found:', !!passwordField);
                        
                        if (emailField && passwordField) {
                            emailField.value = user.email;
                            passwordField.value = user.password;
                            console.log('Demo credentials filled:', user.email);
                            
                            // Visual feedback
                            btn.style.backgroundColor = '#4CAF50';
                            btn.style.color = 'white';
                            setTimeout(() => {
                                btn.style.backgroundColor = '';
                                btn.style.color = '';
                            }, 1000);
                        } else {
                            console.error('Login fields not found');
                            alert('Chyba: Přihlašovací pole nebyla nalezena');
                        }
                    } else {
                        console.error('User not found for role:', role);
                        alert('Chyba: Uživatel nenalezen');
                    }
                });
            });

            // Login button
            const loginBtn = document.getElementById('loginBtn');
            if (loginBtn) {
                console.log('Setting up login button');
                loginBtn.addEventListener('click', (e) => {
                    console.log('Login button clicked');
                    e.preventDefault();
                    this.login();
                });
            } else {
                console.error('Login button not found');
            }

            // Register button
            const registerBtn = document.getElementById('registerBtn');
            if (registerBtn) {
                console.log('Setting up register button');
                registerBtn.addEventListener('click', (e) => {
                    console.log('Register button clicked');
                    e.preventDefault();
                    this.register();
                });
            } else {
                console.error('Register button not found');
            }

            // Enter key handlers
            const loginEmail = document.getElementById('loginEmail');
            const loginPassword = document.getElementById('loginPassword');
            
            if (loginEmail) {
                loginEmail.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        console.log('Enter pressed in email field');
                        this.login();
                    }
                });
            }
            
            if (loginPassword) {
                loginPassword.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        console.log('Enter pressed in password field');
                        this.login();
                    }
                });
            }

            console.log('Event listeners set up successfully');
        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
    }

    setupMainAppEventListeners() {
        console.log('Setting up main app event listeners...');
        
        try {
            // Navigation
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = e.target.dataset.section;
                    if (section) {
                        this.showSection(section);
                    }
                });
            });

            // Logout button
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    this.logout();
                });
            }

            // Theme toggle
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => {
                    this.toggleTheme();
                });
            }

            // GPS Check In/Out
            const checkInBtn = document.getElementById('checkInBtn');
            if (checkInBtn) {
                checkInBtn.addEventListener('click', () => {
                    this.checkIn();
                });
            }

            const checkOutBtn = document.getElementById('checkOutBtn');
            if (checkOutBtn) {
                checkOutBtn.addEventListener('click', () => {
                    this.checkOut();
                });
            }

            // Calculator tabs
            document.querySelectorAll('.calc-tab-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.calc-tab-btn').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.calculator-panel').forEach(p => p.classList.remove('active'));
                    
                    e.target.classList.add('active');
                    const calc = e.target.dataset.calc;
                    const panel = document.getElementById(calc);
                    if (panel) {
                        panel.classList.add('active');
                    }
                });
            });

            // Calculator buttons
            const calcPipe = document.getElementById('calcPipe');
            if (calcPipe) {
                calcPipe.addEventListener('click', () => {
                    this.calculatePipeSizing();
                });
            }

            const calcDuct = document.getElementById('calcDuct');
            if (calcDuct) {
                calcDuct.addEventListener('click', () => {
                    this.calculateDuctLength();
                });
            }

            const calcAirflow = document.getElementById('calcAirflow');
            if (calcAirflow) {
                calcAirflow.addEventListener('click', () => {
                    this.calculateAirflow();
                });
            }

            const calcPressure = document.getElementById('calcPressure');
            if (calcPressure) {
                calcPressure.addEventListener('click', () => {
                    this.calculatePressureLoss();
                });
            }

            // Chat
            const sendMessageBtn = document.getElementById('sendMessageBtn');
            if (sendMessageBtn) {
                sendMessageBtn.addEventListener('click', () => {
                    this.sendMessage();
                });
            }

            const messageInput = document.getElementById('messageInput');
            if (messageInput) {
                messageInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.sendMessage();
                    }
                });
            }

            const chatChannel = document.getElementById('chatChannel');
            if (chatChannel) {
                chatChannel.addEventListener('change', () => {
                    this.loadChatMessages();
                });
            }

            // Photo upload
            const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
            if (uploadPhotoBtn) {
                uploadPhotoBtn.addEventListener('click', () => {
                    this.showPhotoModal();
                });
            }

            const savePhotoBtn = document.getElementById('savePhotoBtn');
            if (savePhotoBtn) {
                savePhotoBtn.addEventListener('click', () => {
                    this.savePhoto();
                });
            }

            // Reports
            const createReportBtn = document.getElementById('createReportBtn');
            if (createReportBtn) {
                createReportBtn.addEventListener('click', () => {
                    this.showReportModal();
                });
            }

            const saveReportBtn = document.getElementById('saveReportBtn');
            if (saveReportBtn) {
                saveReportBtn.addEventListener('click', () => {
                    this.saveReport();
                });
            }

            // Modal close buttons
            document.querySelectorAll('.modal-close').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const modal = e.target.closest('.modal');
                    if (modal) {
                        modal.classList.add('hidden');
                    }
                });
            });

            console.log('Main app event listeners set up successfully');
        } catch (error) {
            console.error('Error setting up main app event listeners:', error);
        }
    }

    checkAuth() {
        console.log('Checking authentication...');
        try {
            const savedUser = localStorage.getItem('vzt_current_user');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
                console.log('User found in localStorage:', this.currentUser.name);
                this.showMainApp();
            } else {
                console.log('No saved user found');
                this.showLoginScreen();
            }
        } catch (error) {
            console.error('Error checking auth:', error);
            this.showLoginScreen();
        }
    }

    login() {
        console.log('Login function called');
        
        try {
            const emailField = document.getElementById('loginEmail');
            const passwordField = document.getElementById('loginPassword');
            
            console.log('Email field found:', !!emailField);
            console.log('Password field found:', !!passwordField);
            
            if (!emailField || !passwordField) {
                console.error('Login fields not found');
                alert('Chyba: Přihlašovací pole nebyla nalezena');
                return;
            }

            const email = emailField.value ? emailField.value.trim() : '';
            const password = passwordField.value ? passwordField.value.trim() : '';

            console.log('Login attempt with email:', email);
            console.log('Password length:', password.length);

            if (!email || !password) {
                alert('Prosím vyplňte všechna pole');
                return;
            }

            const users = JSON.parse(localStorage.getItem('vzt_users') || '[]');
            console.log('Available users:', users.map(u => u.email));
            
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                console.log('Login successful for user:', user.name);
                this.currentUser = user;
                localStorage.setItem('vzt_current_user', JSON.stringify(user));
                this.logAudit('Přihlášení uživatele', `${user.name} se přihlásil`);
                this.showMainApp();
            } else {
                console.log('Login failed - invalid credentials');
                alert('Nesprávné přihlašovací údaje');
                
                // Show available credentials for debugging
                console.log('Available credentials:');
                users.forEach(u => {
                    console.log(`${u.email} / ${u.password} (${u.role})`);
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Chyba při přihlašování: ' + error.message);
        }
    }

    register() {
        console.log('Register function called');
        
        try {
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value.trim();
            const role = document.getElementById('regRole').value;

            if (!name || !email || !password || !role) {
                alert('Prosím vyplňte všechna pole');
                return;
            }

            const users = JSON.parse(localStorage.getItem('vzt_users') || '[]');
            
            if (users.find(u => u.email === email)) {
                alert('Uživatel s tímto emailem již existuje');
                return;
            }

            const newUser = {
                id: 'user_' + Date.now(),
                name,
                email,
                password,
                role
            };

            users.push(newUser);
            localStorage.setItem('vzt_users', JSON.stringify(users));
            this.logAudit('Registrace uživatele', `Nový uživatel ${name} se zaregistroval`);
            
            alert('Registrace úspěšná! Můžete se přihlásit.');
            
            // Switch to login tab
            const loginTab = document.querySelector('.tab-btn[data-tab="login"]');
            if (loginTab) {
                loginTab.click();
            }
            
            // Clear form
            document.getElementById('regName').value = '';
            document.getElementById('regEmail').value = '';
            document.getElementById('regPassword').value = '';
            document.getElementById('regRole').value = '';
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Chyba při registraci: ' + error.message);
        }
    }

    logout() {
        console.log('Logout function called');
        try {
            if (this.currentUser) {
                this.logAudit('Odhlášení uživatele', `${this.currentUser.name} se odhlásil`);
            }
            localStorage.removeItem('vzt_current_user');
            this.currentUser = null;
            this.showLoginScreen();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    showLoginScreen() {
        console.log('Showing login screen');
        try {
            const loginScreen = document.getElementById('loginScreen');
            const mainApp = document.getElementById('mainApp');
            
            if (loginScreen) {
                loginScreen.classList.remove('hidden');
                console.log('Login screen shown');
            } else {
                console.error('Login screen not found');
            }
            
            if (mainApp) {
                mainApp.classList.add('hidden');
                console.log('Main app hidden');
            } else {
                console.error('Main app not found');
            }
        } catch (error) {
            console.error('Error showing login screen:', error);
        }
    }

    showMainApp() {
        console.log('Showing main app for user:', this.currentUser.name);
        
        try {
            const loginScreen = document.getElementById('loginScreen');
            const mainApp = document.getElementById('mainApp');
            
            if (loginScreen) {
                loginScreen.classList.add('hidden');
                console.log('Login screen hidden');
            }
            
            if (mainApp) {
                mainApp.classList.remove('hidden');
                console.log('Main app shown');
            }
            
            // Update user info
            const currentUserEl = document.getElementById('currentUser');
            const currentRoleEl = document.getElementById('currentRole');
            
            if (currentUserEl) {
                currentUserEl.textContent = this.currentUser.name;
            }
            if (currentRoleEl) {
                currentRoleEl.textContent = this.currentUser.role.toUpperCase();
            }
            
            // Show/hide admin menu
            const adminItems = document.querySelectorAll('.admin-only');
            if (this.currentUser.role === 'admin') {
                adminItems.forEach(item => item.classList.remove('hidden'));
            } else {
                adminItems.forEach(item => item.classList.add('hidden'));
            }
            
            // Set up main app event listeners
            this.setupMainAppEventListeners();
            
            // Load dashboard
            this.loadDashboard();
            this.showSection('dashboard');
        } catch (error) {
            console.error('Error showing main app:', error);
        }
    }

    showSection(sectionName) {
        console.log('Showing section:', sectionName);
        
        try {
            // Update navigation
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            const activeNavItem = document.querySelector(`.nav-item[data-section="${sectionName}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }
            
            // Show section
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            const targetSection = document.getElementById(sectionName);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Load section-specific content
            switch (sectionName) {
                case 'dashboard':
                    this.loadDashboard();
                    break;
                case 'gps':
                    this.loadGPS();
                    break;
                case 'photos':
                    this.loadPhotos();
                    break;
                case 'reports':
                    this.loadReports();
                    break;
                case 'calculators':
                    // Calculators are already loaded in HTML
                    break;
                case 'chat':
                    this.loadChatMessages();
                    break;
                case 'admin':
                    if (this.currentUser && this.currentUser.role === 'admin') {
                        this.loadAdminPanel();
                    }
                    break;
                case 'settings':
                    this.loadSettings();
                    break;
                case 'export':
                    this.loadExport();
                    break;
            }
        } catch (error) {
            console.error('Error showing section:', error);
        }
    }

    updateClock() {
        try {
            const now = new Date();
            const timeString = now.toLocaleString('cs-CZ');
            const clockElement = document.getElementById('currentTime');
            if (clockElement) {
                clockElement.textContent = timeString;
            }
        } catch (error) {
            console.error('Error updating clock:', error);
        }
    }

    loadDashboard() {
        console.log('Loading dashboard...');
        
        try {
            const projects = JSON.parse(localStorage.getItem('vzt_projects') || '[]');
            const photos = JSON.parse(localStorage.getItem('vzt_photos') || '[]');
            const reports = JSON.parse(localStorage.getItem('vzt_reports') || '[]');
            const attendance = JSON.parse(localStorage.getItem('vzt_attendance') || '[]');
            
            // Update stats
            const activeProjectsEl = document.getElementById('activeProjects');
            if (activeProjectsEl) {
                activeProjectsEl.textContent = projects.length;
            }
            
            const today = new Date().toDateString();
            const todayPhotos = photos.filter(p => new Date(p.date).toDateString() === today);
            const todayPhotosEl = document.getElementById('todayPhotos');
            if (todayPhotosEl) {
                todayPhotosEl.textContent = todayPhotos.length;
            }
            
            const thisWeek = this.getThisWeekStart();
            const weeklyReports = reports.filter(r => new Date(r.date) >= thisWeek);
            const weeklyReportsEl = document.getElementById('weeklyReports');
            if (weeklyReportsEl) {
                weeklyReportsEl.textContent = weeklyReports.length;
            }
            
            // Calculate work time
            const todayAttendance = attendance.filter(a => 
                a.userId === this.currentUser.id && 
                new Date(a.date).toDateString() === today
            );
            let workTime = 0;
            todayAttendance.forEach(a => {
                if (a.type === 'checkin' && a.checkoutTime) {
                    workTime += (new Date(a.checkoutTime) - new Date(a.checkinTime)) / (1000 * 60 * 60);
                }
            });
            const workTimeEl = document.getElementById('workTime');
            if (workTimeEl) {
                workTimeEl.textContent = Math.round(workTime) + 'h';
            }
            
            // Load projects grid
            this.loadProjectsGrid(projects);
            
            console.log('Dashboard loaded successfully');
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
    }

    loadProjectsGrid(projects) {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-header">
                    <h3>${project.name}</h3>
                    <span class="project-type ${project.type}">${project.type}</span>
                </div>
                <p class="text-muted">${project.address}</p>
                <p>${project.description || 'Popis projektu není k dispozici'}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${project.completion}%"></div>
                </div>
                <small class="text-muted">${project.completion}% hotovo</small>
            `;
            grid.appendChild(card);
        });
    }

    loadGPS() {
        console.log('Loading GPS section...');
        
        // Initialize map if not already done
        if (!this.map) {
            setTimeout(() => {
                try {
                    console.log('Initializing map...');
                    this.map = L.map('map').setView([50.0755, 14.4378], 13);
                    
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors'
                    }).addTo(this.map);
                    
                    // Get current location
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const lat = position.coords.latitude;
                                const lng = position.coords.longitude;
                                
                                this.map.setView([lat, lng], 15);
                                
                                const marker = L.marker([lat, lng]).addTo(this.map);
                                marker.bindPopup('Vaše aktuální pozice').openPopup();
                            },
                            (error) => {
                                console.log('GPS Error:', error);
                                // Use default Prague location if GPS fails
                            }
                        );
                    }
                } catch (error) {
                    console.error('Error initializing map:', error);
                }
            }, 100);
        }
        
        // Load attendance
        this.loadAttendance();
        this.updateAttendanceStatus();
    }

    loadAttendance() {
        const attendance = JSON.parse(localStorage.getItem('vzt_attendance') || '[]');
        const today = new Date().toDateString();
        const todayAttendance = attendance.filter(a => 
            a.userId === this.currentUser.id && 
            new Date(a.date).toDateString() === today
        );
        
        const list = document.getElementById('attendanceList');
        if (!list) return;
        
        list.innerHTML = '';
        
        todayAttendance.forEach(entry => {
            const div = document.createElement('div');
            div.className = 'attendance-entry';
            const time = new Date(entry.checkinTime).toLocaleTimeString('cs-CZ');
            const checkoutTime = entry.checkoutTime ? 
                new Date(entry.checkoutTime).toLocaleTimeString('cs-CZ') : 'Aktivní';
            
            div.innerHTML = `
                <span>${entry.type === 'checkin' ? 'Příchod' : 'Odchod'}: ${time}</span>
                <span>${checkoutTime}</span>
            `;
            list.appendChild(div);
        });
    }

    updateAttendanceStatus() {
        const attendance = JSON.parse(localStorage.getItem('vzt_attendance') || '[]');
        const today = new Date().toDateString();
        const lastEntry = attendance.filter(a => 
            a.userId === this.currentUser.id && 
            new Date(a.date).toDateString() === today
        ).sort((a, b) => new Date(b.checkinTime) - new Date(a.checkinTime))[0];
        
        const checkInBtn = document.getElementById('checkInBtn');
        const checkOutBtn = document.getElementById('checkOutBtn');
        
        if (lastEntry && !lastEntry.checkoutTime) {
            this.isCheckedIn = true;
            if (checkInBtn) checkInBtn.classList.add('hidden');
            if (checkOutBtn) checkOutBtn.classList.remove('hidden');
        } else {
            this.isCheckedIn = false;
            if (checkInBtn) checkInBtn.classList.remove('hidden');
            if (checkOutBtn) checkOutBtn.classList.add('hidden');
        }
    }

    checkIn() {
        console.log('Check in requested');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const attendance = JSON.parse(localStorage.getItem('vzt_attendance') || '[]');
                    const entry = {
                        id: 'att_' + Date.now(),
                        userId: this.currentUser.id,
                        type: 'checkin',
                        date: new Date().toISOString(),
                        checkinTime: new Date().toISOString(),
                        location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    };
                    
                    attendance.push(entry);
                    localStorage.setItem('vzt_attendance', JSON.stringify(attendance));
                    this.logAudit('Check In', `${this.currentUser.name} se přihlásil na pozici`);
                    
                    this.loadAttendance();
                    this.updateAttendanceStatus();
                },
                (error) => {
                    alert('Nelze získat GPS pozici: ' + error.message);
                }
            );
        } else {
            alert('GPS není podporováno v tomto prohlížeči');
        }
    }

    checkOut() {
        console.log('Check out requested');
        const attendance = JSON.parse(localStorage.getItem('vzt_attendance') || '[]');
        const today = new Date().toDateString();
        const lastEntry = attendance.filter(a => 
            a.userId === this.currentUser.id && 
            new Date(a.date).toDateString() === today && 
            !a.checkoutTime
        ).sort((a, b) => new Date(b.checkinTime) - new Date(a.checkinTime))[0];
        
        if (lastEntry) {
            lastEntry.checkoutTime = new Date().toISOString();
            localStorage.setItem('vzt_attendance', JSON.stringify(attendance));
            this.logAudit('Check Out', `${this.currentUser.name} se odhlásil z pozice`);
            
            this.loadAttendance();
            this.updateAttendanceStatus();
        }
    }

    loadPhotos() {
        console.log('Loading photos...');
        // Photo functionality would be implemented here
    }

    loadReports() {
        console.log('Loading reports...');
        // Reports functionality would be implemented here
    }

    showPhotoModal() {
        const modal = document.getElementById('photoModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    savePhoto() {
        console.log('Save photo functionality would be implemented here');
    }

    showReportModal() {
        const modal = document.getElementById('reportModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    saveReport() {
        console.log('Save report functionality would be implemented here');
    }

    // VZT Calculators
    calculatePipeSizing() {
        console.log('Calculating pipe sizing...');
        try {
            const flow = parseFloat(document.getElementById('pipeFlow').value);
            const velocity = parseFloat(document.getElementById('pipeVelocity').value);
            
            if (!flow || !velocity) {
                alert('Prosím vyplňte všechna pole');
                return;
            }
            
            // Convert flow from m³/h to m³/s
            const flowMs = flow / 3600;
            
            // Calculate area: A = Q / v
            const area = flowMs / velocity;
            
            // Calculate diameter: D = sqrt(4*A/π)
            const diameter = Math.sqrt((4 * area) / Math.PI);
            
            // Convert to mm
            const diameterMm = diameter * 1000;
            
            const results = document.getElementById('pipeResults');
            if (results) {
                results.innerHTML = `
                    <div class="result-item">
                        <span>Průtok:</span>
                        <span class="result-value">${flow} m³/h (${flowMs.toFixed(4)} m³/s)</span>
                    </div>
                    <div class="result-item">
                        <span>Rychlost:</span>
                        <span class="result-value">${velocity} m/s</span>
                    </div>
                    <div class="result-item">
                        <span>Plocha průřezu:</span>
                        <span class="result-value">${area.toFixed(6)} m²</span>
                    </div>
                    <div class="result-item">
                        <span>Průměr potrubí:</span>
                        <span class="result-value">${diameter.toFixed(3)} m (${diameterMm.toFixed(1)} mm)</span>
                    </div>
                `;
                console.log('Pipe sizing calculation completed');
            }
        } catch (error) {
            console.error('Error calculating pipe sizing:', error);
            alert('Chyba při výpočtu: ' + error.message);
        }
    }

    calculateDuctLength() {
        console.log('Calculating duct length...');
        try {
            const straight = parseFloat(document.getElementById('ductStraight').value);
            const bends = parseInt(document.getElementById('ductBends').value) || 0;
            const branches = parseInt(document.getElementById('ductBranches').value) || 0;
            
            if (!straight) {
                alert('Prosím zadejte přímou délku');
                return;
            }
            
            // Calculate equivalent length
            const bendLength = bends * 1.5;
            const branchLength = branches * 2.0;
            const totalLength = straight + bendLength + branchLength;
            
            const results = document.getElementById('ductResults');
            if (results) {
                results.innerHTML = `
                    <div class="result-item">
                        <span>Přímá délka:</span>
                        <span class="result-value">${straight} m</span>
                    </div>
                    <div class="result-item">
                        <span>Ekvivalentní délka ohybů:</span>
                        <span class="result-value">${bendLength} m (${bends} × 1.5)</span>
                    </div>
                    <div class="result-item">
                        <span>Ekvivalentní délka odboček:</span>
                        <span class="result-value">${branchLength} m (${branches} × 2.0)</span>
                    </div>
                    <div class="result-item">
                        <span>Celková ekvivalentní délka:</span>
                        <span class="result-value">${totalLength} m</span>
                    </div>
                `;
                console.log('Duct length calculation completed');
            }
        } catch (error) {
            console.error('Error calculating duct length:', error);
            alert('Chyba při výpočtu: ' + error.message);
        }
    }

    calculateAirflow() {
        console.log('Calculating airflow...');
        try {
            const volume = parseFloat(document.getElementById('roomVolume').value);
            const airChanges = parseFloat(document.getElementById('airChanges').value);
            
            if (!volume || !airChanges) {
                alert('Prosím vyplňte všechna pole');
                return;
            }
            
            // Calculate airflow: Q = V × n
            const airflow = volume * airChanges;
            const airflowMs = airflow / 3600; // Convert to m³/s
            
            const results = document.getElementById('airflowResults');
            if (results) {
                results.innerHTML = `
                    <div class="result-item">
                        <span>Objem místnosti:</span>
                        <span class="result-value">${volume} m³</span>
                    </div>
                    <div class="result-item">
                        <span>Výměna vzduchu:</span>
                        <span class="result-value">${airChanges} 1/h</span>
                    </div>
                    <div class="result-item">
                        <span>Potřebný průtok:</span>
                        <span class="result-value">${airflow} m³/h</span>
                    </div>
                    <div class="result-item">
                        <span>Průtok v m³/s:</span>
                        <span class="result-value">${airflowMs.toFixed(4)} m³/s</span>
                    </div>
                `;
                console.log('Airflow calculation completed');
            }
        } catch (error) {
            console.error('Error calculating airflow:', error);
            alert('Chyba při výpočtu: ' + error.message);
        }
    }

    calculatePressureLoss() {
        console.log('Calculating pressure loss...');
        try {
            const length = parseFloat(document.getElementById('pipeLength').value);
            const diameter = parseFloat(document.getElementById('pipeDiameter').value);
            const velocity = parseFloat(document.getElementById('pressureVelocity').value);
            
            if (!length || !diameter || !velocity) {
                alert('Prosím vyplňte všechna pole');
                return;
            }
            
            // Convert diameter from mm to m
            const diameterM = diameter / 1000;
            
            // Friction factor (approximation for smooth pipes)
            const f = 0.02;
            
            // Air density (kg/m³)
            const density = 1.2;
            
            // Calculate pressure loss: ΔP = f * (L/D) * (ρ*v²/2)
            const pressureLoss = f * (length / diameterM) * (density * velocity * velocity / 2);
            
            const results = document.getElementById('pressureResults');
            if (results) {
                results.innerHTML = `
                    <div class="result-item">
                        <span>Délka potrubí:</span>
                        <span class="result-value">${length} m</span>
                    </div>
                    <div class="result-item">
                        <span>Průměr:</span>
                        <span class="result-value">${diameter} mm (${diameterM} m)</span>
                    </div>
                    <div class="result-item">
                        <span>Rychlost:</span>
                        <span class="result-value">${velocity} m/s</span>
                    </div>
                    <div class="result-item">
                        <span>Tlaková ztráta:</span>
                        <span class="result-value">${pressureLoss.toFixed(2)} Pa</span>
                    </div>
                `;
                console.log('Pressure loss calculation completed');
            }
        } catch (error) {
            console.error('Error calculating pressure loss:', error);
            alert('Chyba při výpočtu: ' + error.message);
        }
    }

    loadChatMessages() {
        console.log('Loading chat messages...');
        try {
            const messages = JSON.parse(localStorage.getItem('vzt_chat_messages') || '[]');
            const channelSelect = document.getElementById('chatChannel');
            const channel = channelSelect ? channelSelect.value : 'general';
            
            const filteredMessages = messages.filter(m => m.channel === channel);
            
            const container = document.getElementById('chatMessages');
            if (container) {
                container.innerHTML = '';
                
                filteredMessages.forEach(message => {
                    const div = document.createElement('div');
                    div.className = message.user === this.currentUser.name ? 'message own' : 'message other';
                    div.innerHTML = `
                        <div class="message-header">${message.user} - ${message.timestamp}</div>
                        <div>${message.message}</div>
                    `;
                    container.appendChild(div);
                });
                
                // Scroll to bottom
                container.scrollTop = container.scrollHeight;
                console.log('Chat messages loaded successfully');
            }
        } catch (error) {
            console.error('Error loading chat messages:', error);
        }
    }

    sendMessage() {
        console.log('Sending message...');
        try {
            const input = document.getElementById('messageInput');
            const channelSelect = document.getElementById('chatChannel');
            
            if (!input) return;
            
            const message = input.value.trim();
            const channel = channelSelect ? channelSelect.value : 'general';
            
            if (!message) return;
            
            const messages = JSON.parse(localStorage.getItem('vzt_chat_messages') || '[]');
            
            const newMessage = {
                id: Date.now(),
                user: this.currentUser.name,
                message,
                timestamp: new Date().toLocaleString('cs-CZ'),
                channel
            };
            
            messages.push(newMessage);
            localStorage.setItem('vzt_chat_messages', JSON.stringify(messages));
            
            input.value = '';
            this.loadChatMessages();
            console.log('Message sent successfully');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    loadAdminPanel() {
        console.log('Loading admin panel...');
        // Admin panel functionality would be implemented here
    }

    loadSettings() {
        console.log('Loading settings...');
        // Settings functionality would be implemented here
    }

    loadExport() {
        console.log('Loading export...');
        // Export functionality would be implemented here
    }

    toggleTheme() {
        const currentTheme = localStorage.getItem('vzt_theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        localStorage.setItem('vzt_theme', newTheme);
        this.applyTheme();
    }

    applyTheme() {
        const theme = localStorage.getItem('vzt_theme') || 'light';
        document.documentElement.setAttribute('data-color-scheme', theme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    logAudit(action, details) {
        try {
            const auditLog = JSON.parse(localStorage.getItem('vzt_audit_log') || '[]');
            
            const entry = {
                id: Date.now(),
                action,
                details,
                user: this.currentUser ? this.currentUser.name : 'System',
                timestamp: new Date().toLocaleString('cs-CZ')
            };
            
            auditLog.push(entry);
            
            // Keep only last 100 entries
            if (auditLog.length > 100) {
                auditLog.splice(0, auditLog.length - 100);
            }
            
            localStorage.setItem('vzt_audit_log', JSON.stringify(auditLog));
        } catch (error) {
            console.error('Error logging audit:', error);
        }
    }

    getThisWeekStart() {
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(today.setDate(diff));
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing VZT app...');
    
    // Wait a bit for all elements to be ready
    setTimeout(() => {
        try {
            window.app = new VZTApp();
            window.app.init();
            console.log('VZT App ready');
        } catch (error) {
            console.error('Error initializing VZT App:', error);
            alert('Chyba při načítání aplikace: ' + error.message);
        }
    }, 100);
});

// Add global functions for compatibility
window.deleteUser = function(userId) {
    if (window.app) {
        window.app.deleteUser(userId);
    }
};