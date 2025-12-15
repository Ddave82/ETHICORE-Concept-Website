/**
 * ETHicore - Modern Website JavaScript
 * Premium interactions and animations
 */

class ModernWebsite {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScrollY = window.scrollY;
        this.ticking = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.setupNavbar();
        this.setupSmoothScroll();
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupHoverEffects();
        this.setupIntersectionObservers();
        this.setupFloatingElements();
        this.setupMobileMenu();
        this.createParticles();
        this.setupCubeInteraction();
        this.setupBackToTop();
        this.setupScrollProgress();
        this.setupStatsCounter();
        this.setupSectionReveal();
        this.setupSpotlightEffect();
        this.setupMagneticButtons();

        // Optional: Custom cursor effect (desktop only)
        if (window.innerWidth > 1024) {
            this.setupCursorEffect();
        }

        console.log('ETHicore website initialized');
    }

    /**
     * Navbar scroll effects (always visible)
     */
    setupNavbar() {
        const navbar = this.navbar;

        const handleScroll = () => {
            const currentScroll = window.scrollY;

            // Add scrolled class for enhanced shadow and background
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        // Throttle scroll events
        window.addEventListener('scroll', this.throttle(handleScroll, 100));
    }

    /**
     * Smooth scroll for anchor links
     */
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const navbarHeight = this.navbar.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Parallax effect for background orbs
     */
    setupParallax() {
        const orbs = document.querySelectorAll('.gradient-orb');

        const handleMouseMove = (e) => {
            this.mouseX = e.clientX / window.innerWidth;
            this.mouseY = e.clientY / window.innerHeight;
        };

        window.addEventListener('mousemove', this.throttle(handleMouseMove, 50));

        const animateParallax = () => {
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 20;
                const x = (this.mouseX - 0.5) * speed;
                const y = (this.mouseY - 0.5) * speed;

                orb.style.transform = `translate(${x}px, ${y}px)`;
            });

            requestAnimationFrame(animateParallax);
        };

        animateParallax();
    }

    /**
     * Scroll-based animations
     */
    setupScrollAnimations() {
        const heroVisual = document.querySelector('.hero-visual');

        const handleScroll = () => {
            const scrolled = window.scrollY;

            // Parallax hero visual
            if (heroVisual) {
                const offset = scrolled * 0.3;
                heroVisual.style.transform = `translateY(${offset}px)`;
            }
        };

        window.addEventListener('scroll', this.throttle(handleScroll, 50));
    }

    /**
     * 3D tilt effect on cards
     */
    setupHoverEffects() {
        const cards = document.querySelectorAll('[data-tilt]');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    scale(1.02)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });
        });
    }

    /**
     * Intersection Observer for fade-in animations
     */
    setupIntersectionObservers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add fade-in class to elements
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.classList.add('fade-in', `stagger-${(index % 3) + 1}`);
            observer.observe(card);
        });

        const toolCards = document.querySelectorAll('.tool-card');
        toolCards.forEach((card, index) => {
            card.classList.add('fade-in', `stagger-${(index % 3) + 1}`);
            observer.observe(card);
        });

        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            card.classList.add('fade-in', `stagger-${index + 1}`);
            observer.observe(card);
        });

        // Animate section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            header.classList.add('fade-in');
            observer.observe(header);
        });
    }

    /**
     * Floating animation for hero elements
     */
    setupFloatingElements() {
        const shield = document.querySelector('.shield-icon');
        const cube = document.querySelector('.ai-cube');

        // Mouse parallax effect for hero visual
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 20;

            if (shield) {
                shield.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            }

            if (cube) {
                cube.style.transform = `translate(${-moveX / 2}px, ${-moveY / 2}px)`;
            }
        });
    }

    /**
     * Mobile menu toggle
     */
    setupMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (toggle) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                navLinks.classList.toggle('active');

                // Animate hamburger icon
                const spans = toggle.querySelectorAll('span');
                if (toggle.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
                } else {
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    spans[2].style.transform = '';
                }
            });

            // Close menu when clicking links
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    toggle.classList.remove('active');
                    navLinks.classList.remove('active');

                    const spans = toggle.querySelectorAll('span');
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    spans[2].style.transform = '';
                });
            });
        }
    }

    /**
     * Create particle system for hero visual
     */
    createParticles() {
        const container = document.getElementById('particlesContainer');
        if (!container) return;

        // Adjust particle count based on screen size
        const isMobile = window.innerWidth <= 768;
        const particleCount = isMobile ? 30 : 80;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;

            // Random animation duration (4-10s)
            const duration = 4 + Math.random() * 6;

            // Random drift (-50 to 50px)
            const drift = (Math.random() - 0.5) * 100;

            // Random size (2-6px)
            const size = 2 + Math.random() * 4;

            // Random delay (0-5s)
            const delay = Math.random() * 5;

            particle.style.cssText = `
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                --drift: ${drift}px;
            `;

            container.appendChild(particle);
        }

        console.log(`Created ${particleCount} particles`);
    }

    /**
     * Setup interactive cube that responds to mouse movement
     */
    setupCubeInteraction() {
        const cube = document.getElementById('aiCube');
        if (!cube || window.innerWidth <= 768) return;

        let isInteracting = false;
        let currentRotationX = 0;
        let currentRotationY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        // Mouse move handler
        const handleMouseMove = (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 30;

            targetRotationX = -mouseY;
            targetRotationY = mouseX;
            isInteracting = true;
        };

        // Smooth animation loop
        const animate = () => {
            if (isInteracting) {
                currentRotationX += (targetRotationX - currentRotationX) * 0.1;
                currentRotationY += (targetRotationY - currentRotationY) * 0.1;

                // Apply transform without interfering with rotation animation
                const baseRotation = (Date.now() / 1000) * 18; // 20s = 360deg = 18deg/s
                cube.style.transform = `
                    rotateX(${baseRotation + currentRotationX}deg)
                    rotateY(${baseRotation + currentRotationY}deg)
                `;
            }

            requestAnimationFrame(animate);
        };

        // Throttled mouse move
        document.addEventListener('mousemove', this.throttle(handleMouseMove, 50));

        // Start animation loop
        animate();

        console.log('Cube interaction enabled');
    }

    /**
     * Setup Back to Top button
     */
    setupBackToTop() {
        const backToTopButton = document.getElementById('backToTop');
        if (!backToTopButton) return;

        // Show/hide button based on scroll position
        const handleScroll = () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };

        // Scroll to top on click
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Listen to scroll events
        window.addEventListener('scroll', this.throttle(handleScroll, 100));

        // Initial check
        handleScroll();

        console.log('Back to top button initialized');
    }

    /**
     * Scroll Progress Bar
     */
    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;

        const handleScroll = () => {
            const scrolled = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / height) * 100;
            progressBar.style.width = `${progress}%`;
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        console.log('Scroll progress bar initialized');
    }

    /**
     * Stats Counter Animation
     */
    setupStatsCounter() {
        const stats = document.querySelectorAll('.stat-number[data-target]');
        if (!stats.length) return;

        const animateCounter = (element) => {
            const target = parseFloat(element.dataset.target);
            const suffix = element.dataset.suffix || '';
            const decimals = parseInt(element.dataset.decimals) || 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = decimals > 0 ? target.toFixed(decimals) : Math.floor(target);
                    if (suffix) element.textContent += suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
                }
            }, 16);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));

        console.log('Stats counter initialized');
    }

    /**
     * Section Reveal Animations
     */
    setupSectionReveal() {
        const sections = document.querySelectorAll('.section');
        if (!sections.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

        sections.forEach(section => observer.observe(section));

        // Also observe individual tool cards for staggered animations
        const toolCards = document.querySelectorAll('.tool-card');
        toolCards.forEach(card => observer.observe(card));

        console.log('Section reveal animations initialized');
    }

    /**
     * Spotlight Effect on Cards
     */
    setupSpotlightEffect() {
        const cards = document.querySelectorAll('.feature-card, .tool-card');
        if (!cards.length) return;

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });
        });

        console.log('Spotlight effect initialized');
    }

    /**
     * Magnetic Button Effect
     */
    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-primary');
        if (!buttons.length || window.innerWidth <= 768) return;

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });

        console.log('Magnetic buttons initialized');
    }

    /**
     * Custom cursor glow effect (desktop only)
     */
    setupCursorEffect() {
        // Create cursor element
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 217, 255, 0.4), transparent);
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s;
        `;

        document.body.appendChild(cursor);

        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        const animateCursor = () => {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Expand cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [data-tilt]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
            });
        });
    }

    /**
     * Utility: Throttle function
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Utility: Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

/**
 * Number counter animation for stats
 */
class CountUp {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.startTime = null;
        this.startValue = 0;
    }

    start() {
        if (this.startTime) return;

        const animate = (currentTime) => {
            if (!this.startTime) this.startTime = currentTime;
            const elapsed = currentTime - this.startTime;
            const progress = Math.min(elapsed / this.duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * this.target);

            this.element.textContent = current + (this.element.dataset.suffix || '');

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}

/**
 * Setup stat counters
 */
function setupStatCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const number = entry.target.querySelector('.stat-number');
                const target = number.textContent.replace(/\D/g, '');
                const suffix = number.textContent.replace(/\d/g, '');

                number.dataset.suffix = suffix;
                const counter = new CountUp(number, target, 2000);
                counter.start();
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
}

/**
 * Button ripple effect
 */
function setupButtonRipples() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation to CSS if not exists
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Page load animations
 */
function setupPageLoadAnimations() {
    // Fade in hero content
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroText.style.transition = 'all 0.8s ease-out';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 100);
    }

    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroVisual.style.transition = 'all 0.8s ease-out';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateY(0)';
        }, 300);
    }
}

/**
 * Accessibility: Keyboard navigation
 */
function setupAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#features';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--blue);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Trap focus in mobile menu when open
    const mobileMenu = document.querySelector('.nav-links');
    const focusableElements = 'a[href], button:not([disabled])';

    if (mobileMenu) {
        const firstFocusable = mobileMenu.querySelectorAll(focusableElements)[0];
        const focusableContent = mobileMenu.querySelectorAll(focusableElements);
        const lastFocusable = focusableContent[focusableContent.length - 1];

        document.addEventListener('keydown', (e) => {
            if (!mobileMenu.classList.contains('active')) return;

            const isTabPressed = e.key === 'Tab';
            if (!isTabPressed) return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        });
    }
}

/**
 * Initialize everything when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    new ModernWebsite();
    setupStatCounters();
    setupButtonRipples();
    setupPageLoadAnimations();
    setupAccessibility();

    // Add loading complete class
    document.body.classList.add('loaded');
});

/**
 * Handle window resize
 */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize on significant resize
        console.log('Window resized');
    }, 250);
});

/**
 * Performance optimization: Preload images
 */
window.addEventListener('load', () => {
    // Mark page as fully loaded
    document.body.classList.add('fully-loaded');
    console.log('All resources loaded');
});
