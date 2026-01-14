import { siteConfig } from '../data/siteConfig.js';

export class AboutSection {
    constructor() {
        this.config = siteConfig;
        this.principles = [
            {
                icon: 'fa-brain',
                title: 'Autonomy First',
                description: 'Systems that think and act independently, reducing human intervention while maintaining safety'
            },
            {
                icon: 'fa-shield-alt',
                title: 'Safety by Design',
                description: 'Fail-safe architectures from the ground up, with multiple redundancy layers'
            },
            {
                icon: 'fa-sync-alt',
                title: 'Continuous Evolution',
                description: 'Systems that learn and improve over time through real-world experience'
            },
            {
                icon: 'fa-users',
                title: 'Human-Centered',
                description: 'Technology that enhances human capability, not replaces it'
            }
        ];
    }

    render() {
        return `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">About ARISE</h2>
                    <p class="section-subtitle">
                        We're not just building robots. We're building the future of autonomous systems.
                    </p>
                </div>
                
                <div class="about-content">
                    <div class="about-text">
                        <div class="about-paragraphs">
                            <p>
                                Project ARISE was founded on a simple premise: the future of robotics isn't about 
                                replacing humans, but augmenting our capabilities to solve problems previously 
                                considered impossible.
                            </p>
                            <p>
                                We operate at the intersection of advanced robotics, artificial intelligence, and 
                                systems engineering. Our team consists of engineers, researchers, and visionaries 
                                who have worked at the forefront of autonomous technology.
                            </p>
                            
                            <div class="about-highlight">
                                <i class="fas fa-quote-left"></i>
                                <p>${this.config.mission}</p>
                                <i class="fas fa-quote-right"></i>
                            </div>
                            
                            <h3 class="about-subtitle">Our Vision</h3>
                            <p>${this.config.vision}</p>
                            
                            <h3 class="about-subtitle">Core Principles</h3>
                            <p>These guiding principles shape everything we build at ARISE:</p>
                            
                            <div class="principles-grid">
                                ${this.principles.map((principle, index) => this.renderPrinciple(principle, index)).join('')}
                            </div>
                            
                            <div class="about-stats">
                                <div class="stat-item">
                                    <div class="stat-number">100%</div>
                                    <div class="stat-label">Mission Critical Focus</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">24/7</div>
                                    <div class="stat-label">System Reliability</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">0</div>
                                    <div class="stat-label">Compromises on Safety</div>
                                </div>
                            </div>
                            
                            <h3 class="about-subtitle">Our Approach</h3>
                            <p>
                                We believe in practical innovation. Every project starts with a real-world problem 
                                and ends with a deployable solution. Our iterative development process ensures we 
                                deliver value at every stage.
                            </p>
                        </div>
                    </div>
                    
                    <div class="about-visual">
                        <div class="hologram-container">
                            <div class="hologram-display">
                                <div class="hologram-core"></div>
                                <div class="hologram-ring ring-1"></div>
                                <div class="hologram-ring ring-2"></div>
                                <div class="hologram-ring ring-3"></div>
                            </div>
                            <div class="hologram-label">
                                <i class="fas fa-atom"></i>
                                <span>ARISE Core</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPrinciple(principle, index) {
        return `
            <div class="principle" data-animation="fade-up" style="animation-delay: ${index * 0.1}s">
                <div class="principle-icon">
                    <i class="fas ${principle.icon}"></i>
                </div>
                <h4>${principle.title}</h4>
                <p>${principle.description}</p>
            </div>
        `;
    }
}