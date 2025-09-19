// Общий JavaScript функционал для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    
    // Плавная прокрутка для якорных ссылок
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

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем анимацию к элементам
    const animatedElements = document.querySelectorAll(
        '.event-card, .rule-item, .feature-card, .info-card, ' +
        '.benefit-card, .step-item, .feature-item, .quick-link-card'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Эффект плавающих частиц
    function createFloatingParticles() {
        const hero = document.querySelector('.hero, .page-header');
        if (!hero) return;
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: rgba(168, 85, 247, ${Math.random() * 0.5 + 0.3});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 4 + 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                z-index: -1;
                pointer-events: none;
            `;
            hero.appendChild(particle);
        }
    }
    
    // Инициализация частиц
    createFloatingParticles();

    // Мобильное меню
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Закрытие меню при клике на ссылку
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Эффект печатной машинки для заголовков (опционально)
    function typeWriter(element, text, speed = 50) {
        if (!element) return;
        
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Параллакс эффект для фона (легкий)
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.section');
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate * 0.1 * (index + 1)}px)`;
        });
        
        ticking = false;
    }

    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Добавляем параллакс только на десктопе
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestParallaxUpdate);
    }

    // Обновление активного пункта навигации при скролле
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Добавление эффекта свечения при наведении на кнопки
    const buttons = document.querySelectorAll('.cta-button, .discord-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) saturate(1.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
        });
    });

    // Загрузка контента с задержкой для плавности
    const contentElements = document.querySelectorAll('.section-content');
    contentElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * index);
    });

    // Обработка ошибок загрузки изображений
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log('Ошибка загрузки изображения:', this.src);
        });
    });

    // Прелоадер для плавного появления страницы
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('HURT TIME - Скрипты загружены успешно!');
});