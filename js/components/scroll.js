export const initScrollEffects = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-hidden').forEach((section) => {
        sectionObserver.observe(section);
    });

    const staggerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('stagger-visible');
                    }, index * 100);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.stagger-item').forEach((item) => {
        staggerObserver.observe(item);
    });

    const home = document.getElementById('home');
    if (home) {
        home.classList.remove('section-hidden');
        home.classList.add('section-visible');
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            if (
                this.classList.contains('enroll-btn') ||
                this.classList.contains('nav-cta') ||
                this.getAttribute('href') === '#enroll'
            ) {
                return;
            }

            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
};
