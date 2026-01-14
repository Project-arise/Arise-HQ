import { siteConfig } from '../data/siteConfig.js';

export class ContactSection {
    constructor() {
        this.config = siteConfig;
    }

    render() {
        return `
            <div class="container">
                <div class="contact-content">
                    <div class="contact-header">
                        <h2 class="section-title">Contact</h2>
                        <p class="section-subtitle">
                            ARISE HQ maintains limited external communication channels.
                        </p>
                    </div>
                    
                    <div class="contact-notice">
                        <div class="notice-icon">
                            <i class="fas fa-lock"></i>
                        </div>
                        <div class="notice-content">
                            <h3>Closed Facility Notice</h3>
                            <p>
                                ARISE HQ operates as a closed research and development facility. 
                                We are not currently accepting partnership inquiries, investment offers, 
                                or recruitment applications.
                            </p>
                        </div>
                    </div>
                    
                    <div class="contact-channels">
                        <div class="channel-card">
                            <div class="channel-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="channel-info">
                                <h4>Official Email</h4>
                                <a href="mailto:${this.config.socialLinks.email}" class="channel-link">
                                    ${this.config.socialLinks.email}
                                </a>
                                <p class="channel-desc">For verified partners and collaborators only</p>
                            </div>
                        </div>
                        
                        <div class="channel-card">
                            <div class="channel-icon">
                                <i class="fas fa-broadcast-tower"></i>
                            </div>
                            <div class="channel-info">
                                <h4>Public Channels</h4>
                                <div class="social-links">
                                    <a href="${this.config.socialLinks.twitter}" class="social-link" target="_blank" rel="noopener" aria-label="Twitter">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                    <a href="${this.config.socialLinks.instagram}" class="social-link instagram" target="_blank" rel="noopener" aria-label="Instagram">
                                        <i class="fab fa-instagram"></i>
                                    </a>
                                    <a href="${this.config.socialLinks.github}" class="social-link" target="_blank" rel="noopener" aria-label="GitHub">
                                        <i class="fab fa-github"></i>
                                    </a>
                                    <a href="${this.config.socialLinks.linkedin}" class="social-link" target="_blank" rel="noopener" aria-label="LinkedIn">
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                    <a href="${this.config.socialLinks.youtube}" class="social-link" target="_blank" rel="noopener" aria-label="YouTube">
                                        <i class="fab fa-youtube"></i>
                                    </a>
                                </div>
                                <p class="channel-desc">Announcements and technical publications</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="contact-disclaimer">
                        <p>
                            <i class="fas fa-info-circle"></i>
                            All communications are monitored and filtered. Automated systems 
                            will ignore unsolicited commercial inquiries.
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}