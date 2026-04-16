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

        const eventDate = new Date(2026, 3, 17, 8, 0, 0).getTime(); 
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
// UPWARD INTERACTIVE PARTICLES
// =============================

function createParticles() {

    const container = document.getElementById('particles');
    if (!container) return;

    const particles = [];
    const count = 100;

    for (let i = 0; i < count; i++) {

        const el = document.createElement('div');
        el.className = 'particle';

        const particle = {
            el: el,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speed: Math.random() * 0.7 + 0.3,
        };

        container.appendChild(el);
        particles.push(particle);
    }

    let mouse = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function animate() {

        particles.forEach(p => {

            // MOVE UPWARD
            p.y -= p.speed;

            if (p.y < 0) {
                p.y = window.innerHeight;
                p.x = Math.random() * window.innerWidth;
            }

            // MOUSE REPEL
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                p.x += dx * 0.05;
                p.y += dy * 0.05;
            }

            // APPLY POSITION
            p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

createParticles();


const dot = document.createElement("div");
dot.classList.add("cursor-dot");

const outline = document.createElement("div");
outline.classList.add("cursor-outline");

document.body.appendChild(dot);
document.body.appendChild(outline);

document.addEventListener("mousemove", (e) => {
    dot.style.top = e.clientY + "px";
    dot.style.left = e.clientX + "px";

    outline.style.top = e.clientY + "px";
    outline.style.left = e.clientX + "px";
});


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