export class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupHeroAnimations();
        this.setupAboutAnimations(); 
        this.setupProjectDetails();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add staggered delay for team cards and principles
                    if (entry.target.classList.contains('team-card') || 
                        entry.target.classList.contains('principle')) {
                        const elements = document.querySelectorAll('.team-card, .principle');
                        const index = Array.from(elements).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
        // Progress bar animation
        const progressBars = document.querySelectorAll('.progress-fill');
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    entry.target.classList.add('animated');
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.width = width;
                    }, 100);
                }
            });
        }, {
            threshold: 0.5
        });
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }

    setupHoverAnimations() {
        // Card hover effects
        const cards = document.querySelectorAll('.team-card, .project-card, .principle, .channel-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const isTeamCard = this.classList.contains('team-card');
                this.style.transform = isTeamCard ? 'translateY(-10px)' : 'translateY(-5px)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Button hover effects
        const buttons = document.querySelectorAll('.cta-button, .view-profile-btn, .project-details-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    setupAboutAnimations() {
    // Animate principles on scroll
    const principles = document.querySelectorAll('.principle');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    principles.forEach(principle => {
        observer.observe(principle);
    });
    
    // Initialize hologram animation
    this.initHologramAnimation();
}

initHologramAnimation() {
    const hologramCore = document.querySelector('.hologram-core');
    if (hologramCore) {
        // Add random pulse animation
        setInterval(() => {
            const scale = 1 + Math.random() * 0.2;
            hologramCore.style.transform = `scale(${scale})`;
        }, 2000);
    }
    
    // Add floating particles effect
    this.createFloatingParticles();
}

createFloatingParticles() {
    const hologramDisplay = document.querySelector('.hologram-display');
    if (!hologramDisplay) return;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'data-particle';
        
        const size = Math.random() * 6 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--color-primary);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            box-shadow: 0 0 ${size * 2}px var(--color-primary);
            animation: floatParticle ${duration}s ease-in-out infinite ${delay}s;
        `;
        
        hologramDisplay.appendChild(particle);
    }
}
    setupProjectDetails() {
    // Add click events for project details buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.project-details-btn')) {
            const btn = e.target.closest('.project-details-btn');
            const projectId = btn.dataset.project;
            
            // Dispatch custom event
            const event = new CustomEvent('arise:project:show', {
                detail: { projectId: parseInt(projectId) }
            });
            document.dispatchEvent(event);
            
            // Add click animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        }
    });
}

    setupHeroAnimations() {
        // Hero entrance animation
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroStats = document.querySelector('.hero-stats');
            
            if (heroTitle) {
                heroTitle.style.animation = 'fadeInUp 0.8s ease-out';
            }
            
            if (heroSubtitle) {
                heroSubtitle.style.animation = 'fadeInUp 0.8s ease-out 0.2s';
                heroSubtitle.style.animationFillMode = 'both';
            }
            
            if (heroStats) {
                heroStats.style.animation = 'fadeIn 0.8s ease-out 0.4s';
                heroStats.style.animationFillMode = 'both';
            }
        }, 300);
        
        // Scanline animation
        const scanline = document.querySelector('.hero-scanline');
        if (scanline) {
            let position = 0;
            setInterval(() => {
                position = (position + 1) % 100;
                scanline.style.top = `${position}%`;
            }, 30);
        }
        
        // Hologram animation
        const hologram = document.querySelector('.hologram-core');
        if (hologram) {
            setInterval(() => {
                hologram.style.transform = `scale(${1 + Math.random() * 0.2})`;
            }, 3000);
        }
    }
}