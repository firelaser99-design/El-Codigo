/**
 * Script Principal para animar a Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {

    // Configurações do Intersection Observer
    const observerOptions = {
        root: null, // usa a janela de visualização do navegador
        rootMargin: '0px 0px -50px 0px', // Aciona um pouco antes de aparecer completamente
        threshold: 0.15 // Dispara quando 15% do elemento estiver visível
    };

    // Callback para intersecção
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe que inicia a animação CSS
                entry.target.classList.add('visible');

                // Como só queremos animar uma vez na entrada, paramos de observar
                observer.unobserve(entry.target);
            }
        });
    };

    // Cria a instância do observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Seleciona todos os elementos que devem ser animados
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .scale-in');

    // Inicia a observação de cada elemento
    animatedElements.forEach(el => observer.observe(el));


    // Navbar Scroll Effect (Opacidade/Sombra no scroll)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            navbar.style.padding = '12px 0';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
            navbar.style.padding = '16px 0';
        }
    });

    // Smooth Scroll para links internos (#)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Altura do header fixo
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Fechar todos os outros
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Se não estava aberto, abre o atual
            if (!isOpen) {
                item.classList.add('active');
                answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
            }
        });
    });
});
