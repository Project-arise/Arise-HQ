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
                        <button class="mobile-menu-btn" aria-label="Toggle menu">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </div>

                <!-- Mobile Navigation -->
                <div class="nav-mobile-overlay"></div>
                <div class="nav-links-mobile">
                    <div class="mobile-header">
                        <div class="logo">
                            <i class="fas fa-robot"></i>
                            <span>ARISE</span>HQ
                        </div>
                        <button class="mobile-close-btn" aria-label="Close menu">
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
    }
}