document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll', !isExpanded); // Prevent scrolling behind menu
        });

        // Close menu when clicking links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // --- Header Background Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on init

    // --- Dynamic Card Scroll/Hover Effect for Services ---
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.classList.add('animate-reveal');
    });

    // --- Reveal on Scroll Animations ---
    const revealElements = document.querySelectorAll('.animate-reveal');
    
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Animates once
                }
            });
        };
        
        const observerOptions = {
            root: null,
            threshold: 0.1, // Trigger when 10% is visible
            rootMargin: '0px 0px -50px 0px' // Adjust trigger offset
        };
        
        const revealObserver = new IntersectionObserver(revealCallback, observerOptions);
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }

    // --- Contact Form Interactive Handling ---
    const contactForm = document.getElementById('contactForm');
    const btnSubmit = document.getElementById('btnSubmit');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const company = document.getElementById('company').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showStatus('Por favor, rellena todos los campos obligatorios.', 'error');
                return;
            }
            
            // Set loading state
            btnSubmit.disabled = true;
            const originalBtnText = btnSubmit.textContent;
            btnSubmit.textContent = 'Enviando...';
            
            // Simulate sending process (AJAX / backend integration point)
            setTimeout(() => {
                btnSubmit.disabled = false;
                btnSubmit.textContent = originalBtnText;
                
                // Show success status
                showStatus('¡Solicitud enviada con éxito! Alba se pondrá en contacto contigo en las próximas 24 horas.', 'success');
                
                // Clear form
                contactForm.reset();
            }, 1200);
        });
    }
    
    const showStatus = (msg, type) => {
        if (!formStatus) return;
        formStatus.textContent = msg;
        formStatus.className = 'form-status'; // Reset classes
        formStatus.classList.add(type);
        
        // Auto remove error/success notice after 8 seconds
        setTimeout(() => {
            formStatus.classList.remove('success', 'error');
            formStatus.textContent = '';
        }, 8000);
    };


});
