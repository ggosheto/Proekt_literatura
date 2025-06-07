// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 248, 220, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 69, 19, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 248, 220, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stage, .pillar, .project-card, .timeline-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Interactive stage elements
    const stages = document.querySelectorAll('.stage');
    stages.forEach((stage, index) => {
        stage.addEventListener('click', function() {
            // Remove active class from all stages
            stages.forEach(s => s.classList.remove('active'));
            // Add active class to clicked stage
            this.classList.add('active');
            
            // Add visual feedback
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });

        // Add hover sound effect (visual feedback)
        stage.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(139, 69, 19, 0.3)';
        });

        stage.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 20px rgba(139, 69, 19, 0.1)';
        });
    });

    // Pillar interactions
    const pillars = document.querySelectorAll('.pillar');
    pillars.forEach(pillar => {
        pillar.addEventListener('click', function() {
            const details = this.querySelector('.pillar-details');
            const isExpanded = details.style.maxHeight && details.style.maxHeight !== '0px';
            
            // Close all other pillars
            pillars.forEach(p => {
                if (p !== this) {
                    const otherDetails = p.querySelector('.pillar-details');
                    otherDetails.style.maxHeight = '0px';
                    otherDetails.style.opacity = '0';
                    p.classList.remove('expanded');
                }
            });
            
            // Toggle current pillar
            if (isExpanded) {
                details.style.maxHeight = '0px';
                details.style.opacity = '0';
                this.classList.remove('expanded');
            } else {
                details.style.maxHeight = '200px';
                details.style.opacity = '1';
                this.classList.add('expanded');
            }
        });
    });

    // Project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const btn = card.querySelector('.project-btn');
        const projectType = card.getAttribute('data-project');
        
        btn.addEventListener('click', function() {
            handleProjectClick(projectType, card);
        });

        // Add interactive preview animations
        const preview = card.querySelector('.project-preview');
        card.addEventListener('mouseenter', function() {
            animatePreview(projectType, preview);
        });
    });

    // Timeline interactions
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Add click animation
            const content = this.querySelector('.timeline-content');
            content.style.transform = 'scale(1.1)';
            content.style.background = 'rgba(255, 255, 255, 0.2)';
            
            setTimeout(() => {
                content.style.transform = 'scale(1.05)';
                content.style.background = 'rgba(255, 255, 255, 0.15)';
            }, 200);

            // Show detailed information (placeholder)
            showTimelineDetails(item.getAttribute('data-era'));
        });
    });

    // Scroll progress indicator
    createScrollProgress();

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Dynamic text animation for hero
    animateHeroText();

    // Add floating particles effect
    createFloatingParticles();
});

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle project interactions
function handleProjectClick(projectType, card) {
    const modal = createProjectModal(projectType);
    document.body.appendChild(modal);
    
    // Animate modal appearance
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Add click animation to card
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 200);
}

// Create project modal
function createProjectModal(projectType) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = getProjectModalContent(projectType);
    
    // Close modal functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
    
    return modal;
}

// Get project modal content
function getProjectModalContent(projectType) {
    const content = {
        map: {
            title: 'Map of Awakening',
            description: 'An interactive journey through the stages of national consciousness',
            details: `
                <div class="modal-section">
                    <h3>Interactive Elements</h3>
                    <ul>
                        <li>Clickable regions showing historical examples</li>
                        <li>Timeline slider for different eras</li>
                        <li>Audio narratives for each stage</li>
                        <li>Visual metaphors and symbols</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h3>Educational Goals</h3>
                    <p>Help visitors understand the universal patterns of national awakening through visual storytelling and interactive exploration.</p>
                </div>
            `
        },
        documentary: {
            title: 'Word. Rebellion. Freedom.',
            description: 'A multimedia exploration of the three pillars of transformation',
            details: `
                <div class="modal-section">
                    <h3>Video Segments</h3>
                    <ul>
                        <li>Historical footage compilation</li>
                        <li>Poetry readings and literary excerpts</li>
                        <li>Expert interviews and analysis</li>
                        <li>Contemporary parallels and reflections</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h3>Artistic Approach</h3>
                    <p>Combining archival materials with modern interpretations to create a powerful narrative about the role of language, resistance, and knowledge in national awakening.</p>
                </div>
            `
        },
        play: {
            title: 'The Awakening',
            description: 'A symbolic theatrical performance exploring internal and external conflicts',
            details: `
                <div class="modal-section">
                    <h3>Performance Structure</h3>
                    <ul>
                        <li>Act I: The Sleep - Collective unconsciousness</li>
                        <li>Act II: The Stirring - First awareness</li>
                        <li>Act III: The Struggle - Conflict and resistance</li>
                        <li>Act IV: The Birth - Emergence of national identity</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h3>Symbolic Elements</h3>
                    <p>Using metaphorical characters, lighting, and music to represent the psychological and social transformation of a people becoming a nation.</p>
                </div>
            `
        },
        installation: {
            title: 'The Weight of Chains',
            description: 'An immersive art installation about breaking free from oppression',
            details: `
                <div class="modal-section">
                    <h3>Installation Components</h3>
                    <ul>
                        <li>Physical chains suspended from ceiling</li>
                        <li>Interactive breaking mechanism</li>
                        <li>Sound design reflecting struggle and liberation</li>
                        <li>Lighting that responds to visitor movement</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h3>Visitor Experience</h3>
                    <p>Participants physically interact with the installation, experiencing the weight of oppression and the cathartic release of breaking free.</p>
                </div>
            `
        }
    };
    
    const project = content[projectType];
    return `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <h2>${project.title}</h2>
            <p class="modal-description">${project.description}</p>
            ${project.details}
            <div class="modal-actions">
                <button class="modal-btn primary">Learn More</button>
                <button class="modal-btn secondary">Share Project</button>
            </div>
        </div>
    `;
}

