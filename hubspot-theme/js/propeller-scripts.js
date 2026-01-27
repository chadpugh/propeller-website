// Propeller Website JavaScript for HubSpot theme

// CRITICAL: Force header wrapper position fix - runs at multiple execution points
// This fixes the click blocking issue caused by HubSpot's position:relative
(function() {
    function fixHeaderPosition() {
        const headerWrapper = document.getElementById('hs_cos_wrapper_header');
        if (headerWrapper) {
            headerWrapper.style.setProperty('position', 'static', 'important');
            headerWrapper.style.setProperty('z-index', 'auto', 'important');
            console.log('✓ Header position fixed - clicks should work now');
        }
    }
    
    // Run immediately (catches early DOM)
    fixHeaderPosition();
    
    // Run after DOM loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixHeaderPosition);
    }
    
    // Run after everything loads (catches HubSpot's late scripts)
    window.addEventListener('load', fixHeaderPosition);
    
    // Run after a short delay to catch any async HubSpot modifications
    setTimeout(fixHeaderPosition, 100);
    setTimeout(fixHeaderPosition, 500);
})();

// Function to initialize all functionality
function initializePropeller() {
    // Header position fix is now handled above with multiple execution points
    
    // Initialize background animation only on homepage when container exists
    const animationContainer = document.getElementById('background-animation');
    if (animationContainer) {
        initializeBackgroundAnimation();
    }

    // Smooth scrolling for anchor links - with validation to prevent errors
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Skip if href is just "#" or empty to prevent querySelector errors
            if (!href || href === '#' || href.length <= 1) {
                return;
            }
            e.preventDefault();
            try {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (error) {
                console.warn('Invalid selector for smooth scroll:', href);
            }
        });
    });

    // Newsletter form submission (HubSpot integration)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.querySelector('#email');
            const email = emailInput.value.trim();
            
            // Basic email validation
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // For HubSpot, we can integrate with forms API here
            showMessage('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        });
    }

    // Header transparency on scroll
    const header = document.querySelector('.header.propeller-header');
    if (header) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(237, 246, 249, 0.95)';
            } else {
                header.style.background = 'rgba(237, 246, 249, 0.8)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.info-card, .contact-card, .footer-column');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('#mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (mobileMenuToggle && mobileMenuOverlay) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose && mobileMenuOverlay) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking outside or on menu items
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on menu items
        const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Initialize when DOM is ready - handles both scenarios
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePropeller);
} else {
    // DOM is already ready, run immediately
    initializePropeller();
}

// Initialize background animation
function initializeBackgroundAnimation() {
    if (typeof p5 === 'undefined') {
        var p5Script = document.createElement('script');
        p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.10/p5.js';
        p5Script.onload = function() {
            loadBackgroundAnimationScript();
        };
        document.head.appendChild(p5Script);
    } else {
        loadBackgroundAnimationScript();
    }
}

function loadBackgroundAnimationScript() {
    // Inline the background animation script to avoid MIME type issues
    if (document.getElementById('background-animation')) {
        // Background animation sketch for Propeller website
        let sketch = function(p) {
          let THE_SEED;
          let border = 0;
          let number_of_particles = 4000;
          let number_of_particle_sets = 8;
          let particle_sets = [];
          let tick = 0;
          let startTime;

          let palette;
          let nzoom = 10;

          p.setup = function() {
            // Make canvas responsive to window size
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('background-animation');
            
            THE_SEED = p.floor(p.random(9999999));
            p.randomSeed(THE_SEED);

            p.noFill();
            p.background(237, 246, 249);
            p.stroke(152, 173, 244, 40);
            p.strokeWeight(1.2);
            p.smooth();

            palette = [p.color(152, 173, 244, 20), p.color(152, 173, 244, 15)];

            // Initialize timer for 20-second stop
            startTime = p.millis();

            for (var j = 0; j < number_of_particle_sets; j++) {
              let ps = [];
              for (var i = 0; i < number_of_particles; i++) {
                ps.push(
                  new Particle(
                    p.randomGaussian(p.width / 2, 160),
                    p.randomGaussian(3 * p.height / 5, 160),
                    p.random(p.TWO_PI)
                  )
                );
              }
              particle_sets.push(ps);
            }
          };

          p.draw = function() {
            // Stop animation after 20 seconds
            if (p.millis() - startTime > 20000) {
              p.noLoop();
              return;
            }

            particle_sets.forEach(function(particles, index) {
              particles.forEach(function(particle) {
                particle.update(index);
                particle.display(index);
              });
            });
          };

          p.windowResized = function() {
            // Intentionally empty - no resize handling to prevent animation restart
          };

          p.keyPressed = function() {
            if (p.keyCode === 80) p.saveCanvas('sketch_' + THE_SEED, 'jpeg');
          };

          class Particle {
            constructor(x, y, phi) {
              this.pos = p.createVector(x, y);
              this.angle = phi;
              this.val = 0;
              this.altitude = 0;
            }

            update(index) {
              this.pos.x += p.cos(this.angle);
              this.pos.y += p.sin(this.angle);

              let nx = p.map(this.pos.y, 0, p.height + 100, 4, 0.5) * p.map(this.pos.x, 0, p.width, -1, 1);
              let ny = 2 * p.map(this.pos.y, 0, p.height + 100, 4, 1) * p.map(this.pos.y, 0, p.height, -1, 1);

              let n = p.createVector(nx, ny);

              this.altitude = p.noise(n.x + 423.2, n.y - 231.1);
              let nval = (this.altitude + 0.045 * (index - number_of_particle_sets / 2)) % 1;

              this.angle += 3 * p.map(nval, 0, 1, -1, 1);
              this.val = nval;
            }

            display(index) {
              if (this.val > 0.482 && this.val < 0.518) {
                p.push();
                p.translate(this.pos.x, this.pos.y + 10 - this.altitude * 40 * p.map(this.pos.y, 0, p.height + 100, 1, 4));
                p.rotate(this.angle);
                p.point(0, 0);
                p.pop();
              }
            }
          }
        };

        // Initialize the background animation
        new p5(sketch);
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message-popup message-${type}`;
    messageEl.textContent = message;
    
    // Style the message
    Object.assign(messageEl.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set colors based on type
    switch (type) {
        case 'success':
            messageEl.style.backgroundColor = '#10B981';
            messageEl.style.color = '#FFFFFF';
            break;
        case 'error':
            messageEl.style.backgroundColor = '#EF4444';
            messageEl.style.color = '#FFFFFF';
            break;
        case 'info':
        default:
            messageEl.style.backgroundColor = '#1840EC';
            messageEl.style.color = '#FFFFFF';
            break;
    }
    
    // Add to DOM
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 4000);
}

// Portfolio logo hover effects
document.addEventListener('DOMContentLoaded', function() {
    const portfolioLogos = document.querySelectorAll('.portfolio-logo');
    portfolioLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
