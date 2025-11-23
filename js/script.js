'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CARREGAMENTO DE PROJETOS (GITHUB API + FALLBACK)
       ========================================================================== */
    
    const fetchGitHubProjects = async () => {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        // DADOS DE BACKUP (FALLBACK)
        // Usados caso a API do GitHub falhe ou não retorne nada.
        // Isso garante que a seção nunca fique vazia.
        const fallbackProjects = [
            {
                name: "Python Automation Bot",
                description: "A robust automation script built with Python and Selenium to handle repetitive tasks and data entry efficiency.",
                html_url: "https://github.com/PedroHMour",
                language: "Python",
                stargazers_count: 12
            },
            {
                name: "SaaS Platform MVP",
                description: "Full-stack SaaS application for business management using Django and React with Stripe integration.",
                html_url: "https://github.com/PedroHMour",
                language: "JavaScript",
                stargazers_count: 8
            },
            {
                name: "Web Scraper API",
                description: "API designed to scrape e-commerce data in real-time, formatted in JSON for analysis.",
                html_url: "https://github.com/PedroHMour",
                language: "Python",
                stargazers_count: 5
            },
            {
                name: "Portfolio Website",
                description: "Modern, responsive portfolio website built with HTML5, CSS3, and JavaScript with parallax effects.",
                html_url: "https://github.com/PedroHMour",
                language: "HTML",
                stargazers_count: 10
            },
            {
                name: "Data Analysis Tool",
                description: "Pandas and NumPy based tool for processing large datasets and generating visual reports.",
                html_url: "https://github.com/PedroHMour",
                language: "Jupyter Notebook",
                stargazers_count: 7
            },
            {
                name: "FastAPI Backend",
                description: "High-performance async API built with FastAPI and PostgreSQL for a mobile application.",
                html_url: "https://github.com/PedroHMour",
                language: "Python",
                stargazers_count: 15
            }
        ];

        // Função para renderizar os cards no HTML
        const renderProjects = (repos) => {
            projectsGrid.innerHTML = ''; // Limpa o "Loading..."
            
            repos.forEach((repo, index) => {
                const card = document.createElement('div');
                // Adiciona classes para estilização e animação
                card.className = 'project-card reveal';
                // Adiciona delay na animação para efeito cascata (opcional, mas bonito)
                card.style.transitionDelay = `${index * 100}ms`;

                card.innerHTML = `
                    <div class="project-card-header">
                        <div class="project-folder-icon">
                            <i class="far fa-folder"></i>
                        </div>
                        <div class="project-links">
                            <a href="${repo.html_url}" target="_blank" aria-label="GitHub Link">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                    <h3 class="project-title">
                        <a href="${repo.html_url}" target="_blank">
                            ${repo.name.replace(/[-_]/g, ' ')}
                        </a>
                    </h3>
                    <p class="project-description">
                        ${repo.description || 'Software solution developing high-performance code and automation.'}
                    </p>
                    <div class="project-card-footer">
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span>${repo.language || 'Code'}</span>
                    </div>
                `;
                projectsGrid.appendChild(card);
            });
            
            // Força a verificação de animação após inserir os elementos
            setTimeout(revealOnScroll, 100);
        };

        try {
            const username = 'PedroHMour';
            const url = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`;
            
            // Tenta buscar do GitHub
            const response = await fetch(url);
            
            if (response.ok) {
                const repos = await response.json();
                // Se houver repositórios, usa os 6 primeiros
                if (repos.length > 0) {
                    renderProjects(repos.slice(0, 6));
                } else {
                    // Se array vazio, usa fallback
                    renderProjects(fallbackProjects);
                }
            } else {
                // Erro na resposta (ex: limite de API excedido), usa fallback
                console.warn("GitHub API error, using fallback data.");
                renderProjects(fallbackProjects);
            }
        } catch (error) {
            // Erro de rede, usa fallback
            console.error("Network error, using fallback data:", error);
            renderProjects(fallbackProjects);
        }
    };


    /* ==========================================================================
       2. PARALLAX EFFECT (BACKGROUND MOVING LAYERS)
       ========================================================================== */
    
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        // Usa requestAnimationFrame para performance suave
        requestAnimationFrame(() => {
            parallaxLayers.forEach(layer => {
                const speed = parseFloat(layer.getAttribute('data-speed'));
                // Move o elemento verticalmente baseado na velocidade e scroll
                layer.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    });


    /* ==========================================================================
       3. REVEAL ANIMATION ON SCROLL (FADE UP)
       ========================================================================== */
    
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Distância do topo para ativar animação

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Ouve o evento de scroll
    window.addEventListener('scroll', revealOnScroll);
    // Chama uma vez no início para mostrar o que já está na tela
    revealOnScroll();


    /* ==========================================================================
       4. SISTEMA DE TRADUÇÃO (i18n)
       ========================================================================== */
    
    const translations = {
        en: {
            nav_about: "About", nav_expertise: "Expertise", nav_projects: "Projects", nav_contact: "Contact",
            hero_greeting: "Hi, my name is", 
            hero_subtitle: "I build software solutions.", 
            hero_description: "Software Developer specialized in creating high-performance Websites, SaaS platforms, and Python Automations to scale your business.", 
            hero_cta: "Check out my projects", hero_cv: "Download CV",
            about_title: "About Me", 
            about_p1: "Hello! I'm Pedro, a Software Developer passionate about building digital products. From the backend logic to the frontend interface, I love creating systems that work seamlessly.", 
            about_p2: "I help businesses by delivering complete solutions: Websites that convert, SaaS applications that solve real problems, and backend automations that save time.", 
            about_p3: "Here are a few technologies I use:",
            expertise_title: "Expertise", 
            expertise_card1_title: "Websites & SaaS", expertise_card1_desc: "Building modern, responsive websites and scalable SaaS platforms tailored to your business needs.", 
            expertise_card2_title: "Python Automation", expertise_card2_desc: "Creating powerful bots and scripts to automate boring tasks, data entry, and complex workflows.", 
            expertise_card3_title: "API Development", expertise_card3_desc: "Developing robust RESTful APIs to connect your systems, ensuring seamless data flow.",
            projects_title: "Projects", 
            contact_title: "What's Next?", contact_subtitle: "Get In Touch", contact_desc: "Whether you have an idea for a SaaS, need a website, or want to automate a process, my inbox is open!", contact_cta: "Say Hello", 
            footer_credit: "Designed & Built by Pedro Henrique"
        },
        pt: {
            nav_about: "Sobre", nav_expertise: "Serviços", nav_projects: "Projetos", nav_contact: "Contato",
            hero_greeting: "Olá, meu nome é", 
            hero_subtitle: "Eu crio soluções de software.", 
            hero_description: "Desenvolvedor de Software especialista em Sites de alta performance, plataformas SaaS e Automações Python para escalar o seu negócio.", 
            hero_cta: "Ver Projetos", hero_cv: "Baixar CV",
            about_title: "Sobre Mim", 
            about_p1: "Olá! Sou Pedro, um Desenvolvedor de Software apaixonado por criar produtos digitais. Da lógica do backend à interface, adoro criar sistemas que funcionam perfeitamente.", 
            about_p2: "Ajudo empresas entregando soluções completas: Sites que convertem, aplicações SaaS que resolvem problemas reais e automações que economizam tempo.", 
            about_p3: "Aqui estão algumas tecnologias que uso:",
            expertise_title: "Serviços", 
            expertise_card1_title: "Sites & SaaS", expertise_card1_desc: "Construção de sites modernos e plataformas SaaS escaláveis sob medida para o seu negócio.", 
            expertise_card2_title: "Automação Python", expertise_card2_desc: "Criação de bots e scripts para automatizar tarefas repetitivas e fluxos de trabalho complexos.", 
            expertise_card3_title: "Desenvolvimento de APIs", expertise_card3_desc: "Desenvolvimento de APIs RESTful robustas para conectar seus sistemas e garantir fluxo de dados.",
            projects_title: "Projetos", 
            contact_title: "Próximo Passo?", contact_subtitle: "Entre em Contato", contact_desc: "Se você tem uma ideia para um SaaS, precisa de um site ou quer automatizar um processo, entre em contato!", contact_cta: "Diga Olá", 
            footer_credit: "Desenvolvido por Pedro Henrique"
        },
        fr: {
            nav_about: "À propos", nav_expertise: "Services", nav_projects: "Projets", nav_contact: "Contact",
            hero_greeting: "Bonjour, je m'appelle", 
            hero_subtitle: "Je crée des logiciels.", 
            hero_description: "Développeur spécialisé en Sites Web performants, plateformes SaaS et Automatisation Python.", 
            hero_cta: "Voir Projets", hero_cv: "CV",
            about_title: "À Propos", 
            about_p1: "Bonjour! Je suis Pedro, un développeur passionné par la création de produits numériques. J'aime créer des systèmes qui fonctionnent parfaitement.", 
            about_p2: "J'aide les entreprises avec des solutions complètes : sites qui convertissent, applications SaaS et automatisations backend.", 
            about_p3: "Voici quelques technologies que j'utilise :",
            expertise_title: "Expertise", 
            expertise_card1_title: "Sites & SaaS", expertise_card1_desc: "Construction de sites web modernes et plateformes SaaS évolutives adaptées à votre entreprise.", 
            expertise_card2_title: "Automatisation Python", expertise_card2_desc: "Création de bots et de scripts puissants pour automatiser les tâches ennuyeuses et les flux de travail complexes.", 
            expertise_card3_title: "Développement API", expertise_card3_desc: "Développement d'API RESTful robustes pour connecter vos systèmes.",
            projects_title: "Projets", 
            contact_title: "Et Maintenant?", contact_subtitle: "Contactez-moi", contact_desc: "Vous avez une idée de SaaS, besoin d'un site ou d'automatisation ? Ma boîte est ouverte !", contact_cta: "Bonjour", 
            footer_credit: "Conçu par Pedro Henrique"
        }
    };

    const setLanguage = (lang) => {
        // Atualiza textos
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                elem.textContent = translations[lang][key];
            }
        });

        // Salva preferência e atualiza estado visual
        localStorage.setItem('language', lang);
        document.querySelectorAll('.lang-option').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    };

    // Listeners para os botões de idioma
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            if (lang) setLanguage(lang);
        });
    });


    /* ==========================================================================
       5. MENU MOBILE & INTERFACE
       ========================================================================== */
    
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.getElementById('primary-navigation');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            const isVisible = nav.getAttribute('data-visible') === 'true';
            nav.setAttribute('data-visible', !isVisible);
            navToggle.setAttribute('aria-expanded', !isVisible);
        });

        // Fecha o menu ao clicar em um link
        nav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                nav.setAttribute('data-visible', false);
                navToggle.setAttribute('aria-expanded', false);
            }
        });
    }


    /* ==========================================================================
       6. PARTÍCULAS (BACKGROUND HERO)
       ========================================================================== */
    
    // Configuração leve apenas para a seção Hero
    const initParticles = () => {
        if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
            particlesJS("particles-js", {
                particles: {
                    number: { value: 50, density: { enable: true, value_area: 800 } },
                    color: { value: "#64FFDA" }, /* Cor Destaque */
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#64FFDA",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "grab" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 200, line_linked: { opacity: 0.6 } },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
        }
    };


    /* ==========================================================================
       7. INICIALIZAÇÃO
       ========================================================================== */
    
    // 1. Define idioma (padrão: EN)
    setLanguage('en');
    
    // 2. Inicia partículas
    initParticles();
    
    // 3. Busca projetos
    fetchGitHubProjects();

});