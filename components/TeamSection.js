import { teamMembers } from '../data/team.js';

export class TeamSection {
    constructor() {
        this.members = teamMembers;
        this.activeFilter = 'all';
        this.init();
    }

    init() {
        // Setup filtering after render
        setTimeout(() => this.setupFiltering(), 100);
    }

    render() {
        return `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Elite Team</h2>
                    <p class="section-subtitle">
                        The minds building tomorrow's autonomous systems. Each member brings unique expertise to ARISE.
                    </p>
                </div>
                
                <div class="team-filters">
                    <div class="filter active" data-filter="all">All Members (${this.members.length})</div>
                    <div class="filter" data-filter="leadership">Leadership</div>
                    <div class="filter" data-filter="engineering">Engineering</div>
                    <div class="filter" data-filter="research">Research</div>
                </div>
                
                <div class="team-grid" id="team-grid">
                    ${this.getFilteredMembers(this.activeFilter).map(member => this.renderMemberCard(member)).join('')}
                </div>
                
                <div class="no-results" id="no-results" style="display: none;">
                    <div class="no-results-content">
                        <i class="fas fa-search"></i>
                        <h3>No members found</h3>
                        <p>Try selecting a different filter</p>
                    </div>
                </div>
            </div>
        `;
    }

    getFilteredMembers(filter) {
        if (filter === 'all') return this.members;
        
        return this.members.filter(member => {
            switch(filter) {
                case 'leadership':
                    return member.role.toLowerCase().includes('founder') || 
                           member.role.toLowerCase().includes('lead') ||
                           member.role.toLowerCase().includes('head') ||
                           member.role.toLowerCase().includes('director');
                case 'engineering':
                    return member.category === 'engineering' || 
                           member.role.toLowerCase().includes('engineer') ||
                           member.role.toLowerCase().includes('developer') ||
                           member.role.toLowerCase().includes('architect');
                case 'research':
                    return member.category === 'research' || 
                           member.role.toLowerCase().includes('research') ||
                           member.role.toLowerCase().includes('scientist') ||
                           member.role.toLowerCase().includes('phd');
                default:
                    return true;
            }
        });
    }

    renderMemberCard(member) {
    return `
        <div class="team-card animate-on-scroll" data-member-id="${member.id}" data-category="${member.category}">
            <div class="card-glow" style="background: ${member.photoColor}"></div>
            
            <div class="card-header">
                <!-- Replace the placeholder with actual image -->
                <div class="member-photo">
                    <img src="${member.avatar}" alt="${member.name}" 
                         loading="lazy"
                         onerror="
                            this.onerror=null;
                            this.style.display='none';
                            const placeholder = document.createElement('div');
                            placeholder.className = 'member-photo-placeholder';
                            placeholder.style.background = '${member.photoColor}';
                            placeholder.innerHTML = '<span>${member.name.charAt(0)}</span>';
                            this.parentElement.appendChild(placeholder);
                         ">
                </div>
                <h3 class="member-name">${member.name}</h3>
                <div class="member-role">${member.role}</div>
                <div class="member-tagline">${member.tagline}</div>
            </div>
            
            <!-- Rest of your code remains the same -->
            <div class="card-body">
                <div class="member-bio">
                    <p>${member.bio}</p>
                </div>
                
                <div class="member-skills">
                    <h4>Core Competencies</h4>
                    <div class="skills-list">
                        ${member.skills.slice(0, 4).map(skill => `
                            <span class="skill-tag">${skill}</span>
                        `).join('')}
                        ${member.skills.length > 4 ? '<span class="skill-tag">+' + (member.skills.length - 4) + ' more</span>' : ''}
                    </div>
                </div>
            </div>
            
            <div class="card-footer">
                <div class="social-links">
                    ${member.social.instagram ? `
                        <a href="https://instagram.com/${member.social.instagram.replace('@', '')}" 
                        class="social-link instagram" target="_blank" rel="noopener">
                            <i class="fab fa-instagram"></i>
                        </a>
                    ` : ''}
                    ${member.social.twitter ? `
                        <a href="https://twitter.com/${member.social.twitter.replace('@', '')}" 
                           class="social-link" target="_blank" rel="noopener" aria-label="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                    ` : ''}
                    ${member.social.linkedin ? `
                        <a href="https://linkedin.com/in/${member.social.linkedin}" 
                           class="social-link" target="_blank" rel="noopener" aria-label="LinkedIn">
                            <i class="fab fa-linkedin"></i>
                        </a>
                    ` : ''}
                </div>
                <button class="view-profile-btn" data-member="${member.id}" aria-label="View full profile">
                    View Profile
                </button>
            </div>
        </div>
    `;
}
    setupFiltering() {
        const filterButtons = document.querySelectorAll('.team-filters .filter');
        const teamGrid = document.getElementById('team-grid');
        const noResults = document.getElementById('no-results');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Get filter value
                const filter = button.dataset.filter;
                this.activeFilter = filter;
                
                // Filter members
                const filteredMembers = this.getFilteredMembers(filter);
                
                // Update team grid
                if (filteredMembers.length > 0) {
                    teamGrid.innerHTML = filteredMembers.map(member => this.renderMemberCard(member)).join('');
                    noResults.style.display = 'none';
                    
                    // Re-initialize animations for new cards
                    this.initAnimations();
                } else {
                    teamGrid.innerHTML = '';
                    noResults.style.display = 'block';
                }
                
                // Update count in "All" button
                if (filter === 'all') {
                    button.textContent = `All Members (${this.members.length})`;
                }
            });
        });
    }

    initAnimations() {
        // Re-initialize scroll animations for newly added cards
        const animatedElements = document.querySelectorAll('.team-card.animate-on-scroll');
        
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
}
