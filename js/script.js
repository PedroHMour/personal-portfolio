// js/script.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // Função para o fundo de partículas
    const iniciarParticulas = () => {
        if (document.getElementById('particles-js')) {
            particlesJS("particles-js", {
                "particles": {
                    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#ccd6f6" },
                    "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
                    "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
                    "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
                    "line_linked": { "enable": true, "distance": 150, "color": "#8892b0", "opacity": 0.4, "width": 1 },
                    "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                    "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
                },
                "retina_detect": true
            });
        }
    };
    
    // Função para o Menu Hambúrguer
    const configurarMenuMobile = () => {
        const primaryNav = document.getElementById('primary-navigation');
        const navToggle = document.querySelector('.mobile-nav-toggle');

        if (primaryNav && navToggle) {
            navToggle.addEventListener('click', () => {
                const isVisible = primaryNav.getAttribute('data-visible') === 'true';
                primaryNav.setAttribute('data-visible', !isVisible);
                navToggle.setAttribute('aria-expanded', !isVisible);
            });
            
            // Fecha o menu ao clicar em um link
            primaryNav.addEventListener('click', (e) => {
                if(e.target.matches('a')) {
                     primaryNav.setAttribute('data-visible', false);
                     navToggle.setAttribute('aria-expanded', false);
                }
            });
        }
    };

    // Função para atualizar o ano no rodapé
    const atualizarAnoRodape = () => {
        const currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
    };

    // Função para rolagem suave (seu código original - sem alterações)
    const configurarRolagemSuave = () => {
        const linksInternos = document.querySelectorAll('a[href^="#"]');
        linksInternos.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                // Previne o comportamento padrão apenas para links internos que não são do menu mobile
                if (!this.closest('.primary-navigation')) {
                   e.preventDefault();
                }

                const targetId = this.getAttribute('href');
                let targetElement;

                if (targetId === '#' || targetId.toLowerCase() === '#header' || targetId.toLowerCase() === '#top') {
                    targetElement = document.body;
                } else if (targetId.length > 1) {
                    targetElement = document.querySelector(targetId);
                }

                if (targetElement) {
                    // Espera um pouco para o menu fechar antes de rolar
                    setTimeout(() => {
                         targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }, 300); // 300ms é um bom valor
                   
                } else {
                    console.warn(`Elemento com ID "${targetId}" não encontrado para rolagem suave.`);
                }
            });
        });
    };

    // Função para controlar o efeito da navbar ao rolar (seu código original - sem alterações)
    const controlarNavbarScroll = () => {
        const header = document.getElementById('header');
        if (!header) return;
        const scrollThreshold = 50;
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };

    // Inicializa todas as funções
    iniciarParticulas();
    configurarMenuMobile();
    atualizarAnoRodape();
    configurarRolagemSuave();
    controlarNavbarScroll();
});