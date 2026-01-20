// Import Components
import { Navbar } from '../components/Navbar.js';
import { Hero } from '../components/Hero.js';
import { TeamSection } from '../components/TeamSection.js';
import { ProjectsSection } from '../components/ProjectsSection.js';
import { AboutSection } from '../components/AboutSection.js';
import { ContactSection } from '../components/ContactSection.js';
import { ProfileModal } from '../components/ProfileModal.js';
import { ProjectModal } from '../components/ProjectModal.js';

// Import Controllers
import { NavigationController } from './controllers/navigation.js';
import { AnimationController } from './controllers/animations.js';

// Import Data
import { siteConfig } from '../data/siteConfig.js';

class ARISEApp {
    constructor() {
        this.components = {
            navbar: null,
            hero: null,
            team: null,
            projects: null,
            about: null,
            contact: null,
            profileModal: null,
            projectModal: null
        };
        
        this.controllers = {
            navigation: null,
            animations: null
        };
        
        this.currentSection = 'home';
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Initialize after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        if (this.isInitialized) return;
        
        try {
            // Initialize components
            this.initComponents();
            
            // Render components
            this.renderComponents();
            
            // Initialize controllers
            this.initControllers();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize features
            this.initFeatures();
            
            // Handle initial state
            this.handleInitialState();
            
            this.isInitialized = true;
            
            console.log('🚀 ARISE HQ Initialized');
            
        } catch (error) {
            console.error('Failed to initialize ARISE App:', error);
        }
    }

    initComponents() {
        this.components = {
            navbar: new Navbar(),
            hero: new Hero(),
            team: new TeamSection(),
            projects: new ProjectsSection(),
            about: new AboutSection(),
            contact: new ContactSection(),
            profileModal: new ProfileModal(),
            projectModal: new ProjectModal()
        };
    }

    renderComponents() {
        // Render navbar
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer && this.components.navbar) {
            navbarContainer.innerHTML = this.components.navbar.render();
            
            // Initialize navbar event listeners
            if (this.components.navbar.initEventListeners) {
                this.components.navbar.initEventListeners();
            }
        }
        
        // Render hero section
        const heroContainer = document.getElementById('hero-container');
        if (heroContainer && this.components.hero) {
            heroContainer.innerHTML = this.components.hero.render();
        }
        
        // Render team section
        const teamContainer = document.getElementById('team-container');
        if (teamContainer && this.components.team) {
            teamContainer.innerHTML = this.components.team.render();
        }
        
