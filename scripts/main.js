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
import { NavigationController } from './navigation.js';
import { AnimationController } from './animations.js';

// Import Data
import { siteConfig } from '../data/siteConfig.js';

class ARISEApp {
    constructor() {
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
        
        this.controllers = {
            navigation: null,
            animations: null
        };
        
        this.currentSection = 'home';
        this.init();
    }

    init() {
        // Load components
        this.renderComponents();
        
        // Initialize controllers
        this.controllers.navigation = new NavigationController();
        this.controllers.animations = new AnimationController();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Handle initial scroll position
        this.handleScroll();
        
        // Initialize any additional features
        this.initFeatures();
        
        console.log('🚀 ARISE HQ Initialized');
    }

    renderComponents() {
        // Render navbar
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer) {
            navbarContainer.innerHTML = this.components.navbar.render();
        }
        
        // Render sections
        const heroContainer = document.getElementById('hero-container');
        if (heroContainer) {
            heroContainer.innerHTML = this.components.hero.render();
        }
        
        const teamContainer = document.getElementById('team-container');
        if (teamContainer) {
            teamContainer.innerHTML = this.components.team.render();
        }
        
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            projectsContainer.innerHTML = this.components.projects.render();
        }
        
        const aboutContainer = document.getElementById('about-container');
        if (aboutContainer) {
            aboutContainer.innerHTML = this.components.about.render();
        }
        
        const contactContainer = document.getElementById('contact-container');
        if (contactContainer) {
            contactContainer.innerHTML = this.components.contact.render();
        }
    }

    setupEventListeners() {
        // Navigation clicks
        document.addEventListener('click', (e) => {
            this.handleClick(e);
        });
        
        // Profile modal events
        document.addEventListener('arise:profile:show', (e) => {
            this.showMemberProfile(e.detail.memberId);
        });
        
        // Project modal events
        document.addEventListener('arise:project:show', (e) => {
            this.showProjectDetails(e.detail.projectId);
        });
        
        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    handleClick(e) {
        // Handle team member clicks for profile modal
        if (e.target.closest('[data-member]')) {
            const memberId = e.target.closest('[data-member]').dataset.member;
            this.showMemberProfile(memberId);
            e.preventDefault();
            return;
        }
        
        // Handle team card clicks
        if (e.target.closest('.team-card')) {
            const card = e.target.closest('.team-card');
            const memberId = card.dataset.memberId;
            this.showMemberProfile(memberId);
            e.preventDefault();
            return;
        }
        
        // Handle project details clicks
        if (e.target.closest('[data-project]')) {
            const projectId = e.target.closest('[data-project]').dataset.project;
            this.showProjectDetails(projectId);
            e.preventDefault();
            return;
        }
        
        // Handle filter clicks
        if (e.target.closest('.filter')) {
            // Let the component handle filtering
            return;
        }
        
        // Handle status tab clicks
        if (e.target.closest('.status-tab')) {
            // Let the component handle filtering
            return;
        }
    }

    handleKeydown(e) {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            this.closeAllModals();
        }
    }

    showMemberProfile(memberId) {
        if (memberId) {
            this.components.profileModal.show(memberId);
        }
    }

    showProjectDetails(projectId) {
        if (projectId) {
            this.components.projectModal.show(projectId);
        }
    }

    closeAllModals() {
        // Hide profile modal
        const profileModal = document.getElementById('profile-modal');
        if (profileModal && profileModal.classList.contains('active')) {
            this.components.profileModal.hide();
        }
        
        // Hide project modal
        const projectModal = document.getElementById('project-modal');
        if (projectModal && projectModal.classList.contains('active')) {
            this.components.projectModal.hide();
        }
        
        // Close mobile menu
        document.body.classList.remove('mobile-menu-open');
    }

    handleScroll() {
        // Update navbar active state
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
        
        if (newSection !== this.currentSection) {
            this.currentSection = newSection;
            this.components.navbar.setActiveSection(newSection);
            this.updateNavbar();
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
        // Handle responsive behavior
        if (window.innerWidth > 768) {
            document.body.classList.remove('mobile-menu-open');
        }
        
        // Recalculate any responsive elements
        this.handleResponsiveElements();
    }

    handleResponsiveElements() {
        // Handle any responsive element adjustments
        const teamGrid = document.querySelector('.team-grid');
        const projectsGrid = document.querySelector('.projects-grid');
        
        if (window.innerWidth < 768) {
            // Mobile adjustments
            if (teamGrid) {
                teamGrid.style.gridTemplateColumns = '1fr';
            }
            if (projectsGrid) {
                projectsGrid.style.gridTemplateColumns = '1fr';
            }
        } else if (window.innerWidth < 1024) {
            // Tablet adjustments
            if (teamGrid) {
                teamGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            }
            if (projectsGrid) {
                projectsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            }
        } else {
            // Desktop adjustments
            if (teamGrid) {
                teamGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
            }
            if (projectsGrid) {
                projectsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(350px, 1fr))';
            }
        }
    }

    updateNavbar() {
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer) {
            navbarContainer.innerHTML = this.components.navbar.render();
        }
    }

    initFeatures() {
        // Initialize any additional features
        this.initSmoothScrolling();
        this.initFilterCounts();
    }

    initSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href === '#0') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    const offset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    this.currentSection = href.replace('#', '');
                    this.components.navbar.setActiveSection(this.currentSection);
                    this.updateNavbar();
                }
            });
        });
    }

    initFilterCounts() {
        // Initialize filter counts after components are loaded
        setTimeout(() => {
            this.updateFilterCounts();
        }, 500);
    }

    updateFilterCounts() {
        // Update filter counts if needed
        const teamFilters = document.querySelectorAll('.team-filters .filter');
        const projectTabs = document.querySelectorAll('.project-status-tabs .status-tab');
        
        // You can add dynamic count updating here if needed
        // For now, the counts are handled in the components
    }

    // Public API methods
    showSection(sectionId) {
        this.currentSection = sectionId;
        this.components.navbar.setActiveSection(sectionId);
        this.updateNavbar();
        
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    refresh() {
        // Refresh all components
        this.renderComponents();
        this.controllers.animations.init();
        this.initFeatures();
    }

    getCurrentSection() {
        return this.currentSection;
    }

    getTeamMember(memberId) {
        // This would fetch from your team data
        // For now, return the component's member
        return null;
    }

    getProject(projectId) {
        // This would fetch from your project data
        // For now, return the component's project
        return null;
    }
}

// Initialize the application when DOM is loaded
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
            showProject: (projectId) => window.ARISE.showProjectDetails(projectId)
        };
    }
    
    // Handle hash-based navigation on load
    if (window.location.hash) {
        const section = window.location.hash.substring(1);
        setTimeout(() => {
            window.ARISE.showSection(section);
        }, 100);
    }
    
    // Error handling
    window.addEventListener('error', (e) => {
        console.error('ARISE HQ Error:', e.error);
        // You could add user-friendly error handling here
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('ARISE HQ Promise Rejection:', e.reason);
        // You could add user-friendly error handling here
    });
});

// Export for module usage if needed
export { ARISEApp };
