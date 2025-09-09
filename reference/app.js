/**
 * Portfolio Website JavaScript Application
 * 
 * Architecture: Component-based with ES6+ Classes
 * Performance: Optimized for 95+ Lighthouse Score
 * Security: XSS Prevention, Input Sanitization, CSP Compliant
 * Accessibility: WCAG 2.1 AA Compliant, Screen Reader Support
 * 
 * @author Sunny Vijay Rout
 * @version 2.0.0
 * @license MIT
 */

'use strict';

/* ==========================================================================
   UTILITY FUNCTIONS & HELPERS - Security & Performance Focused
   ========================================================================== */

/**
 * Utility class for common helper functions
 * Implements security best practices and performance optimizations
 */
class Utils {
    /**
     * Debounce function to limit function execution frequency
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @param {boolean} immediate - Execute immediately on first call
     * @returns {Function} Debounced function
     */
    static debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    }

    /**
     * Throttle function to limit function execution rate
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    static throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Sanitize HTML input to prevent XSS attacks
     * @param {string} str - String to sanitize
     * @returns {string} Sanitized string
     */
    static sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    /**
     * Validate email address using RFC 5322 compliant regex
     * @param {string} email - Email to validate
     * @returns {boolean} Is valid email
     */
    static isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }

    /**
     * Get element with null safety
     * @param {string} selector - CSS selector
     * @param {Element} context - Context element (optional)
     * @returns {Element|null} Found element or null
     */
    static $(selector, context = document) {
        return context.querySelector(selector);
    }

    /**
     * Get elements with null safety
     * @param {string} selector - CSS selector
     * @param {Element} context - Context element (optional)
     * @returns {NodeList} Found elements
     */
    static $$(selector, context = document) {
        return context.querySelectorAll(selector);
    }

    /**
     * Add event listener with automatic cleanup
     * @param {Element} element - Target element
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     * @returns {Function} Cleanup function
     */
    static addEventListenerWithCleanup(element, event, handler, options = {}) {
        element.addEventListener(event, handler, options);
        return () => element.removeEventListener(event, handler, options);
    }

    /**
     * Check if element is visible in viewport
     * @param {Element} element - Element to check
     * @param {number} threshold - Visibility threshold (0-1)
     * @returns {boolean} Is element visible
     */
    static isElementVisible(element, threshold = 0.1) {
        const rect = element.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
}

/* ==========================================================================
   BASE COMPONENT CLASS - Abstract Component Architecture
   ========================================================================== */

/**
 * Base Component class implementing common functionality
 * All components extend this class for consistent architecture
 */
class BaseComponent {
    /**
     * Create a base component
     * @param {string} selector - CSS selector for component root
     * @param {Object} options - Component options
     */
    constructor(selector, options = {}) {
        this.element = Utils.$(selector);
        this.options = { ...this.getDefaultOptions(), ...options };
        this.isInitialized = false;
        this.eventCleanups = [];
        this.intersectionObserver = null;

        if (this.element) {
            this.init();
        } else {
            console.warn(`Component element not found: ${selector}`);
        }
    }

    /**
     * Get default options for component
     * @returns {Object} Default options
     */
    getDefaultOptions() {
        return {
            debug: false,
            autoInit: true
        };
    }

    /**
     * Initialize component
     * Template method pattern - override in subclasses
     */
    init() {
        if (this.isInitialized) return;

        try {
            this.beforeInit();
            this.bindEvents();
            this.setupIntersectionObserver();
            this.afterInit();
            this.isInitialized = true;
            
            if (this.options.debug) {
                console.log(`${this.constructor.name} initialized`);
            }
        } catch (error) {
            console.error(`Error initializing ${this.constructor.name}:`, error);
        }
    }

    /**
     * Hook called before initialization
     * Override in subclasses for custom setup
     */
    beforeInit() {}

    /**
     * Bind event listeners
     * Override in subclasses for custom event binding
     */
    bindEvents() {}