        // Render projects section
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer && this.components.projects) {
            projectsContainer.innerHTML = this.components.projects.render();
        }
        
        // Render about section
        const aboutContainer = document.getElementById('about-container');
        if (aboutContainer && this.components.about) {
            aboutContainer.innerHTML = this.components.about.render();
        }
        
        // Render contact section
        const contactContainer = document.getElementById('contact-container');
        if (contactContainer && this.components.contact) {
            contactContainer.innerHTML = this.components.contact.render();
        }
    }

    initControllers() {
        // Initialize navigation controller
        this.controllers.navigation = new NavigationController();
        
        // Initialize animation controller
        this.controllers.animations = new AnimationController();
    }

    setupEventListeners() {
        // Click event delegation for dynamic elements
        document.addEventListener('click', (e) => this.handleClick(e));
        
        // Handle profile modal events
        document.addEventListener('arise:profile:show', (e) => {
            this.showMemberProfile(e.detail.memberId);
        });
        
        // Handle project modal events
        document.addEventListener('arise:project:show', (e) => {
            this.showProjectDetails(e.detail.projectId);
        });
        
        // Handle custom section navigation events
        document.addEventListener('arise:section:show', (e) => {
            if (e.detail && e.detail.sectionId) {
                this.showSection(e.detail.sectionId);
            }
        });
        
        // Window scroll event
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 100);
        });
        
        // Window resize event
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Hash change events
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });
    }

    handleClick(e) {
        // Handle view profile button clicks
        const viewProfileBtn = e.target.closest('.view-profile-btn');
        if (viewProfileBtn) {
            const memberId = viewProfileBtn.getAttribute('data-member');
            if (memberId) {
                this.showMemberProfile(memberId);
                e.preventDefault();
            }
            return;
        }
        
        // Handle team card clicks (except social links)
        const teamCard = e.target.closest('.team-card');
        if (teamCard && !e.target.closest('.social-link') && !e.target.closest('a')) {
            const memberId = teamCard.getAttribute('data-member-id');
            if (memberId) {
                this.showMemberProfile(memberId);
                e.preventDefault();
            }
            return;
        }
        
        // Handle project detail button clicks
        const viewProjectBtn = e.target.closest('.project-details-btn');
        if (viewProjectBtn) {
            const projectId = viewProjectBtn.getAttribute('data-project');
            if (projectId) {
                this.showProjectDetails(projectId);
                e.preventDefault();
            }
            return;
        }
        
        // Handle project card clicks
        const projectCard = e.target.closest('.project-card');
        if (projectCard && !e.target.closest('.project-links') && !e.target.closest('a')) {
            const projectId = projectCard.getAttribute('data-project-id');
            if (projectId) {
                this.showProjectDetails(projectId);
                e.preventDefault();
            }
            return;
        }
        
        // Handle filter clicks - let components handle them
        if (e.target.closest('.filter') || e.target.closest('.status-tab')) {
            return;
        }
        
        // Handle navigation link clicks
        const navLink = e.target.closest('.nav-link, .nav-link-mobile');
        if (navLink) {
            const href = navLink.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                if (sectionId) {
                    this.showSection(sectionId);
                    e.preventDefault();
                }
            }
            return;
        }
        
        // Close modals when clicking overlay
        const modalOverlay = e.target.closest('.profile-modal-overlay, .project-modal-overlay');
        if (modalOverlay && e.target === modalOverlay) {
            this.closeAllModals();
        }
    }

    handleKeydown(e) {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            this.closeAllModals();
        }
        
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && document.body.classList.contains('mobile-menu-open')) {
            document.body.classList.remove('mobile-menu-open');
        }
    }

    handleScroll() {
        // Update navbar active state based on scroll
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        let newSection = this.currentSection;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                newSection = sectionId;
            }
        });
        
        // Update section if changed
        if (newSection !== this.currentSection) {
            this.currentSection = newSection;
            this.updateActiveNavSection(newSection);
        }
        
        // Update navbar style on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth > 768) {
            document.body.classList.remove('mobile-menu-open');
        }
        
        // Re-initialize responsive elements
        this.handleResponsiveElements();
        
        // Re-trigger animations if needed
        if (this.controllers.animations && this.controllers.animations.init) {
            this.controllers.animations.init();
        }
    }

    handleHashChange() {
        const hash = window.location.hash.substring(1);
        
        // Check for modal hashes first
        const profileMatch = hash.match(/^profile-(\d+)-/);
        const projectMatch = hash.match(/^project-(\d+)-/);
        
        if (profileMatch) {
            // Profile modal hash
            const memberId = profileMatch[1];
            setTimeout(() => {
                this.showMemberProfile(memberId);
            }, 100);
            return;
        }
        
        if (projectMatch) {
            // Project modal hash
            const projectId = projectMatch[1];
            setTimeout(() => {
                this.showProjectDetails(projectId);
            }, 100);
            return;
        }
        
        // Regular section navigation
        if (hash && hash !== this.currentSection) {
            this.showSection(hash);
        }
    }

    handleInitialState() {
        // Handle initial hash
        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            this.handleHashChange();
        }
        
        // Handle initial scroll position
        this.handleScroll();
        
        // Initialize responsive elements
        this.handleResponsiveElements();
    }

    updateActiveNavSection(sectionId) {
        // Update navbar active section
        if (this.components.navbar && this.components.navbar.setActiveSection) {
            this.components.navbar.setActiveSection(sectionId);
        }
        
        // Update nav links visually
        this.updateNavLinks(sectionId);
    }

    updateNavLinks(sectionId) {
        // Update desktop nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        // Update mobile nav links
        const mobileLinks = document.querySelectorAll('.nav-link-mobile');
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    handleResponsiveElements() {
        // Handle responsive grid layouts
        const teamGrid = document.querySelector('.team-grid');
        const projectsGrid = document.querySelector('.projects-grid');
        
        if (!teamGrid && !projectsGrid) return;
        
        if (window.innerWidth < 768) {
            // Mobile
            if (teamGrid) teamGrid.style.gridTemplateColumns = '1fr';
            if (projectsGrid) projectsGrid.style.gridTemplateColumns = '1fr';
        } else if (window.innerWidth < 1024) {
            // Tablet
            if (teamGrid) teamGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            if (projectsGrid) projectsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            // Desktop
            if (teamGrid) teamGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
            if (projectsGrid) projectsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(350px, 1fr))';
        }
    }

    initFeatures() {
        // Initialize smooth scrolling
        this.initSmoothScrolling();
        
        // Initialize intersection observers for animations
        this.initScrollAnimations();
        
        // Initialize lazy loading
        this.initLazyLoading();
    }

    initSmoothScrolling() {
        // Already handled by NavigationController, but keep as fallback
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href === '#0') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    const navbar = document.querySelector('.navbar');
                    const offset = navbar ? navbar.offsetHeight : 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active section
                    const sectionId = href.replace('#', '');
                    this.updateActiveNavSection(sectionId);
                }
            });
        });
    }

    initScrollAnimations() {
        // Initialize scroll-triggered animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements with animation classes
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }

    initLazyLoading() {
        // Initialize lazy loading for images
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // Public API methods
    showMemberProfile(memberId) {
        if (memberId && this.components.profileModal) {
            this.components.profileModal.show(memberId);
        }
    }

    showProjectDetails(projectId) {
        if (projectId && this.components.projectModal) {
            this.components.projectModal.show(projectId);
        }
    }

    showSection(sectionId) {
        this.currentSection = sectionId;
        this.updateActiveNavSection(sectionId);
        
        const element = document.getElementById(sectionId);
        if (element) {
            const navbar = document.querySelector('.navbar');
            const offset = navbar ? navbar.offsetHeight : 80;
            
            window.scrollTo({
                top: element.offsetTop - offset,
                behavior: 'smooth'
            });
            
            // Update URL
            if (history.pushState) {
                history.pushState(null, null, `#${sectionId}`);
            }
        }
    }

    closeAllModals() {
        // Hide profile modal
        if (this.components.profileModal) {
            this.components.profileModal.hide();
        }
        
        // Hide project modal
        if (this.components.projectModal) {
            this.components.projectModal.hide();
        }
        
        // Close mobile menu
        document.body.classList.remove('mobile-menu-open');
    }

    refresh() {
        // Re-render all components
        this.renderComponents();
        
        // Re-initialize controllers
        if (this.controllers.animations && this.controllers.animations.init) {
            this.controllers.animations.init();
        }
        
        // Re-initialize features
        this.initFeatures();
        
        console.log('🔄 ARISE HQ Refreshed');
    }

    getCurrentSection() {
        return this.currentSection;
    }

    // Utility methods
    log(message, type = 'info') {
        const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : 'ℹ️';
        console.log(`${prefix} ARISE: ${message}`);
    }

    error(message, error) {
        console.error(`❌ ARISE Error: ${message}`, error);
        
        // Could show user-friendly error message here
        const errorDiv = document.createElement('div');
        errorDiv.className = 'arise-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button class="error-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        errorDiv.querySelector('.error-close').addEventListener('click', () => {
            errorDiv.remove();
        });
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    window.ARISE = new ARISEApp();
    
    // Add development helpers
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🔧 Development mode active');
        window.ARISE_DEBUG = {
            app: window.ARISE,
            showSection: (section) => window.ARISE.showSection(section),
            refresh: () => window.ARISE.refresh(),
            showProfile: (memberId) => window.ARISE.showMemberProfile(memberId),
            showProject: (projectId) => window.ARISE.showProjectDetails(projectId),
            closeModals: () => window.ARISE.closeAllModals()
        };
    }
    
    // Global error handling
    window.addEventListener('error', (e) => {
        if (window.ARISE && window.ARISE.error) {
            window.ARISE.error('An error occurred', e.error);
        } else {
            console.error('ARISE HQ Error:', e.error);
        }
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        if (window.ARISE && window.ARISE.error) {
            window.ARISE.error('A promise was rejected', e.reason);
        } else {
            console.error('ARISE HQ Promise Rejection:', e.reason);
        }
    });
});

// Export for module usage
export { ARISEApp };