// Animate project previews
function animatePreview(projectType, preview) {
    switch(projectType) {
        case 'map':
            const markers = preview.querySelectorAll('.marker');
            markers.forEach((marker, index) => {
                setTimeout(() => {
                    marker.style.transform = 'scale(1.5)';
                    setTimeout(() => {
                        marker.style.transform = 'scale(1)';
                    }, 200);
                }, index * 200);
            });
            break;
        case 'documentary':
            const playButton = preview.querySelector('.play-button');
            playButton.style.transform = 'scale(1.2)';
            setTimeout(() => {
                playButton.style.transform = 'scale(1)';
            }, 300);
            break;
        case 'play':
            const actors = preview.querySelectorAll('.actor');
            actors.forEach((actor, index) => {
                setTimeout(() => {
                    actor.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        actor.style.transform = 'translateY(0)';
                    }, 300);
                }, index * 150);
            });
            break;
        case 'installation':
            const brokenChain = preview.querySelector('.chain-link.broken');
            brokenChain.style.animation = 'break-chain 0.5s ease-in-out';
            break;
    }
}

// Show timeline details
function showTimelineDetails(era) {
    const details = {
        ancient: 'Ancient civilizations developed collective identity through shared myths, religions, and cultural practices.',
        renaissance: 'The Renaissance sparked cultural awakening and the reformation challenged religious authority.',
        enlightenment: 'Enlightenment ideals of reason and individual rights inspired democratic movements.',
        romantic: 'Romantic nationalism emphasized cultural heritage and folk traditions as sources of identity.',
        modern: '20th century saw widespread decolonization and independence movements worldwide.',
        digital: 'Digital age enables new forms of collective organization and global awareness.'
    };
    
    // Create temporary notification
    const notification = document.createElement('div');
    notification.className = 'timeline-notification';
    notification.textContent = details[era];
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Create scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Animate hero text
function animateHeroText() {
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const description = document.querySelector('.hero-description');
    
    if (title) {
        const titleText = title.textContent;
        title.textContent = '';
        
        titleText.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.animation = `fadeInChar 0.1s ease forwards ${index * 0.1}s`;
            title.appendChild(span);
        });
    }
}

// Create floating particles
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        hero.appendChild(particle);
    }
}

// Add CSS for dynamic elements
const dynamicStyles = `
<style>
.project-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.project-modal.active {
    opacity: 1;
}

.modal-content {
    background: white;
    padding: 3rem;
    border-radius: 20px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.project-modal.active .modal-content {
    transform: scale(1);
}

.close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #666;
}

.modal-description {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
}

.modal-section {
    margin-bottom: 2rem;
}

.modal-section h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.modal-btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.modal-btn.primary {
    background: var(--primary-color);
    color: white;
}

.modal-btn.secondary {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--accent-color);
    z-index: 1001;
    transition: width 0.1s ease;
}

.timeline-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    max-width: 300px;
}

.timeline-notification.show {
    transform: translateX(0);
}

@keyframes fadeInChar {
    to {
        opacity: 1;
    }
}

.floating-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: float linear infinite;
}

@keyframes float {
    0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
    }
}

.stage.active {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
}

.pillar.expanded {
    background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
    .modal-content {
        margin: 1rem;
        padding: 2rem;
    }
    
    .modal-actions {
        flex-direction: column;
    }
    
    .timeline-notification {
        bottom: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', dynamicStyles);
