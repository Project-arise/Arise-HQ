import { projects } from '../data/projects.js';

export class ProjectsSection {
    constructor() {
        this.projects = projects;
        this.activeFilter = 'all';
        this.init();
    }

    init() {
        // Setup filtering after render
        setTimeout(() => this.setupFiltering(), 100);
    }

    render() {
        const filteredProjects = this.getFilteredProjects(this.activeFilter);
        
        return `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Active Missions</h2>
                    <p class="section-subtitle">
                        Our portfolio of cutting-edge robotics and AI projects.
                    </p>
                </div>
                
                <div class="project-status-tabs">
                    <button class="status-tab active" data-status="all">All Projects (${this.projects.length})</button>
                    <button class="status-tab" data-status="active">Active</button>
                    <button class="status-tab" data-status="completed">Completed</button>
                    <button class="status-tab" data-status="upcoming">Upcoming</button>
                </div>
                
                <div class="projects-grid" id="projects-grid">
                    ${filteredProjects.map(project => this.renderProjectCard(project)).join('')}
                </div>
                
                <div class="no-results" id="projects-no-results" style="display: ${filteredProjects.length === 0 ? 'block' : 'none'};">
                    <div class="no-results-content">
                        <i class="fas fa-rocket"></i>
                        <h3>No projects found</h3>
                        <p>Try selecting a different status filter</p>
                    </div>
                </div>
                
                <div class="projects-legend">
                    <div class="legend-item">
                        <div class="legend-color active"></div>
                        <span>Active Development</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color completed"></div>
                        <span>Completed</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color upcoming"></div>
                        <span>Upcoming</span>
                    </div>
                </div>
            </div>
        `;
    }

    getFilteredProjects(status) {
        if (status === 'all') return this.projects;
        return this.projects.filter(project => project.status === status);
    }

    renderProjectCard(project) {
        const statusClass = `status-${project.status}`;
        const progressWidth = `${project.progress}%`;
        
        return `
            <div class="project-card ${statusClass} animate-on-scroll" data-project-id="${project.id}" data-status="${project.status}">
                <div class="project-header">
                    <div class="project-status ${statusClass}">
                        ${project.status.toUpperCase()}
                    </div>
                    <h3 class="project-name">${project.name}</h3>
                </div>
                
                <div class="project-body">
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressWidth}"></div>
                        </div>
                        <div class="progress-info">
                            <span class="progress-percent">${project.progress}%</span>
                            <span class="progress-timeline">Target: ${project.timeline}</span>
                        </div>
                    </div>
                    
                    <div class="project-impact">
                        <h4>Expected Impact</h4>
                        <p>${project.impact}</p>
                    </div>
                    
                    <div class="project-tech">
                        <h4>Technologies</h4>
                        <div class="tech-tags">
                            ${project.technologies.slice(0, 5).map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                            ${project.technologies.length > 5 ? '<span class="tech-tag">+' + (project.technologies.length - 5) + ' more</span>' : ''}
                        </div>
                    </div>
                </div>
                
                <div class="project-footer">
                    <div class="project-team">
                        <small>Team: ${project.team.length} members</small>
                    </div>
                    <button class="project-details-btn" data-project="${project.id}">
                        <i class="fas fa-expand-alt"></i>
                        View Details
                    </button>
                </div>
            </div>
        `;
    }

    setupFiltering() {
        const statusTabs = document.querySelectorAll('.project-status-tabs .status-tab');
        const projectsGrid = document.getElementById('projects-grid');
        const noResults = document.getElementById('projects-no-results');
        
        statusTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                statusTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Get status filter
                const status = tab.dataset.status;
                this.activeFilter = status;
                
                // Filter projects
                const filteredProjects = this.getFilteredProjects(status);
                
                // Update projects grid
                if (filteredProjects.length > 0) {
                    projectsGrid.innerHTML = filteredProjects.map(project => this.renderProjectCard(project)).join('');
                    noResults.style.display = 'none';
                    
                    // Update count in "All" tab
                    if (status === 'all') {
                        tab.textContent = `All Projects (${this.projects.length})`;
                    }
                    
                    // Re-initialize animations
                    this.initAnimations();
                    this.initProgressBars();
                } else {
                    projectsGrid.innerHTML = '';
                    noResults.style.display = 'block';
                }
            });
        });
    }

    initAnimations() {
        // Re-initialize scroll animations
        const animatedElements = document.querySelectorAll('.project-card.animate-on-scroll');
        
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
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    initProgressBars() {
        // Re-initialize progress bar animations
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
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
            observer.observe(bar);
        });
    }
}