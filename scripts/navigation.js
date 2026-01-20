export class NavigationController {
    constructor() {
        this.isMobileMenuOpen = false;
        this.lastScrollPosition = 0;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollNavigation();
        this.setupScrollToTop();
        this.setupHashNavigation();
    }

    setupNavigation() {
        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href^="#"]');
            if (anchor) {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                
                if (targetId === '#' || targetId === '#0') {
                    // Scroll to top
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    this.closeMobileMenu();
                    
                    // Calculate offset (navbar height + some padding)
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const offset = navbarHeight + 20;
                    
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    const sectionId = targetId.replace('#', '');
                    this.updateActiveNavLink(sectionId);
                    
                    // Update URL hash without triggering hashchange
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    }
                }
            }
        });
    }

    setupMobileMenu() {
        // Setup mobile menu button (might be added dynamically)
        const setupMobileMenuListeners = () => {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const mobileCloseBtn = document.querySelector('.mobile-close-btn');
            const mobileOverlay = document.querySelector('.nav-mobile-overlay');
            
            if (mobileMenuBtn && !mobileMenuBtn.hasListener) {
                mobileMenuBtn.addEventListener('click', () => {
                    this.toggleMobileMenu();
                });
                mobileMenuBtn.hasListener = true;
            }
            
            if (mobileCloseBtn && !mobileCloseBtn.hasListener) {
                mobileCloseBtn.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
                mobileCloseBtn.hasListener = true;
            }
            
            if (mobileOverlay && !mobileOverlay.hasListener) {
                mobileOverlay.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
                mobileOverlay.hasListener = true;
            }
            
            // Close mobile menu when clicking a link
            const mobileLinks = document.querySelectorAll('.nav-link-mobile');
            mobileLinks.forEach(link => {
                if (!link.hasListener) {
                    link.addEventListener('click', () => {
                        this.closeMobileMenu();
                    });
                    link.hasListener = true;
                }
            });
        };
        
        // Run initially and also when DOM changes
        setupMobileMenuListeners();
        
        // Watch for DOM changes (for dynamically added elements)
        const observer = new MutationObserver(() => {
            setupMobileMenuListeners();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        this.updateMobileMenuState();
    }

    openMobileMenu() {
        this.isMobileMenuOpen = true;
        this.updateMobileMenuState();
    }

    closeMobileMenu() {
        this.isMobileMenuOpen = false;
        this.updateMobileMenuState();
    }

    updateMobileMenuState() {
        const mobileMenu = document.querySelector('.nav-links-mobile');
        const mobileOverlay = document.querySelector('.nav-mobile-overlay');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (this.isMobileMenuOpen) {
            document.body.classList.add('mobile-menu-open');
            mobileMenu?.classList.add('active');
            mobileOverlay?.classList.add('active');
            mobileMenuBtn?.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            this.lastScrollPosition = window.pageYOffset;
        } else {
            document.body.classList.remove('mobile-menu-open');
            mobileMenu?.classList.remove('active');
            mobileOverlay?.classList.remove('active');
            mobileMenuBtn?.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            window.scrollTo(0, this.lastScrollPosition);
        }
    }

    setupScrollNavigation() {
        let ticking = false;
        
        const handleScroll = () => {
            // Update navbar style on scroll
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            
            // Update active section based on scroll (only if not in modal)
            if (!document.querySelector('.profile-modal-overlay.active') && 
                !document.querySelector('.project-modal-overlay.active')) {
                this.updateActiveSection();
            }
            
            // Show/hide scroll to top button
            const scrollTopBtn = document.querySelector('.scroll-top-btn');
            if (scrollTopBtn) {
                if (window.scrollY > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            }
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(handleScroll);
                ticking = true;
            }
        });
        
        // Initial call
        handleScroll();
    }

    setupScrollToTop() {
        // Create scroll to top button if it doesn't exist
        if (!document.querySelector('.scroll-top-btn')) {
            const scrollTopBtn = document.createElement('button');
            scrollTopBtn.className = 'scroll-top-btn';
            scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
            scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            document.body.appendChild(scrollTopBtn);
            
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                this.updateActiveNavLink('home');
                
                // Update URL
                if (history.pushState) {
                    history.pushState(null, null, '#home');
                }
            });
        }
    }

    setupHashNavigation() {
        // Handle initial hash
        this.handleHashChange();
        
        // Handle hash changes
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });
    }

    handleHashChange() {
        const hash = window.location.hash.substring(1) || 'home';
        
        // Skip if it's a modal hash (profile or project)
        if (hash.includes('profile-') || hash.includes('project-')) {
            return;
        }
        
        // Update active link
        this.updateActiveNavLink(hash);
        
        // If there's a section with this ID, scroll to it
        const targetElement = document.getElementById(hash);
        if (targetElement && !this.isElementInViewport(targetElement)) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const offset = navbarHeight + 20;
            
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        let currentSection = 'home';
        let minDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
                minDistance = 0;
            } else {
                // Find the closest section
                const distance = Math.abs(scrollPosition - (sectionTop + sectionHeight / 2));
                if (distance < minDistance) {
                    minDistance = distance;
                    currentSection = sectionId;
                }
            }
        });
        
        this.updateActiveNavLink(currentSection);
    }

    updateActiveNavLink(sectionId) {
        // Update desktop nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const navIndicator = link.querySelector('.nav-indicator');
            if (navIndicator) navIndicator.remove();
            
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
                link.classList.add('active');
                // Add indicator
                const indicator = document.createElement('div');
                indicator.className = 'nav-indicator';
                link.appendChild(indicator);
            }
        });
        
        // Update mobile nav links
        const mobileLinks = document.querySelectorAll('.nav-link-mobile');
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}
