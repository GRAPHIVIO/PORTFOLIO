document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 2. Navbar Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scrolling
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

    // 4. Scroll Reveal Animations (Intersection Observer)
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 5. Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    });

    // 6. Typing Effect Logic
    const typingTextElement = document.querySelector('.typing-text');
    if (typingTextElement) {
        const words = ['growth.', 'engagement.', 'success.', 'action.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                // Remove char
                typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Add char
                typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            // Adjust typing speed
            let typeSpeed = isDeleting ? 50 : 100;

            // If full word is typed
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Move to next word
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // Start typing effect slightly after load
        setTimeout(typeEffect, 1000);
    }

    // 7. Stat Counters Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;

                        // Lower increment for slower counting
                        const inc = target / 40;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.journey-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // 8. Mouse Parallax Effect for Hero Blobs
    const heroSection = document.querySelector('.hero');
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');

    if (heroSection && blob1 && blob2) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Move blobs in opposite directions based on mouse pos
            blob1.style.transform = `translate(${x * -50}px, ${y * -50}px)`;
            blob2.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
        });
    }

    // 9. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Close all currently open answers (optional: remove this loop to allow multiple open)
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle clicked answer
            question.classList.toggle('active');
            const answer = question.nextElementSibling;

            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Initial trigger for fade-ins already in viewport
    setTimeout(() => {
        faders.forEach(fader => {
            const rect = fader.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                fader.classList.add('appear');
            }
        });
    }, 100);

    // Analytics Dashboard Charts
    const initAnalyticsCharts = () => {
        // Animate metric values
        const animateMetrics = () => {
            const metrics = [
                { id: 'total-visitors', target: 2847 },
                { id: 'page-views', target: 8932 },
                { id: 'avg-session', target: '3:24', isTime: true },
                { id: 'bounce-rate', target: 42, isPercentage: true }
            ];

            metrics.forEach(metric => {
                const element = document.getElementById(metric.id);
                if (element && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    if (metric.isTime) {
                        // For time, just set it directly
                        element.textContent = metric.target;
                    } else if (metric.isPercentage) {
                        // For percentage
                        const updateCount = () => {
                            const count = +element.innerText.replace('%', '');
                            const inc = metric.target / 40;
                            if (count < metric.target) {
                                element.innerText = Math.ceil(count + inc) + '%';
                                setTimeout(updateCount, 40);
                            } else {
                                element.innerText = metric.target + '%';
                            }
                        };
                        updateCount();
                    } else {
                        // For numbers
                        const updateCount = () => {
                            const count = +element.innerText.replace(/,/g, '');
                            const inc = metric.target / 40;
                            if (count < metric.target) {
                                element.innerText = Math.ceil(count + inc).toLocaleString();
                                setTimeout(updateCount, 40);
                            } else {
                                element.innerText = metric.target.toLocaleString();
                            }
                        };
                        updateCount();
                    }
                }
            });
        };

        animateMetrics();
        // Traffic Overview Chart
        const trafficCtx = document.getElementById('trafficChart');
        if (trafficCtx) {
            new Chart(trafficCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Visitors',
                        data: [1200, 1350, 1180, 1420, 1680, 1520, 1890, 1750, 2100, 2280, 2450, 2847],
                        borderColor: 'rgb(0, 63, 125)',
                        backgroundColor: 'rgba(0, 63, 125, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Page Views',
                        data: [4800, 5200, 4900, 5800, 6500, 6200, 7200, 6800, 7800, 8200, 8500, 8932],
                        borderColor: 'rgb(198, 164, 0)',
                        backgroundColor: 'rgba(198, 164, 0, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        }
                    }
                }
            });
        }

        // Top Pages Chart
        const pagesCtx = document.getElementById('pagesChart');
        if (pagesCtx) {
            new Chart(pagesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Home', 'Projects', 'Services', 'About', 'Contact'],
                    datasets: [{
                        data: [35, 25, 20, 12, 8],
                        backgroundColor: [
                            'rgb(0, 63, 125)',
                            'rgb(198, 164, 0)',
                            'rgb(16, 185, 129)',
                            'rgb(59, 130, 246)',
                            'rgb(139, 92, 246)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        }
    };

    // Initialize charts when analytics section comes into view
    const analyticsSection = document.getElementById('analytics');
    if (analyticsSection) {
        const analyticsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initAnalyticsCharts();
                    analyticsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        analyticsObserver.observe(analyticsSection);
    }
});