    /**
     * Setup intersection observer for performance
     */
    setupIntersectionObserver() {
        if (!this.element) return;

        const options = {
            threshold: 0.1,
            rootMargin: '50px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.onElementVisible(entry.target);
                } else {
                    this.onElementHidden(entry.target);
                }
            });
        }, options);

        this.intersectionObserver.observe(this.element);
    }

    /**
     * Called when element becomes visible
     * @param {Element} target - Visible element
     */
    onElementVisible(target) {}

    /**
     * Called when element becomes hidden
     * @param {Element} target - Hidden element
     */
    onElementHidden(target) {}

    /**
     * Hook called after initialization
     * Override in subclasses for post-init setup
     */
    afterInit() {}

    /**
     * Add event listener with automatic cleanup tracking
     * @param {Element} element - Target element
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     */
    addEventListener(element, event, handler, options = {}) {
        const cleanup = Utils.addEventListenerWithCleanup(element, event, handler, options);
        this.eventCleanups.push(cleanup);
    }

    /**
     * Destroy component and cleanup resources
     */
    destroy() {
        // Cleanup event listeners
        this.eventCleanups.forEach(cleanup => cleanup());
        this.eventCleanups = [];

        // Cleanup intersection observer
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
        }

        this.isInitialized = false;
        
        if (this.options.debug) {
            console.log(`${this.constructor.name} destroyed`);
        }
    }
}

/* ==========================================================================
   NAVIGATION COMPONENT - Mobile-first responsive navigation
   ========================================================================== */

/**
 * Navigation Component
 * Handles navigation functionality, active states, mobile menu, accessibility
 */
class NavigationComponent extends BaseComponent {
    /**
     * Get default options for navigation
     * @returns {Object} Default navigation options
     */
    getDefaultOptions() {
        return {
            ...super.getDefaultOptions(),
            mobileBreakpoint: 768,
            scrollThreshold: 50,
            smoothScrollOffset: 70,
            activeClass: 'navigation__link--active',
            scrolledClass: 'navigation--scrolled'
        };
    }

    /**
     * Initialize navigation-specific functionality
     */
    beforeInit() {
        this.hamburger = Utils.$('.navigation__hamburger', this.element);
        this.menu = Utils.$('.navigation__menu', this.element);
        this.links = Utils.$$('.navigation__link', this.element);
        this.sections = Utils.$$('section[id]');
        
        this.isMenuOpen = false;
        this.currentActiveSection = '';
        
        // Throttled scroll handler for performance
        this.handleScroll = Utils.throttle(this.onScroll.bind(this), 16); // ~60fps
    }

    /**
     * Bind navigation event listeners
     */
    bindEvents() {
        // Mobile menu toggle
        if (this.hamburger && this.menu) {
            this.addEventListener(this.hamburger, 'click', this.toggleMobileMenu.bind(this));
        }

        // Navigation links
        this.links.forEach(link => {
            this.addEventListener(link, 'click', this.handleLinkClick.bind(this));
        });

        // Scroll events
        this.addEventListener(window, 'scroll', this.handleScroll, { passive: true });

        // Keyboard events
        this.addEventListener(document, 'keydown', this.handleKeyDown.bind(this));

        // Resize events
        this.addEventListener(window, 'resize', Utils.debounce(this.handleResize.bind(this), 250));

        // Click outside to close menu
        this.addEventListener(document, 'click', this.handleOutsideClick.bind(this));
    }

