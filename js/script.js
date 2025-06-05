// js/script.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Função para atualizar o ano no rodapé
    const atualizarAnoRodape = () => {
        const currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
    };

    // Função para rolagem suave
    const configurarRolagemSuave = () => {
        const linksInternos = document.querySelectorAll('a[href^="#"]');

        linksInternos.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                let targetElement;

                if (targetId === '#' || targetId.toLowerCase() === '#header' || targetId.toLowerCase() === '#top') {
                    targetElement = document.body;
                } else if (targetId.length > 1) {
                    targetElement = document.querySelector(targetId);
                }

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    console.warn(`Elemento com ID "${targetId}" não encontrado para rolagem suave.`);
                }
            });
        });
    };

    // Função para controlar o efeito da navbar ao rolar
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

    // Inicializa as funções
    atualizarAnoRodape();
    configurarRolagemSuave();
    controlarNavbarScroll();
});