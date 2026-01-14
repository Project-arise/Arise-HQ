import { projects } from '../data/projects.js';
import { teamMembers } from '../data/team.js';

export class ProjectModal {
    constructor() {
        this.currentProject = null;
    }

    render(projectId) {
        const project = projects.find(p => p.id === parseInt(projectId));
        if (!project) return '';
        
        this.currentProject = project;
        
        // Get team members working on this project
        const projectTeam = teamMembers.filter(member => 
            project.team.includes(member.id)
        );
        
        // Get status color
        const statusColors = {
            'active': '#4cd964',
            'completed': '#00a8ff',
            'upcoming': '#fbc531'
        };
        
        const statusColor = statusColors[project.status] || '#00a8ff';

        return `
            <div class="project-modal-overlay" id="project-modal">
                <div class="project-modal">
                    <button class="project-close" id="project-close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <div class="project-modal-header" style="border-color: ${statusColor}">
                        <div class="project-modal-status" style="background: ${statusColor}20; color: ${statusColor}">
                            ${project.status.toUpperCase()}
                        </div>
                        <h2>${project.name}</h2>
                        <div class="project-modal-timeline">
                            <i class="far fa-calendar"></i>
                            <span>Target: ${project.timeline}</span>
                        </div>
                    </div>
                    
                    <div class="project-modal-body">
                        <!-- Progress Section -->
                        <div class="project-modal-section">
                            <h3><i class="fas fa-chart-line"></i> Progress</h3>
                            <div class="project-progress-large">
                                <div class="progress-bar-large">
                                    <div class="progress-fill-large" 
                                         style="width: ${project.progress}%; background: ${statusColor}"></div>
                                </div>
                                <div class="progress-info-large">
                                    <span class="progress-percent-large">${project.progress}% Complete</span>
                                    <span class="progress-budget">Budget: ${project.budget}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Description Section -->
                        <div class="project-modal-section">
                            <h3><i class="fas fa-align-left"></i> Description</h3>
                            <div class="project-description-large">
                                ${project.longDescription || project.description}
                            </div>
                        </div>
                        
                        <!-- Technologies Section -->
                        <div class="project-modal-section">
                            <h3><i class="fas fa-code"></i> Technologies</h3>
                            <div class="project-tech-large">
                                ${project.technologies.map(tech => `
                                    <span class="tech-tag-large">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Team Section -->
                        <div class="project-modal-section">
                            <h3><i class="fas fa-users"></i> Team</h3>
                            <div class="project-team-large">
                                ${projectTeam.map(member => `
                                    <div class="project-team-member" data-member-id="${member.id}">
                                        <div class="team-member-avatar" style="background: ${member.photoColor}">
                                            ${member.name.charAt(0)}
                                        </div>
                                        <div class="team-member-info">
                                            <div class="team-member-name">${member.name}</div>
                                            <div class="team-member-role">${member.role}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Impact & Milestones -->
                        <div class="project-modal-grid">
                            <div class="project-modal-section">
                                <h3><i class="fas fa-bullseye"></i> Expected Impact</h3>
                                <div class="project-impact-large">
                                    ${project.impact}
                                </div>
                            </div>
                            
                            <div class="project-modal-section">
                                <h3><i class="fas fa-flag-checkered"></i> Milestones</h3>
                                <ul class="milestones-list">
                                    ${project.milestones.map((milestone, index) => `
                                        <li class="milestone-item ${milestone.includes('COMPLETE') ? 'completed' : 
                                                                   milestone.includes('IN PROGRESS') ? 'in-progress' : 
                                                                   'upcoming'}">
                                            <div class="milestone-number">${index + 1}</div>
                                            <div class="milestone-content">
                                                <div class="milestone-text">${milestone}</div>
                                            </div>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <!-- Links Section -->
                        ${(project.github || project.documentation || project.whitepaper) ? `
                        <div class="project-modal-section">
                            <h3><i class="fas fa-external-link-alt"></i> Resources</h3>
                            <div class="project-links">
                                ${project.github ? `
                                    <a href="${project.github}" class="project-link" target="_blank" rel="noopener">
                                        <i class="fab fa-github"></i>
                                        <span>GitHub Repository</span>
                                    </a>
                                ` : ''}
                                ${project.documentation ? `
                                    <a href="${project.documentation}" class="project-link" target="_blank" rel="noopener">
                                        <i class="fas fa-book"></i>
                                        <span>Documentation</span>
                                    </a>
                                ` : ''}
                                ${project.whitepaper ? `
                                    <a href="${project.whitepaper}" class="project-link" target="_blank" rel="noopener">
                                        <i class="fas fa-file-pdf"></i>
                                        <span>Whitepaper</span>
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    show(projectId) {
        const modalContainer = document.getElementById('project-modal-container');
        if (!modalContainer) {
            // Create container if it doesn't exist
            const container = document.createElement('div');
            container.id = 'project-modal-container';
            document.body.appendChild(container);
        }
        
        document.getElementById('project-modal-container').innerHTML = this.render(projectId);
        
        const modal = document.getElementById('project-modal');
        if (modal) {
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
        
        // Add close event listener
        const closeBtn = document.getElementById('project-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }
        
        // Close on overlay click
        const overlay = document.querySelector('.project-modal-overlay');
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
        
        // Team member click events
        document.querySelectorAll('.project-team-member').forEach(member => {
            member.addEventListener('click', (e) => {
                const memberId = e.currentTarget.dataset.memberId;
                this.hide();
                // Dispatch event to show member profile
                setTimeout(() => {
                    const event = new CustomEvent('arise:profile:show', {
                        detail: { memberId: parseInt(memberId) }
                    });
                    document.dispatchEvent(event);
                }, 300);
            });
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    hide() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.remove('active');
            
            setTimeout(() => {
                const modalContainer = document.getElementById('project-modal-container');
                if (modalContainer) {
                    modalContainer.innerHTML = '';
                }
                
                // Restore body scroll
                document.body.style.overflow = '';
            }, 300);
        }
    }
}