    /**
     * Toggle mobile menu with accessibility support
     * @param {Event} event - Click event
     */
    toggleMobileMenu(event) {
        event.preventDefault();
        event.stopPropagation();

        this.isMenuOpen = !this.isMenuOpen;
        
        // Update hamburger state
        this.hamburger.classList.toggle('navigation__hamburger--active', this.isMenuOpen);
        this.hamburger.setAttribute('aria-expanded', this.isMenuOpen.toString());
        
        // Update menu state
        this.menu.classList.toggle('navigation__menu--active', this.isMenuOpen);
        
        // Focus management for accessibility
        if (this.isMenuOpen) {
            this.trapFocus();
        } else {
            this.releaseFocus();
        }

        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    /**
     * Handle navigation link clicks
     * @param {Event} event - Click event
     */
    handleLinkClick(event) {
        event.preventDefault();
        
        const link = event.currentTarget;
        const targetId = link.getAttribute('href');
        const targetElement = Utils.$(targetId);

        if (targetElement) {
            this.scrollToSection(targetElement);
            
            // Close mobile menu if open
            if (this.isMenuOpen && window.innerWidth <= this.options.mobileBreakpoint) {
                this.toggleMobileMenu(event);
            }
        }
    }

    /**
     * Smooth scroll to section with offset
     * @param {Element} targetElement - Target section element
     */
    scrollToSection(targetElement) {
        const offsetTop = targetElement.offsetTop - this.options.smoothScrollOffset;
        
        window.scrollTo({
            top: Math.max(0, offsetTop),
            behavior: 'smooth'
        });
    }

    /**
     * Handle scroll events for active section detection
     */
    onScroll() {
        const scrollY = window.pageYOffset;
        
        // Update navbar background
        this.element.classList.toggle(this.options.scrolledClass, scrollY > this.options.scrollThreshold);
        
        // Update active section
        this.updateActiveSection();
    }

    /**
     * Update active navigation link based on scroll position
     */
    updateActiveSection() {
        let current = '';
        const scrollY = window.pageYOffset + 100; // Offset for better UX

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (current !== this.currentActiveSection) {
            this.currentActiveSection = current;
            this.updateActiveLink(current);
        }
    }

    /**
     * Update active link styling
     * @param {string} activeId - ID of active section
     */
    updateActiveLink(activeId) {
        this.links.forEach(link => {
            const isActive = link.getAttribute('href') === `#${activeId}`;
            link.classList.toggle(this.options.activeClass, isActive);
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
    }

    /**
     * Handle keyboard events for accessibility
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyDown(event) {
        // Close menu on Escape
        if (event.key === 'Escape' && this.isMenuOpen) {
            this.toggleMobileMenu(event);
        }

        // Tab navigation within menu
        if (event.key === 'Tab' && this.isMenuOpen) {
            this.handleTabNavigation(event);
        }
    }

    /**
     * Handle tab navigation for focus trapping
     * @param {KeyboardEvent} event - Tab key event
     */
    handleTabNavigation(event) {
        const focusableElements = this.menu.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === firstFocusable) {
                event.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                event.preventDefault();
                firstFocusable.focus();
            }
        }
    }

    /**
     * Trap focus within mobile menu
     */
    trapFocus() {
        const firstLink = this.links[0];
        if (firstLink) {
            firstLink.focus();
        }
    }

    /**
     * Release focus trap
     */
    releaseFocus() {
        this.hamburger.focus();
    }

    /**
     * Handle window resize events
     */
    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth > this.options.mobileBreakpoint && this.isMenuOpen) {
            this.isMenuOpen = false;
            this.hamburger.classList.remove('navigation__hamburger--active');
            this.hamburger.setAttribute('aria-expanded', 'false');
            this.menu.classList.remove('navigation__menu--active');
            document.body.style.overflow = '';
        }
    }

    /**
     * Handle clicks outside menu to close it
     * @param {Event} event - Click event
     */
    handleOutsideClick(event) {
        if (this.isMenuOpen && 
            !this.element.contains(event.target) &&
            window.innerWidth <= this.options.mobileBreakpoint) {
            this.toggleMobileMenu(event);
        }
    }
}

/* ==========================================================================
   HERO COMPONENT - Hero section with typing animation
   ========================================================================== */

/**
 * Hero Component
 * Manages hero section animations, typing effect, scroll indicator
 */
class HeroComponent extends BaseComponent {
    /**
     * Get default options for hero component
     * @returns {Object} Default hero options
     */
    getDefaultOptions() {
        return {
            ...super.getDefaultOptions(),
            typingSpeed: 100,
            deletingSpeed: 50,
            pauseDuration: 2000,
            taglines: [
                'Process Leader',
                'AWS Specialist', 
                'Gen AI Expert',
                'CI/CD Automation Specialist',
                'Technical Connector',
                'Change Agent'
            ]
        };
    }

    /**
     * Initialize hero-specific functionality
     */
    beforeInit() {
        this.typingElement = Utils.$('.hero__typing-text', this.element);
        this.scrollIndicator = Utils.$('.hero__scroll-indicator', this.element);
        this.titleLines = Utils.$$('.hero__title-line', this.element);
        this.actionButtons = Utils.$$('.hero__button', this.element);
        
        this.currentTaglineIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingTimeout = null;
    }

    /**
     * Bind hero event listeners
     */
    bindEvents() {
        // Scroll indicator click
        if (this.scrollIndicator) {
            this.addEventListener(this.scrollIndicator, 'click', this.handleScrollIndicatorClick.bind(this));
        }

        // Action button clicks for smooth scrolling
        this.actionButtons.forEach(button => {
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) {
                this.addEventListener(button, 'click', this.handleActionButtonClick.bind(this));
            }
        });

