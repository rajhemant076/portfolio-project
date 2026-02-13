// API Base URL - Change this to your backend URL
const API_URL = 'https://portfolio-backend-uyru.onrender.com/api';

// Fetch and display profile data
async function fetchProfile() {
    try {
        const response = await fetch(`${API_URL}/profile`);
        const result = await response.json();
        
        if (result.success) {
            const profile = result.data;
            
            // Update profile information
            document.getElementById('profile-name').textContent = profile.name;
            document.getElementById('profile-role').textContent = profile.role;
            document.getElementById('profile-intro').textContent = profile.about.substring(0, 150) + '...';
            document.getElementById('about-text').textContent = profile.about;
            
            // Update profile image
            if (profile.profileImage) {
                document.getElementById('profile-image').src = profile.profileImage;
            }
            
            // Update resume link
            if (profile.resumeLink) {
                document.getElementById('resume-link').href = profile.resumeLink;
            } else {
                document.getElementById('resume-link').style.display = 'none';
            }
            
            // Update social links
            const socialLinksContainer = document.getElementById('social-links');
            socialLinksContainer.innerHTML = '';
            
            if (profile.socials) {
                if (profile.socials.github) {
                    socialLinksContainer.innerHTML += `<a href="${profile.socials.github}" target="_blank">GitHub</a>`;
                }
                if (profile.socials.linkedin) {
                    socialLinksContainer.innerHTML += `<a href="${profile.socials.linkedin}" target="_blank">LinkedIn</a>`;
                }
                if (profile.socials.twitter) {
                    socialLinksContainer.innerHTML += `<a href="${profile.socials.twitter}" target="_blank">Twitter</a>`;
                }
                if (profile.socials.instagram) {
                    socialLinksContainer.innerHTML += `<a href="${profile.socials.instagram}" target="_blank">Instagram</a>`;
                }
            }
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
}

// Fetch and display skills
async function fetchSkills() {
    try {
        const response = await fetch(`${API_URL}/skills`);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            const skillsContainer = document.getElementById('skills-container');
            skillsContainer.innerHTML = '';
            
            result.data.forEach(skillCategory => {
                const skillCard = document.createElement('div');
                skillCard.className = 'skill-category';
                
                const skillTags = skillCategory.skills.map(skill => 
                    `<span class="skill-tag">${skill}</span>`
                ).join('');
                
                skillCard.innerHTML = `
                    <h3>${skillCategory.category}</h3>
                    <div class="skill-tags">
                        ${skillTags}
                    </div>
                `;
                
                skillsContainer.appendChild(skillCard);
            });
        }
    } catch (error) {
        console.error('Error fetching skills:', error);
    }
}

// Fetch and display projects
async function fetchProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = '';
            
            result.data.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                const techTags = project.techStack.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('');
                
                const projectLinks = [];
                if (project.githubLink) {
                    projectLinks.push(`<a href="${project.githubLink}" target="_blank">GitHub</a>`);
                }
                if (project.liveLink) {
                    projectLinks.push(`<a href="${project.liveLink}" target="_blank">Live Demo</a>`);
                }
                
                projectCard.innerHTML = `
                    <img src="${project.imageUrl || 'https://via.placeholder.com/400x200'}" alt="${project.title}" class="project-image">
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="tech-stack">
                            ${techTags}
                        </div>
                        <div class="project-links">
                            ${projectLinks.join('')}
                        </div>
                    </div>
                `;
                
                projectsContainer.appendChild(projectCard);
            });
        } else {
            document.getElementById('projects-container').innerHTML = '<p>No projects available yet.</p>';
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

// Fetch and display experience
async function fetchExperience() {
    try {
        const response = await fetch(`${API_URL}/experience`);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            const experienceContainer = document.getElementById('experience-container');
            experienceContainer.innerHTML = '';
            
            result.data.forEach(exp => {
                const expItem = document.createElement('div');
                expItem.className = 'experience-item';
                
                const points = exp.points.map(point => `<li>${point}</li>`).join('');
                
                expItem.innerHTML = `
                    <h3>${exp.role}</h3>
                    <h4>${exp.company}</h4>
                    <p class="duration">${exp.duration}</p>
                    <ul>
                        ${points}
                    </ul>
                `;
                
                experienceContainer.appendChild(expItem);
            });
        } else {
            document.getElementById('experience-container').innerHTML = '<p>No experience added yet.</p>';
        }
    } catch (error) {
        console.error('Error fetching experience:', error);
    }
}

// Fetch and display education
async function fetchEducation() {
    try {
        const response = await fetch(`${API_URL}/education`);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            const educationContainer = document.getElementById('education-container');
            educationContainer.innerHTML = '';
            
            result.data.forEach(edu => {
                const eduCard = document.createElement('div');
                eduCard.className = 'education-card';
                
                eduCard.innerHTML = `
                    <h3>${edu.degree}</h3>
                    <h4>${edu.college}</h4>
                    <p class="duration">${edu.duration}</p>
                    ${edu.description ? `<p>${edu.description}</p>` : ''}
                `;
                
                educationContainer.appendChild(eduCard);
            });
        } else {
            document.getElementById('education-container').innerHTML = '<p>No education added yet.</p>';
        }
    } catch (error) {
        console.error('Error fetching education:', error);
    }
}

// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    try {
        const response = await fetch(`${API_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });
        
        const result = await response.json();
        const messageDiv = document.getElementById('contact-message');
        
        if (result.success) {
            messageDiv.className = 'contact-message success';
            messageDiv.textContent = 'Message sent successfully!';
            document.getElementById('contact-form').reset();
        } else {
            messageDiv.className = 'contact-message error';
            messageDiv.textContent = result.message || 'Failed to send message. Please try again.';
        }
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    } catch (error) {
        console.error('Error sending message:', error);
        const messageDiv = document.getElementById('contact-message');
        messageDiv.className = 'contact-message error';
        messageDiv.textContent = 'An error occurred. Please try again later.';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Create mobile menu button
    const navbar = document.querySelector('.navbar .container');
    const navMenu = document.querySelector('.nav-menu');
    
    // Add menu toggle button
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    navbar.insertBefore(menuToggle, navMenu);
    
    // Toggle menu on click
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '☰';
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Typing effect for role
    const roleElement = document.querySelector('.role');
    if (roleElement) {
        const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Tech Innovator'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                roleElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                roleElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, 500);
            } else {
                setTimeout(typeEffect, isDeleting ? 50 : 100);
            }
        }
        
        typeEffect();
    }
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        const messageDiv = document.getElementById('newsletter-message');
        
        // Simulate API call - replace with actual newsletter signup
        try {
            // Show loading state
            const submitBtn = newsletterForm.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success message
            messageDiv.className = 'newsletter-message success';
            messageDiv.textContent = 'Successfully subscribed to newsletter!';
            newsletterForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Clear message after 5 seconds
            setTimeout(() => {
                messageDiv.className = 'newsletter-message';
                messageDiv.textContent = '';
            }, 5000);
            
        } catch (error) {
            messageDiv.className = 'newsletter-message error';
            messageDiv.textContent = 'Subscription failed. Please try again.';
            
            // Reset button
            const submitBtn = newsletterForm.querySelector('button');
            submitBtn.textContent = 'Subscribe';
            submitBtn.disabled = false;
        }
    });
}

// Dynamic Year in Footer
const yearElement = document.querySelector('.copyright p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
}

// Load all data on page load
window.addEventListener('DOMContentLoaded', () => {
    fetchProfile();
    fetchSkills();
    fetchProjects();
    fetchExperience();
    fetchEducation();
});