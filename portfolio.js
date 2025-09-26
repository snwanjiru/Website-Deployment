// script.js - Navigation and Smooth Scrolling

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation functionality
    initNavigation();
    initSmoothScrolling();
    initMobileMenu();
    highlightActiveNav();
});

// Initialize main navigation functionality
function initNavigation() {
    // Handle cross-page navigation (from project pages back to portfolio.html sections)
    const navLinks = document.querySelectorAll('.navbar a[href*="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if link points to portfolio.html with anchor
            if (href.includes('portfolio.html#')) {
                e.preventDefault();
                
                // Extract the section ID
                const sectionId = href.split('#')[1];
                
                // Navigate to portfolio.html first, then scroll to section
                if (window.location.pathname.endsWith('portfolio.html') || window.location.pathname === '/') {
                    // Already on portfolio.html - scroll to section
                    scrollToSection(sectionId);
                } else {
                    // On project page - go to portfolio.html then scroll
                    window.location.href = `portfolio.html#${sectionId}`;
                }
            }
        });
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if it's a cross-page link (already handled above)
            if (this.getAttribute('href').includes('portfolio.html')) return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    // Create mobile menu button
    const navbar = document.querySelector('.navbar');
    const navList = document.querySelector('.navbar ul');
    
    // Only create mobile menu if navbar exists and screen is small
    if (navbar && window.innerWidth <= 768) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        
        // Insert before the navigation list
        navbar.insertBefore(mobileMenuBtn, navList);
        
        // Style the mobile menu button
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: #14d1b2c7;
            font-size: 24px;
            cursor: pointer;
            padding: 10px;
        `;
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Show mobile menu button on small screens
        function handleResize() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                navList.style.display = 'none';
                navList.style.flexDirection = 'column';
                navList.style.position = 'absolute';
                navList.style.top = '100%';
                navList.style.left = '0';
                navList.style.width = '100%';
                navList.style.background = 'rgba(0, 0, 0, 0.9)';
                navList.style.zIndex = '1000';
            } else {
                mobileMenuBtn.style.display = 'none';
                navList.style.display = 'flex';
                navList.style.flexDirection = 'row';
                navList.style.position = 'static';
                navList.style.background = 'transparent';
            }
        }
        
        // Initial setup and resize handler
        handleResize();
        window.addEventListener('resize', handleResize);
    }
}

// Highlight active navigation link
function highlightActiveNav() {
    const sections = document.querySelectorAll('div[id]');
    const navLinks = document.querySelectorAll('.navbar a[href*="#"]');
    
    // Only run on portfolio.html (single page)
    if (!window.location.pathname.endsWith('portfolio.html') && window.location.pathname !== '/') {
        return;
    }
    
    function highlightLink() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            const linkSectionId = href.includes('#') ? href.split('#')[1] : href.substring(1);
            
            if (linkSectionId === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Highlight on scroll and load
    window.addEventListener('scroll', highlightLink);
    window.addEventListener('load', highlightLink);
}

// Handle page load with hash in URL
window.addEventListener('load', function() {
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => {
            scrollToSection(sectionId);
        }, 100);
    }
});