        // Scroll event to hide/show scroll indicator
        this.addEventListener(window, 'scroll', Utils.throttle(this.handleScroll.bind(this), 16), { passive: true });
    }

    /**
     * Start animations after initialization
     */
    afterInit() {
        this.startTitleAnimation();
        this.startTypingAnimation();
    }

    /**
     * Animate title lines with staggered effect
     */
    startTitleAnimation() {
        this.titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, 300 + (index * 200));
        });
    }

    /**
     * Start typing animation for taglines
     */
    startTypingAnimation() {
        if (!this.typingElement || this.options.taglines.length === 0) return;
        
        this.typeText();
    }

    /**
     * Type text animation logic
     */
    typeText() {
        if (!this.typingElement) return;

        const currentTagline = this.options.taglines[this.currentTaglineIndex];
        
        if (!this.isDeleting) {
            // Typing phase
            const currentText = currentTagline.substring(0, this.currentCharIndex + 1);
            this.typingElement.textContent = currentText;
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentTagline.length) {
                // Pause at end before deleting
                this.typingTimeout = setTimeout(() => {
                    this.isDeleting = true;
                    this.typeText();
                }, this.options.pauseDuration);
                return;
            }
            
            this.typingTimeout = setTimeout(() => this.typeText(), this.options.typingSpeed);
        } else {
            // Deleting phase
            const currentText = currentTagline.substring(0, this.currentCharIndex - 1);
            this.typingElement.textContent = currentText;
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                // Move to next tagline
                this.isDeleting = false;
                this.currentTaglineIndex = (this.currentTaglineIndex + 1) % this.options.taglines.length;
                
                this.typingTimeout = setTimeout(() => this.typeText(), 500);
                return;
            }
            
            this.typingTimeout = setTimeout(() => this.typeText(), this.options.deletingSpeed);
        }
    }

    /**
     * Handle scroll indicator click
     * @param {Event} event - Click event
     */
    handleScrollIndicatorClick(event) {
        event.preventDefault();
        
        const aboutSection = Utils.$('#about-section');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Handle action button clicks for smooth scrolling
     * @param {Event} event - Click event
     */
    handleActionButtonClick(event) {
        event.preventDefault();
        
        const targetId = event.currentTarget.getAttribute('href');
        const targetElement = Utils.$(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Handle scroll for scroll indicator visibility
     */
    handleScroll() {
        if (!this.scrollIndicator) return;
        
        const scrollY = window.pageYOffset;
        const opacity = scrollY > 100 ? 0 : 1;
        
        this.scrollIndicator.style.opacity = opacity;
    }

    /**
     * Cleanup typing animation
     */
    destroy() {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = null;
        }
        super.destroy();
    }
}

/* ==========================================================================
   SKILLS COMPONENT - Animated skill bars and specializations
   ========================================================================== */

/**
 * Skills Component
 * Handles skill bars animation and interaction on scroll
 */
class SkillsComponent extends BaseComponent {
    /**
     * Initialize skills-specific functionality
     */
    beforeInit() {
        this.skillBars = Utils.$$('.skill-item__progress', this.element);
        this.animatedBars = new Set();
    }

    /**
     * Animate skill bars when component becomes visible
     * @param {Element} target - Visible element
     */
    onElementVisible(target) {
        this.animateSkillBars();
    }

    /**
     * Animate skill progress bars with staggered effect
     */
    animateSkillBars() {
        this.skillBars.forEach((bar, index) => {
            if (this.animatedBars.has(bar)) return;
            
            const width = bar.getAttribute('data-width');
            if (width) {
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                    bar.classList.add('skill-item__progress--animated');
                    this.animatedBars.add(bar);
                    
                    // Remove will-change after animation for performance
                    setTimeout(() => {
                        bar.style.willChange = 'auto';
                    }, 1500);
                }, index * 100);
            }
        });
    }
}

/* ==========================================================================
   EXPERIENCE COMPONENT - Timeline animations
   ========================================================================== */

/**
 * Experience Component
 * Manages timeline animations and interactions
 */
class ExperienceComponent extends BaseComponent {
    /**
     * Initialize experience-specific functionality
     */
    beforeInit() {
        this.timelineItems = Utils.$$('.timeline-item', this.element);
        this.animatedItems = new Set();
    }

    /**
     * Setup intersection observer for timeline items
     */
    setupIntersectionObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedItems.has(entry.target)) {
                    this.animateTimelineItem(entry.target);
                    this.animatedItems.add(entry.target);
                }
            });
        }, options);

        this.timelineItems.forEach(item => {
            this.intersectionObserver.observe(item);
        });
    }

    /**
     * Animate timeline item entrance
     * @param {Element} item - Timeline item to animate
     */
    animateTimelineItem(item) {
        item.classList.add('scroll-animate--visible');
        
        // Remove will-change after animation
        setTimeout(() => {
            item.style.willChange = 'auto';
        }, 800);
    }
}

