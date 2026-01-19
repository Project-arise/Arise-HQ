import { teamMembers } from '../data/team.js';

export class ProfileModal {
    constructor() {
        this.currentMember = null;
    }

    render(memberId) {
        const member = teamMembers.find(m => m.id === parseInt(memberId));
        if (!member) return '';
        
        this.currentMember = member;

        return `
            <div class="profile-modal-overlay" id="profile-modal">
                <div class="profile-modal">
                    <button class="profile-close" id="profile-close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <div class="profile-header">
                        <div class="profile-avatar">
                            <img src="${member.avatar}" 
                                 onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22${member.photoColor.replace('#', '%23')}%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-size=%2240%22>${member.name.charAt(0)}</text></svg>'">
                        </div>
                        <div class="profile-info">
                            <h2>${member.name}</h2>
                            <div class="profile-role">${member.role}</div>
                            <div class="profile-tagline">${member.tagline}</div>
                            <div class="profile-social">
                                ${member.social.twitter ? `
                                    <a href="https://twitter.com/${member.social.twitter.replace('@', '')}" 
                                       class="social-link" target="_blank" rel="noopener">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                ` : ''}
                                ${member.social.linkedin ? `
                                    <a href="https://linkedin.com/in/${member.social.linkedin}" 
                                       class="social-link" target="_blank" rel="noopener">
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                ` : ''}
                                ${member.social.github ? `
                                    <a href="https://github.com/${member.social.github}" 
                                       class="social-link" target="_blank" rel="noopener">
                                        <i class="fab fa-github"></i>
                                    </a>
                                ` : ''}
                                ${member.social.email ? `
                                    <a href="mailto:${member.social.email}" 
                                       class="social-link">
                                        <i class="fas fa-envelope"></i>
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-body">
                        <!-- Bio Section -->
                        <div class="profile-section">
                            <h3>About</h3>
                            <div class="profile-bio">${member.detailedBio}</div>
                        </div>
                        
                        <div class="profile-grid">
                            <!-- Skills Section -->
                            <div class="profile-section">
                                <h3>Core Skills</h3>
                                <div class="skills-list">
                                    ${member.skills.map(skill => `
                                        <span class="skill-tag">${skill}</span>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <!-- Expertise Section -->
                            <div class="profile-section">
                                <h3>Areas of Expertise</h3>
                                <div class="skills-list">
                                    ${member.expertise.map(exp => `
                                        <span class="skill-tag" style="background: rgba(156, 136, 255, 0.1); color: var(--color-secondary);">
                                            ${exp}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Projects Section -->
                        <div class="profile-section">
                            <h3>Key Projects</h3>
                            <div class="projects-list">
                                ${member.projects.map(project => `
                                    <span class="project-tag">${project}</span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Achievements Section -->
                        <div class="profile-section">
                            <h3>Notable Achievements</h3>
                            <ul class="achievements-list">
                                ${member.achievements.map(achievement => `
                                    <li>${achievement}</li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <!-- Education & Experience -->
                        <div class="profile-grid">
                            <div class="profile-section">
                                <h3>Education</h3>
                                <ul class="achievements-list">
                                    ${member.education.map(edu => `
                                        <li>${edu}</li>
                                    `).join('')}
                                </ul>
                            </div>
                            
                            <div class="profile-section">
                                <h3>Professional Experience</h3>
                                <ul class="achievements-list">
                                    ${member.experience.map(exp => `
                                        <li>${exp}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <!-- Additional Info -->
                        <div class="profile-section">
                            <h3>Additional Information</h3>
                            <div class="profile-info-grid">
                                <div class="info-item">
                                    <strong>Joined ARISE:</strong>
                                    <span>${member.joined}</span>
                                </div>
                                <div class="info-item">
                                    <strong>Location:</strong>
                                    <span>${member.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    show(memberId) {
        const modalContainer = document.getElementById('profile-modal-container');
        modalContainer.innerHTML = this.render(memberId);
        
        const modal = document.getElementById('profile-modal');
        if (modal) {
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
        
        // Add close event listener
        const closeBtn = document.getElementById('profile-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }
        
        // Close on overlay click
        const overlay = document.querySelector('.profile-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.hide();
                }
            });
        }
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hide();
            }
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    hide() {
        const modal = document.getElementById('profile-modal');
        if (modal) {
            modal.classList.remove('active');
            
            setTimeout(() => {
                const modalContainer = document.getElementById('profile-modal-container');
                modalContainer.innerHTML = '';
                
                // Restore body scroll
                document.body.style.overflow = '';
            }, 300);
        }
    }
}
