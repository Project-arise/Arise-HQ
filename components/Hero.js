import { siteConfig } from '../data/siteConfig.js';

export class Hero {
    constructor() {
        this.config = siteConfig;
    }

    render() {
        return `
            <div class="hero-background">
                <div class="hero-grid"></div>
                <div class="hero-scanline"></div>
            </div>
            
            <div class="container">
                <div class="hero-content">
                    <div class="hero-badge">
                        <span class="badge-text">ELITE TEAM</span>
                    </div>
                    
                    <h1 class="hero-title">
                        <span class="hero-gradient">ARISE</span> HQ
                    </h1>
                    
                    <p class="hero-subtitle">
                        ${this.config.tagline}
                    </p>
                    
                    <div class="hero-stats">
                        <div class="stat">
                            <div class="stat-value">4</div>
                            <div class="stat-label">Core Members</div>
                        </div>
                        <div class="stat-divider"></div>
                        <div class="stat">
                            <div class="stat-value">12+</div>
                            <div class="stat-label">Years Experience</div>
                        </div>
                        <div class="stat-divider"></div>
                        <div class="stat">
                            <div class="stat-value">4</div>
                            <div class="stat-label">Active Projects</div>
                        </div>
                    </div>
                    
                    <div class="mission-container">
                        <div class="mission-header">
                            <i class="fas fa-bullseye"></i>
                            <h3>Our Mission</h3>
                        </div>
                        <p class="mission-statement">${this.config.mission}</p>
                    </div>
                    
                    <div class="cta-container">
                        <a href="#team" class="cta-button cta-primary" data-nav="team">
                            <span>Meet the Team</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                        <a href="#projects" class="cta-button cta-secondary" data-nav="projects">
                            <span>View Projects</span>
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                    
                    <div class="hero-notice">
                        <i class="fas fa-shield-alt"></i>
                        <span>${this.config.notice}</span>
                    </div>
                </div>
            </div>
            
            <div class="scroll-indicator">
                <div class="scroll-mouse">
                    <div class="scroll-wheel"></div>
                </div>
                <span>Scroll to explore</span>
            </div>
        `;
    }
}