/* ==========================================================================
   PROJECTS COMPONENT - Project grid animations and interactions
   ========================================================================== */

/**
 * Projects Component
 * Handles project card animations and interactions
 */
class ProjectsComponent extends BaseComponent {
    /**
     * Initialize projects-specific functionality
     */
    beforeInit() {
        this.projectCards = Utils.$$('.project-card', this.element);
        this.animatedCards = new Set();
    }

    /**
     * Setup intersection observer for project cards
     */
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedCards.has(entry.target)) {
                    this.animateProjectCard(entry.target);
                    this.animatedCards.add(entry.target);
                }
            });
        }, options);

        this.projectCards.forEach((card, index) => {
            // Add staggered animation delay
            card.style.animationDelay = `${index * 0.1}s`;
            this.intersectionObserver.observe(card);
        });
    }

    /**
     * Animate project card entrance
     * @param {Element} card - Project card to animate
     */
    animateProjectCard(card) {
        card.classList.add('scroll-animate--visible');
        
        // Remove will-change after animation
        setTimeout(() => {
            card.style.willChange = 'auto';
        }, 800);
    }
}

/* ==========================================================================
   CONTACT COMPONENT - Form validation and submission
   ========================================================================== */

/**
 * Contact Component
 * Manages form validation, submission, and user feedback
 */
class ContactComponent extends BaseComponent {
    /**
     * Get default options for contact form
     * @returns {Object} Default contact options
     */
    getDefaultOptions() {
        return {
            ...super.getDefaultOptions(),
            validateOnBlur: true,
            validateOnInput: true,
            submitDelay: 1500
        };
    }

    /**
     * Initialize contact-specific functionality
     */
    beforeInit() {
        this.form = Utils.$('#contact-form', this.element);
        this.submitButton = Utils.$('button[type="submit"]', this.form);
        this.buttonText = Utils.$('.contact-form__button-text', this.submitButton);
        this.buttonLoading = Utils.$('.contact-form__button-loading', this.submitButton);
        this.formFields = Utils.$$('input, textarea', this.form);
        
        this.validationRules = {
            name: { required: true, minLength: 2 },
            email: { required: true, email: true },
            subject: { required: true, minLength: 3 },
            message: { required: true, minLength: 10 }
        };
    }

    /**
     * Bind contact form events
     */
    bindEvents() {
        if (!this.form) return;

        // Form submission
        this.addEventListener(this.form, 'submit', this.handleSubmit.bind(this));

        // Field validation
        this.formFields.forEach(field => {
            if (this.options.validateOnBlur) {
                this.addEventListener(field, 'blur', this.handleFieldBlur.bind(this));
            }
            
            if (this.options.validateOnInput) {
                this.addEventListener(field, 'input', this.handleFieldInput.bind(this));
            }
        });
    }

    /**
     * Handle form submission with validation
     * @param {Event} event - Submit event
     */
    async handleSubmit(event) {
        event.preventDefault();
        
        // Validate all fields
        const isValid = this.validateAllFields();
        
        if (!isValid) {
            this.showNotification('Please correct the errors before submitting.', 'error');
            return;
        }

        // Get sanitized form data
        const formData = this.getFormData();
        
        // Show loading state
        this.setSubmitState(true);
        
        try {
            // Simulate form submission (replace with actual API call)
            await this.submitForm(formData);
            
            // Show success and reset form
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.resetForm();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('There was an error sending your message. Please try again.', 'error');
        } finally {
            this.setSubmitState(false);
        }
    }

    /**
     * Handle field blur events for validation
     * @param {Event} event - Blur event
     */
    handleFieldBlur(event) {
        const field = event.target;
        if (field.value.trim()) {
            this.validateField(field);
        }
    }

    /**
     * Handle field input events for real-time validation
     * @param {Event} event - Input event
     */
    handleFieldInput(event) {
        const field = event.target;
        if (field.classList.contains('form-control--error')) {
            this.validateField(field);
        }
    }

    /**
     * Validate individual field
     * @param {Element} field - Form field to validate
     * @returns {boolean} Is field valid
     */
    validateField(field) {
        const name = field.name;
        const value = field.value.trim();
        const rules = this.validationRules[name];
        
        if (!rules) return true;

        const errors = [];

        // Required validation
        if (rules.required && !value) {
            errors.push('This field is required');
        }

        // Email validation
        if (rules.email && value && !Utils.isValidEmail(value)) {
            errors.push('Please enter a valid email address');
        }

        // Min length validation
        if (rules.minLength && value && value.length < rules.minLength) {
            errors.push(`Must be at least ${rules.minLength} characters`);
        }

        const isValid = errors.length === 0;
        this.setFieldState(field, isValid, errors[0]);
        
        return isValid;
    }

