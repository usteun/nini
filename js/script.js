document.addEventListener('DOMContentLoaded', function() {
    // Header scroll behavior
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                navMenu.classList.remove('active');
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Modal handling
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalCloses = document.querySelectorAll('.modal__close');

    function openModal(modalId) {
        const modal = document.getElementById(modalId + 'Modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            openModal(trigger.dataset.modal);
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            closeModal(close.closest('.modal'));
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            // Validate form
            let isValid = true;
            for (const [key, value] of formData.entries()) {
                const input = registerForm.querySelector(`#${key}`);
                if (!value) {
                    input.classList.add('invalid');
                    isValid = false;
                } else {
                    input.classList.remove('invalid');
                }
            }

            if (!isValid) {
                alert('Пожалуйста, заполните все поля корректно.');
                return;
            }

            try {
                // Simulate form submission
                console.log('Form submitted:', data);
                // Here you would typically send the data to your server

                // Show success message
                alert('Регистрация успешно завершена!');
                closeModal(document.getElementById('registerModal'));
                registerForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте снова.');
            }
        });
    }

    // Handle venue map button click
    const venueMapButton = document.getElementById('venueMapButton');
    if (venueMapButton) {
        venueMapButton.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 11) {
                    value = value.match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                    e.target.value = !value[2] ? value[1] : `+${value[1]} (${value[2]}${value[3] ? `) ${value[3]}` : ''}${value[4] ? `-${value[4]}` : ''}${value[5] ? `-${value[5]}` : ''}`;
                }
            }
        });
    }
});
