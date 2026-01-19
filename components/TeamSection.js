import { teamMembers } from '../data/team.js';

export class TeamSection {
    constructor() {
        this.members = teamMembers;
        this.activeFilter = 'all';
        this.init();
    }

    init() {
        // Setup filtering after render
        setTimeout(() => {
            this.setupFiltering();
            this.setupImageErrorHandling();
        }, 100);
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

    // Helper method to get correct avatar path
    getAvatarPath(member) {
        const originalPath = member.avatar;
        
        // Debug log
        console.log(`Processing avatar for ${member.name}:`, {
            original: originalPath,
            location: window.location.href
        });
        
        // If it's already a full URL or data URL, return as-is
        if (originalPath.startsWith('http') || originalPath.startsWith('data:')) {
            return originalPath;
        }
        
        // Extract just the filename
        const filename = originalPath.split('/').pop();
        
        // Try different path patterns (most common first)
        const basePaths = [
            './assets/images/team/',    // Relative from HTML file
            '/assets/images/team/',     // Absolute from root
            'assets/images/team/',      // No prefix
            '../assets/images/team/'    // Up one level
        ];
        
        // Test which path works (this will be client-side)
        return basePaths[0] + filename; // Start with first option
    }

    renderMemberCard(member) {
        const avatarPath = this.getAvatarPath(member);
        
        return `
            <div class="team-card animate-on-scroll" data-member-id="${member.id}" data-category="${member.category}">
                <div class="card-glow" style="background: ${member.photoColor}"></div>
                
                <div class="card-header">
                    <div class="member-photo">
                        <img src="${avatarPath}" 
                             alt="${member.name}" 
                             loading="lazy"
                             class="member-avatar"
                             data-member-id="${member.id}"
                             data-fallback-color="${member.photoColor}"
                             data-fallback-initial="${member.name.charAt(0)}"
                             onerror="window.handleAvatarError(this)">
                        <div class="member-photo-placeholder" 
                             style="background: ${member.photoColor}; display: none;">
                            <span>${member.name.charAt(0)}</span>
                        </div>
                    </div>
                    <h3 class="member-name">${member.name}</h3>
                    <div class="member-role">${member.role}</div>
                    <div class="member-tagline">${member.tagline}</div>
                </div>
                
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

    setupImageErrorHandling() {
        // Global function to handle avatar errors
        window.handleAvatarError = function(imgElement) {
            console.warn('Avatar failed to load:', imgElement.src);
            
            const color = imgElement.getAttribute('data-fallback-color') || '#9c88ff';
            const initial = imgElement.getAttribute('data-fallback-initial') || '?';
            
            // Hide the broken image
            imgElement.style.display = 'none';
            
            // Show the placeholder
            const placeholder = imgElement.nextElementSibling;
            if (placeholder && placeholder.classList.contains('member-photo-placeholder')) {
                placeholder.style.display = 'flex';
                placeholder.style.alignItems = 'center';
                placeholder.style.justifyContent = 'center';
                placeholder.querySelector('span').textContent = initial;
                
                // If placeholder doesn't have a span, create one
                if (!placeholder.querySelector('span')) {
                    const span = document.createElement('span');
                    span.textContent = initial;
                    span.style.color = 'white';
                    span.style.fontSize = '32px';
                    span.style.fontWeight = 'bold';
                    placeholder.appendChild(span);
                }
            }
        };
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