    /**
     * Validate all form fields
     * @returns {boolean} Are all fields valid
     */
    validateAllFields() {
        let isValid = true;
        
        this.formFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    /**
     * Set field validation state
     * @param {Element} field - Form field
     * @param {boolean} isValid - Is field valid
     * @param {string} errorMessage - Error message if invalid
     */
    setFieldState(field, isValid, errorMessage = '') {
        const errorElement = Utils.$(`#${field.id}-error`);
        
        if (isValid) {
            field.classList.remove('form-control--error');
            field.classList.add('form-control--valid');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('field-error--visible');
            }
        } else {
            field.classList.add('form-control--error');
            field.classList.remove('form-control--valid');
            if (errorElement) {
                errorElement.textContent = Utils.sanitizeHTML(errorMessage);
                errorElement.classList.add('field-error--visible');
            }
        }
    }

    /**
     * Get sanitized form data
     * @returns {Object} Form data object
     */
    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = Utils.sanitizeHTML(value.trim());
        }
        
        return data;
    }

    /**
     * Set submit button loading state
     * @param {boolean} isLoading - Is form submitting
     */
    setSubmitState(isLoading) {
        this.submitButton.disabled = isLoading;
        
        if (isLoading) {
            this.buttonText.style.display = 'none';
            this.buttonLoading.classList.add('contact-form__button-loading--visible');
        } else {
            this.buttonText.style.display = 'inline';
            this.buttonLoading.classList.remove('contact-form__button-loading--visible');
        }
    }

    /**
     * Simulate form submission (replace with actual API call)
     * @param {Object} data - Form data
     * @returns {Promise} Submission promise
     */
    async submitForm(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Here you would typically make an API call
                console.log('Form submitted:', data);
                resolve();
            }, this.options.submitDelay);
        });
    }

    /**
     * Reset form to initial state
     */
    resetForm() {
        this.form.reset();
        
        // Clear validation states
        this.formFields.forEach(field => {
            field.classList.remove('form-control--error', 'form-control--valid');
            const errorElement = Utils.$(`#${field.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('field-error--visible');
            }
        });
    }

    /**
     * Show notification to user
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, info)
     */
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = Utils.$$('.notification');
        existing.forEach(notification => notification.remove());

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');
        
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${Utils.sanitizeHTML(message)}</span>
                <button class="notification__close" aria-label="Close notification">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
        `;

        // Add styles
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };

        Object.assign(notification.style, {
            position: 'fixed',
            top: '90px',
            right: '20px',
            background: colors[type] || colors.info,
            color: 'white',
            padding: '16px 20px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            zIndex: '10000',
            maxWidth: '400px',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: 'var(--font-family-base)'
        });

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });

        // Close button functionality
        const closeBtn = Utils.$('.notification__close', notification);
        const closeNotification = () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        };

        closeBtn.addEventListener('click', closeNotification);

        // Auto close after 5 seconds
        setTimeout(closeNotification, 5000);
    }
}

/* ==========================================================================
   SCROLL MANAGER COMPONENT - Global scroll animations and performance
   ========================================================================== */

/**
 * Scroll Manager Component
 * Handles global scroll-based animations and performance optimization
 */
class ScrollManagerComponent extends BaseComponent {
    /**
     * Initialize scroll manager
     */
    constructor() {
        super('body');
        this.animatedElements = new Set();
    }

    /**
     * Setup global scroll animations
     */
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);

        // Observe sections and cards
        const elementsToAnimate = Utils.$$('.scroll-animate');
        elementsToAnimate.forEach(element => {
            this.intersectionObserver.observe(element);
        });
    }

    /**
     * Animate element on scroll
     * @param {Element} element - Element to animate
     */
    animateElement(element) {
        element.classList.add('scroll-animate--visible');
        
        // Remove will-change after animation for performance
        setTimeout(() => {
            element.style.willChange = 'auto';
        }, 800);
    }
}

/* ==========================================================================
   ABOUT COMPONENT - Stats counter animations
   ========================================================================== */

/**
 * About Component
 * Handles counter animations and about section interactions
 */
