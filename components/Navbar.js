export class Navbar {
    constructor() {
        this.navItems = [
            { id: 'home', label: 'Command Center', icon: 'fa-home' },
            { id: 'team', label: 'Team', icon: 'fa-users' },
            { id: 'projects', label: 'Projects', icon: 'fa-code-branch' },
            { id: 'about', label: 'About ARISE', icon: 'fa-info-circle' },
            { id: 'contact', label: 'Contact', icon: 'fa-envelope' }
        ];
        this.activeSection = 'home';
        this.isMobileMenuOpen = false;
    }

    render() {
        return `
            <nav class="navbar">
                <div class="container">
                    <div class="nav-content">
                        <!-- Logo -->
                        <a href="#home" class="logo" data-nav="home">
                            <i class="fas fa-robot"></i>
                            <span class="logo-text">
                                <span class="logo-accent">ARISE</span>HQ
                            </span>
                        </a>

                        <!-- Desktop Navigation -->
                        <div class="nav-links-desktop">
                            ${this.navItems.map(item => `
                                <a href="#${item.id}" 
                                   class="nav-link ${this.activeSection === item.id ? 'active' : ''}" 
                                   data-nav="${item.id}">
                                    <i class="fas ${item.icon}"></i>
                                    <span>${item.label}</span>
                                    ${this.activeSection === item.id ? '<div class="nav-indicator"></div>' : ''}
                                </a>
                            `).join('')}
                        </div>

                        <!-- Mobile Menu Button -->
                        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu" aria-expanded="false">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </div>

                <!-- Mobile Navigation -->
                <div class="nav-mobile-overlay ${this.isMobileMenuOpen ? 'active' : ''}" id="nav-mobile-overlay"></div>
                <div class="nav-links-mobile ${this.isMobileMenuOpen ? 'active' : ''}" id="nav-links-mobile">
                    <div class="mobile-header">
                        <div class="logo">
                            <i class="fas fa-robot"></i>
                            <span class="logo-text">
                                <span class="logo-accent">ARISE</span>HQ
                            </span>
                        </div>
                        <button class="mobile-close-btn" id="mobile-close-btn" aria-label="Close menu">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="mobile-links">
                        ${this.navItems.map(item => `
                            <a href="#${item.id}" 
                               class="nav-link-mobile ${this.activeSection === item.id ? 'active' : ''}" 
                               data-nav="${item.id}">
                                <i class="fas ${item.icon}"></i>
                                <span>${item.label}</span>
                            </a>
                        `).join('')}
                    </div>
                    <div class="mobile-footer">
                        <p class="notice">
                            <i class="fas fa-lock"></i> Closed Facility
                        </p>
                    </div>
                </div>
            </nav>
        `;
    }

    setActiveSection(section) {
        this.activeSection = section;
        this.updateActiveLinks();
    }

    updateActiveLinks() {
        // Update desktop links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const navIndicator = link.querySelector('.nav-indicator');
            if (navIndicator) navIndicator.remove();
        });
        
        const activeDesktopLink = document.querySelector(`.nav-link[data-nav="${this.activeSection}"]`);
        if (activeDesktopLink) {
            activeDesktopLink.classList.add('active');
            const indicator = document.createElement('div');
            indicator.className = 'nav-indicator';
            activeDesktopLink.appendChild(indicator);
        }
        
        // Update mobile links
        document.querySelectorAll('.nav-link-mobile').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeMobileLink = document.querySelector(`.nav-link-mobile[data-nav="${this.activeSection}"]`);
        if (activeMobileLink) {
            activeMobileLink.classList.add('active');
        }
    }

    initEventListeners() {
        // Mobile menu button
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Mobile close button
        const mobileCloseBtn = document.getElementById('mobile-close-btn');
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', () => this.closeMobileMenu());
        }
        
        // Mobile overlay click
        const mobileOverlay = document.getElementById('nav-mobile-overlay');
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => this.closeMobileMenu());
        }
        
        // Navigation link clicks
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('[data-nav]');
            if (navLink) {
                e.preventDefault();
                const section = navLink.getAttribute('data-nav');
                this.navigateToSection(section);
                
                // Close mobile menu if open
                if (this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            }
        });
        
        // Handle hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1) || 'home';
            this.setActiveSection(hash);
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Close menu on resize (if resizing to desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        this.updateMobileMenu();
    }

    openMobileMenu() {
        this.isMobileMenuOpen = true;
        this.updateMobileMenu();
    }

    closeMobileMenu() {
        this.isMobileMenuOpen = false;
        this.updateMobileMenu();
    }

    updateMobileMenu() {
        const mobileMenu = document.getElementById('nav-links-mobile');
        const mobileOverlay = document.getElementById('nav-mobile-overlay');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (mobileMenu) {
            if (this.isMobileMenuOpen) {
                mobileMenu.classList.add('active');
                mobileOverlay?.classList.add('active');
                mobileMenuBtn?.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('active');
                mobileOverlay?.classList.remove('active');
                mobileMenuBtn?.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    }

    navigateToSection(section) {
        this.setActiveSection(section);
        
        // Scroll to section
        const targetElement = document.getElementById(section);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // Update URL hash
        window.history.pushState({}, '', `#${section}`);
    }
}
