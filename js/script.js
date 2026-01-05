'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SEUS PROJETOS (EDITE AQUI PARA ADICIONAR MAIS)
       ========================================================================== */
    const myProjects = [
        {
            title: "Landing Page Site Advocacia",
            description: "landing page responsiva para escritório de advocacia, com design moderno e otimização SEO.",
            tags: ["HTML", "CSS", "Javascript"],
            repoLink: "https://github.com/PedroHMour/advocacia-lp",
            demoLink: "https://advocacia-lp-nine.vercel.app/"
        },
        {
            title: "CodeLab Academy Landing Page",
            description: "Landing page comercial responsiva com tema Dark Mode/Neon, animações de scroll (Intersection Observer) e micro-interações modernas.",
            tags: ["TypeScript", "SASS", "Vite", "HTML5"],
            repoLink: "https://github.com/PedroHMour/landing-page-codelab",
            demoLink: "https://landing-page-codelab.vercel.app" // Substitua pelo link real do seu deploy
        },
        {
            title: "Bancada MVP - Marketplace 3D",
            description: "Plataforma que conecta makers e clientes. Venda de arquivos digitais, produtos físicos e serviços de impressão sob demanda.",
            tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase"],
            repoLink: "https://github.com/pedrohmour/bancada_mvp",
            demoLink: "https://www.bancadamakeroficial.com/"
        },
        
    ];

    /* ==========================================================================
       2. RENDERIZAÇÃO DOS PROJETOS
       ========================================================================== */
    const projectsContainer = document.getElementById('projects-grid');

    if (projectsContainer) {
        projectsContainer.innerHTML = ''; // Limpa container

        myProjects.forEach(project => {
            // Gera as tags coloridas
            const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            // Botão de Demo (Aparece desabilitado se não tiver link)
            const demoButton = project.demoLink
                ? `<a href="${project.demoLink}" target="_blank" class="link-demo"><i class="fas fa-external-link-alt"></i> Ver Demo</a>`
                : `<a href="#" class="link-demo" style="background:#e2e8f0; color:#94a3b8; cursor:not-allowed;">Backend Only</a>`;

            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-body">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">${tagsHtml}</div>
                    
                    <div class="project-links">
                        ${demoButton}
                        <a href="${project.repoLink}" target="_blank" class="link-code" title="Ver Código"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(card);
        });
    }

    /* ==========================================================================
       3. MENU MOBILE & INTERAÇÕES
       ========================================================================== */
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            // Troca ícone
            const icon = mobileBtn.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fecha menu ao clicar em link
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileBtn.querySelector('i').classList.remove('fa-times');
                mobileBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    /* ==========================================================================
       4. ATUALIZAÇÃO DO ANO NO RODAPÉ
       ========================================================================== */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});