class AboutComponent extends BaseComponent {
    /**
     * Initialize about-specific functionality
     */
    beforeInit() {
        this.counters = Utils.$$('.stats-item__number', this.element);
        this.animatedCounters = new Set();
    }

    /**
     * Animate counters when component becomes visible
     * @param {Element} target - Visible element
     */
    onElementVisible(target) {
        this.animateCounters();
    }

    /**
     * Animate number counters
     */
    animateCounters() {
        this.counters.forEach(counter => {
            if (this.animatedCounters.has(counter)) return;
            
            this.animatedCounters.add(counter);
            const target = counter.getAttribute('data-target');
            
            if (target) {
                this.animateCounter(counter, parseInt(target));
            }
        });
    }

    /**
     * Animate individual counter
     * @param {Element} counter - Counter element
     * @param {number} target - Target number
     */
    animateCounter(counter, target) {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            current += increment;
            step++;
            
            if (step >= steps) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            
            // Format large numbers
            if (target >= 1000000) {
                displayValue = Math.floor(current / 1000000) + 'M+';
            } else if (target >= 1000) {
                displayValue = Math.floor(current / 1000) + 'K+';
            } else if (counter.textContent.includes('%')) {
                displayValue += '%';
            } else if (counter.textContent.includes('+')) {
                displayValue += '+';
            }
            
            counter.textContent = displayValue;
        }, duration / steps);
    }
}

/* ==========================================================================
   APPLICATION INITIALIZER - Main application class
   ========================================================================== */

/**
 * Main Portfolio Application
 * Orchestrates all components and handles global functionality
 */
class PortfolioApp {
    /**
     * Initialize the portfolio application
     */
    constructor() {
        this.components = new Map();
        this.isInitialized = false;
        
        // Performance monitoring
        this.performanceMetrics = {
            startTime: performance.now(),
            componentsLoaded: 0,
            totalComponents: 0
        };
        
        this.init();
    }

    /**
     * Initialize application
     */
    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Initialize components
            await this.initializeComponents();
            
            // Setup global event handlers
            this.setupGlobalEvents();
            
            // Performance optimization
            this.optimizePerformance();
            
            this.isInitialized = true;
            this.logPerformanceMetrics();
            
