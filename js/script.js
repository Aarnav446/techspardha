// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function () {

    // Loading screen
    setTimeout(() => {
        document.getElementById('loader')?.style.setProperty('opacity', '0');
        setTimeout(() => {
            document.getElementById('loader')?.remove();
        }, 500);
    }, 2000);

    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu?.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // Smooth scrolling
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

    // Scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Active nav link on scroll
    window.addEventListener('scroll', () => {

        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {

            const sectionTop = section.offsetTop;

            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }

        });

        document.querySelectorAll('.nav-link').forEach(link => {

            link.classList.remove('active');

            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }

        });

    });


    // =============================
    // FIXED COUNTDOWN TIMER
    // =============================

    function startCountdown() {

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const eventDate = new Date(2026, 3, 19, 8, 0, 0).getTime(); 
        // month index starts from 0 so 3 = April

        function updateCountdown() {

            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance <= 0) {

                daysEl.textContent = "00";
                hoursEl.textContent = "00";
                minutesEl.textContent = "00";
                secondsEl.textContent = "00";

                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));

            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) /
                (1000 * 60)
            );

            const seconds = Math.floor(
                (distance % (1000 * 60)) /
                1000
            );

            daysEl.textContent = days.toString().padStart(2, "0");
            hoursEl.textContent = hours.toString().padStart(2, "0");
            minutesEl.textContent = minutes.toString().padStart(2, "0");
            secondsEl.textContent = seconds.toString().padStart(2, "0");

        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    startCountdown();


    // =============================
    // PARTICLE BACKGROUND
    // =============================

    function createParticles() {

        const particlesContainer = document.getElementById('particles');

        if (!particlesContainer) return;

        for (let i = 0; i < 100; i++) {

            const particle = document.createElement('div');

            particle.className = 'particle';

            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';

            particlesContainer.appendChild(particle);
        }

    }


    const particleStyle = document.createElement('style');

    particleStyle.textContent = `
    .particle{
        position:absolute;
        width:2px;
        height:2px;
        background:#00f7ff;
        border-radius:50%;
        animation:float linear infinite;
        box-shadow:0 0 10px #00f7ff;
    }

    @keyframes float{
        0%{transform:translateY(100vh);opacity:0;}
        10%{opacity:1;}
        90%{opacity:1;}
        100%{transform:translateY(-100vh);opacity:0;}
    }
    `;

    document.head.appendChild(particleStyle);

    createParticles();


    // CONTACT FORM
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {

        contactForm.addEventListener('submit', function (e) {

            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');

            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            submitBtn.disabled = true;

            setTimeout(() => {

                alert("Thank you! Your message has been sent.");

                this.reset();

                submitBtn.innerHTML = originalText;

                submitBtn.disabled = false;

            }, 2000);

        });

    }


    // HERO PARALLAX
    window.addEventListener('scroll', () => {

        const scrolled = window.pageYOffset;

        const hero = document.querySelector('.hero');

        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.3 + "px";
        }

    });

});


// PAGE-SPECIFIC ENHANCEMENTS

if (document.querySelector('.events-grid')) {

    const eventCards = document.querySelectorAll('.event-card');

    eventCards.forEach((card, index) => {

        card.style.animationDelay = `${index * 0.1}s`;

    });

}


if (document.querySelector('.team-grid')) {

    const teamCards = document.querySelectorAll('.team-card');

    teamCards.forEach((card, index) => {

        card.style.animationDelay = `${index * 0.15}s`;

    });

}