            console.log('🚀 Portfolio application initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing portfolio application:', error);
        }
    }

    /**
     * Initialize all components
     */
    async initializeComponents() {
        const componentConfigs = [
            { name: 'navigation', class: NavigationComponent, selector: '.navigation' },
            { name: 'hero', class: HeroComponent, selector: '.hero' },
            { name: 'about', class: AboutComponent, selector: '.about' },
            { name: 'skills', class: SkillsComponent, selector: '.skills' },
            { name: 'experience', class: ExperienceComponent, selector: '.experience' },
            { name: 'projects', class: ProjectsComponent, selector: '.projects' },
            { name: 'contact', class: ContactComponent, selector: '.contact' },
            { name: 'scrollManager', class: ScrollManagerComponent, selector: null }
        ];

        this.performanceMetrics.totalComponents = componentConfigs.length;

        for (const config of componentConfigs) {
            try {
                const component = new config.class(config.selector, { debug: false });
                this.components.set(config.name, component);
                this.performanceMetrics.componentsLoaded++;
            } catch (error) {
                console.warn(`Failed to initialize ${config.name} component:`, error);
            }
        }
    }

    /**
     * Setup global event handlers
     */
    setupGlobalEvents() {
        // Handle reduced motion preference
        this.handleReducedMotion();
        
        // Page visibility change for performance
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        
        // Unload cleanup
        window.addEventListener('beforeunload', this.cleanup.bind(this));
        
        // Error handling
        window.addEventListener('error', this.handleGlobalError.bind(this));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
    }

    /**
     * Handle reduced motion preference
     */
    handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleMotionPreference = (e) => {
            if (e.matches) {
                document.documentElement.style.setProperty('--duration-fast', '0ms');
                document.documentElement.style.setProperty('--duration-normal', '0ms');
            } else {
                document.documentElement.style.removeProperty('--duration-fast');
                document.documentElement.style.removeProperty('--duration-normal');
            }
        };

        prefersReducedMotion.addEventListener('change', handleMotionPreference);
        handleMotionPreference(prefersReducedMotion);
    }

    /**
     * Handle page visibility change for performance
     */
    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations and reduce activity
            this.pauseAnimations();
        } else {
            // Resume animations
            this.resumeAnimations();
        }
    }

    /**
     * Pause animations for performance
     */
    pauseAnimations() {
        const heroComponent = this.components.get('hero');
        if (heroComponent && heroComponent.typingTimeout) {
            clearTimeout(heroComponent.typingTimeout);
        }
    }

    /**
     * Resume animations
     */
    resumeAnimations() {
        const heroComponent = this.components.get('hero');
        if (heroComponent && heroComponent.isInitialized) {
            heroComponent.startTypingAnimation();
        }
    }

    /**
     * Handle global errors
     * @param {ErrorEvent} event - Error event
     */
    handleGlobalError(event) {
        console.error('Global error caught:', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });
    }

    /**
     * Handle global keyboard shortcuts
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleGlobalKeydown(event) {
        // Skip if typing in form fields
        if (['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
            return;
        }

        // Keyboard shortcuts
        switch (event.key) {
            case 'h':
            case 'Home':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                break;
            case 'End':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }
                break;
        }
    }

    /**
     * Optimize performance
     */
    optimizePerformance() {
        // Enable passive event listeners where possible
        const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
        passiveEvents.forEach(event => {
            document.addEventListener(event, () => {}, { passive: true });
        });

        // Preload critical resources
        this.preloadCriticalResources();

        // Setup resource cleanup
        this.setupResourceCleanup();
    }

    /**
     * Preload critical resources
     */
    preloadCriticalResources() {
        const criticalImages = document.querySelectorAll('img[data-preload]');
        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src || img.dataset.src;
            document.head.appendChild(link);
        });
    }

    /**
     * Setup resource cleanup for better memory management
     */
    setupResourceCleanup() {
        // Clean up unused event listeners periodically
        setInterval(() => {
            if (document.hidden) {
                // Perform cleanup when page is not visible
                this.performCleanup();
            }
        }, 30000); // Every 30 seconds
    }

    /**
     * Perform cleanup operations
     */
    performCleanup() {
        // Force garbage collection if available (dev tools)
        if (window.gc && typeof window.gc === 'function') {
            window.gc();
        }

        // Clean up completed animations
        const completedAnimations = document.querySelectorAll('.animation-complete');
        completedAnimations.forEach(element => {
            element.style.willChange = 'auto';
        });
    }

    /**
     * Log performance metrics
     */
    logPerformanceMetrics() {
        const endTime = performance.now();
        const loadTime = endTime - this.performanceMetrics.startTime;
        
        console.log('📊 Performance Metrics:', {
            'Load Time': `${loadTime.toFixed(2)}ms`,
            'Components Loaded': `${this.performanceMetrics.componentsLoaded}/${this.performanceMetrics.totalComponents}`,
            'Memory Usage': this.getMemoryUsage(),
            'DOM Nodes': document.querySelectorAll('*').length
        });
    }

    /**
     * Get memory usage information
     * @returns {Object} Memory usage stats
     */
    getMemoryUsage() {
        if (performance.memory) {
            return {
                used: `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)}MB`,
                total: `${(performance.memory.totalJSHeapSize / 1048576).toFixed(2)}MB`,
                limit: `${(performance.memory.jsHeapSizeLimit / 1048576).toFixed(2)}MB`
            };
        }
        return 'Not available';
    }

    /**
     * Get component by name
     * @param {string} name - Component name
     * @returns {BaseComponent|null} Component instance
     */
    getComponent(name) {
        return this.components.get(name) || null;
    }

    /**
     * Cleanup resources on page unload
     */
    cleanup() {
        this.components.forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        this.components.clear();
    }
}

/* ==========================================================================
   APPLICATION BOOTSTRAP - Initialize when DOM is ready
   ========================================================================== */

// Initialize application
let portfolioApp;

// Multiple initialization strategies for robustness
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
}

/**
 * Initialize the portfolio application
 */
function initializeApp() {
    try {
        portfolioApp = new PortfolioApp();
        
        // Make app globally accessible for debugging (development only)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            window.portfolioApp = portfolioApp;
        }
    } catch (error) {
        console.error('Failed to initialize portfolio application:', error);
    }
}

// Fallback initialization after a delay
setTimeout(() => {
    if (!portfolioApp) {
        console.warn('Fallback initialization triggered');
        initializeApp();
    }
}, 2000);

/* ==========================================================================
   EXPORTS - For module compatibility (if needed)
   ========================================================================== */

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PortfolioApp,
        NavigationComponent,
        HeroComponent,
        SkillsComponent,
        ExperienceComponent,
        ProjectsComponent,
        ContactComponent,
        ScrollManagerComponent,
        AboutComponent,
        Utils
    };
}