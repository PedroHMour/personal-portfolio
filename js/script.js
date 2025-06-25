'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const translations = {
        en: {
            menu: "Menu", nav_about: "About", nav_expertise: "Expertise", nav_projects: "Projects", nav_contact: "Contact",
            hero_greeting: "Hi, my name is", hero_subtitle: "I build things with Python.", hero_description: "I'm a Python developer specializing in automation, APIs, and data solutions to drive your business forward.", hero_cta: "Check out my projects", hero_cv: "Download CV",
            about_title: "About Me", about_p1: "Hello! I'm Pedro, a Python developer passionate about creating solutions that make processes more efficient. My interest in automation started when I realized how much time could be saved by scripting repetitive tasks.", about_p2: "Today, I help businesses by developing custom scripts for web scraping, automating workflows, and integrating with APIs. I'm always eager to learn new technologies and solve challenging problems.", about_p3: "Here are a few technologies I’ve been working with recently:",
            expertise_title: "Expertise", expertise_card1_title: "Process Automation", expertise_card1_desc: "Automating repetitive tasks, from filling out forms and generating reports to managing files, saving time and reducing errors.", expertise_card2_title: "Web Scraping & Data Extraction", expertise_card2_desc: "Developing robust scripts to extract valuable data from websites for market analysis, lead generation, or price monitoring.", expertise_card3_title: "API Development & Integration", expertise_card3_desc: "Building and connecting to APIs to make different systems 'talk' to each other, centralizing data and creating seamless workflows.",
            projects_title: "Projects",
            contact_title: "What's Next?", contact_subtitle: "Get In Touch", contact_desc: "I'm currently open to new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I’ll get back to you!", contact_cta: "Say Hello",
            footer_credit: "Designed & Built by Pedro Henrique", footer_rights: "All rights reserved.",
        },
        pt: {
            menu: "Menu", nav_about: "Sobre", nav_expertise: "Serviços", nav_projects: "Projetos", nav_contact: "Contato",
            hero_greeting: "Olá, meu nome é", hero_subtitle: "Eu construo coisas com Python.", hero_description: "Sou um desenvolvedor Python especialista em automação, APIs e soluções de dados para impulsionar o seu negócio.", hero_cta: "Veja meus projetos", hero_cv: "Baixar CV",
            about_title: "Sobre Mim", about_p1: "Olá! Sou Pedro, um desenvolvedor Python apaixonado por criar soluções que tornam processos mais eficientes. Meu interesse por automação começou quando percebi o quanto tempo poderia ser poupado ao programar tarefas repetitivas.", about_p2: "Hoje, ajudo empresas desenvolvendo scripts personalizados para web scraping, automação de fluxos de trabalho e integração com APIs. Estou sempre ansioso para aprender novas tecnologias e resolver problemas desafiadores.", about_p3: "Aqui estão algumas tecnologias com as quais tenho trabalhado recentemente:",
            expertise_title: "Serviços", expertise_card1_title: "Automação de Processos", expertise_card1_desc: "Automatizando tarefas repetitivas, desde o preenchimento de formulários e geração de relatórios até o gerenciamento de arquivos, economizando tempo e reduzindo erros.", expertise_card2_title: "Web Scraping & Extração de Dados", expertise_card2_desc: "Desenvolvendo scripts robustos para extrair dados valiosos de websites para análise de mercado, geração de leads ou monitoramento de preços.", expertise_card3_title: "Desenvolvimento & Integração de APIs", expertise_card3_desc: "Construindo e conectando a APIs para fazer diferentes sistemas 'conversarem' entre si, centralizando dados e criando fluxos de trabalho contínuos.",
            projects_title: "Projetos",
            contact_title: "Qual o Próximo Passo?", contact_subtitle: "Entre em Contato", contact_desc: "Estou aberto a novas oportunidades e minha caixa de entrada está sempre aberta. Se você tem uma pergunta ou apenas quer dizer oi, eu retornarei o contato!", contact_cta: "Diga Olá",
            footer_credit: "Projetado & Construído por Pedro Henrique", footer_rights: "Todos os direitos reservados.",
        },
        fr: {
            menu: "Menu", nav_about: "À propos", nav_expertise: "Expertise", nav_projects: "Projets", nav_contact: "Contact",
            hero_greeting: "Bonjour, je m'appelle", hero_subtitle: "Je construis des choses avec Python.", hero_description: "Je suis un développeur Python spécialisé dans l'automatisation, les API et les solutions de données pour faire avancer votre entreprise.", hero_cta: "Découvrez mes projets", hero_cv: "Télécharger CV",
            about_title: "À Propos de Moi", about_p1: "Bonjour! Je suis Pedro, un développeur Python passionné par la création de solutions qui rendent les processus plus efficaces. Mon intérêt pour l'automatisation a commencé lorsque j'ai réalisé combien de temps pouvait être économisé en programmant des tâches répétitives.", about_p2: "Aujourd'hui, j'aide les entreprises en développant des scripts personnalisés pour le web scraping, l'automatisation des flux de travail et l'intégration avec des API. Je suis toujours désireux d'apprendre de nouvelles technologies et de résoudre des problèmes complexes.", about_p3: "Voici quelques technologies avec lesquelles j'ai travaillé récemment :",
            expertise_title: "Expertise", expertise_card1_title: "Automatisation des Processus", expertise_card1_desc: "Automatiser les tâches répétitives, du remplissage de formulaires à la gestion de fichiers, en passant par la génération de rapports, pour gagner du temps et réduire les erreurs.", expertise_card2_title: "Web Scraping & Extraction de Données", expertise_card2_desc: "Développer des scripts robustes pour extraire des données précieuses de sites web pour l'analyse de marché, la génération de prospects ou la surveillance des prix.", expertise_card3_title: "Développement & Intégration d'API", expertise_card3_desc: "Construire et connecter des API pour que différents systèmes 'communiquent' entre eux, centralisant les données et créant des flux de travail transparents.",
            projects_title: "Projets",
            contact_title: "Et Maintenant?", contact_subtitle: "Contactez-moi", contact_desc: "Je suis actuellement ouvert à de nouvelles opportunités et ma boîte de réception est toujours ouverte. Que vous ayez une question ou que vous vouliez simplement dire bonjour, je vous répondrai!", contact_cta: "Dites Bonjour",
            footer_credit: "Conçu & Réalisé par Pedro Henrique", footer_rights: "Tous droits réservés.",
        }
    };
    
    // --- FUNÇÃO PARA PEGAR PROJETOS DO GITHUB ---
    const fetchGitHubProjects = async () => {
        const username = 'PedroHMour'; // Seu usuário do GitHub
        const projectsGrid = document.getElementById('projects-grid');
        
        if (!projectsGrid) return; // Se o elemento não existir, para a execução
        
        const url = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`;

        // Cores para linguagens de programação
        const languageColors = {
            'Python': '#3572A5',
            'JavaScript': '#f1e05a',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Jupyter Notebook': '#DA5B0B',
            'TypeScript': '#2b7489',
            'Shell': '#89e051',
            'Dockerfile': '#384d54'
        };

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const repos = await response.json();

            // Limpa o grid antes de adicionar novos projetos
            projectsGrid.innerHTML = '';

            repos.forEach(repo => {
                if (repo.fork) {
                    return; // Pula repositórios que são fork
                }
                
                const langColor = languageColors[repo.language] || '#CCD6F6'; // Cor padrão

                const card = document.createElement('div');
                card.className = 'project-card';

                card.innerHTML = `
                    <div class="project-card-header">
                        <div class="project-folder-icon">
                            <i class="far fa-folder"></i>
                        </div>
                        <div class="project-links">
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" title="GitHub Repository"><i class="fab fa-github"></i></a>
                            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
                        </div>
                    </div>
                    <div class="project-card-body">
                        <h3 class="project-title"><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name.replace(/[-_]/g, ' ')}</a></h3>
                        <p class="project-description">${repo.description || 'No description provided.'}</p>
                    </div>
                    <div class="project-card-footer">
                        <div class="project-stats">
                            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        </div>
                        ${repo.language ? `
                        <div class="project-language">
                            <span class="project-language-dot" style="background-color: ${langColor};"></span>
                            <span>${repo.language}</span>
                        </div>
                        ` : ''}
                    </div>
                `;
                projectsGrid.appendChild(card);
            });

        } catch (error) {
            projectsGrid.innerHTML = '<p>Could not fetch projects from GitHub.</p>';
            console.error('Fetch error:', error);
        }
    };
    // --- FIM DA FUNÇÃO DO GITHUB ---


    const setLanguage = (lang) => {
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (translations[lang]?.[key]) {
                elem.textContent = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });
    };
    
    const initLanguage = () => {
        const savedLang = localStorage.getItem('language');
        const browserLang = navigator.language.substring(0, 2);
        const initialLang = (savedLang && translations[savedLang]) ? savedLang : (translations[browserLang] ? browserLang : 'en');
        setLanguage(initialLang);
        document.querySelector('.language-selector').addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            if (lang) setLanguage(lang);
        });
    };

    const initParticles = () => {
        if (document.getElementById('particles-js')) {
            particlesJS("particles-js", {
                particles: { number: { value: 80, density: { enable: true, value_area: 800 } }, color: { value: "#ccd6f6" }, shape: { type: "circle" }, opacity: { value: 0.5, random: false }, size: { value: 3, random: true }, line_linked: { enable: true, distance: 150, color: "#8892b0", opacity: 0.4, width: 1 }, move: { enable: true, speed: 2, direction: "none", out_mode: "out" } },
                interactivity: { detect_on: "canvas", events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } }, modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } } },
                retina_detect: true
            });
        }
    };
    
    const setupMobileMenu = () => {
        const nav = document.getElementById('primary-navigation');
        const toggle = document.querySelector('.mobile-nav-toggle');
        if (nav && toggle) {
            toggle.addEventListener('click', () => {
                const isVisible = nav.getAttribute('data-visible') === 'true';
                nav.setAttribute('data-visible', !isVisible);
                toggle.setAttribute('aria-expanded', !isVisible);
            });
            nav.addEventListener('click', (e) => {
                if (e.target.matches('a')) {
                    nav.setAttribute('data-visible', false);
                    toggle.setAttribute('aria-expanded', false);
                }
            });
        }
    };

    const updateFooterYear = () => {
        const el = document.getElementById('currentYear');
        if (el) el.textContent = new Date().getFullYear();
    };

    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.length > 1) {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    };

    const handleHeaderScroll = () => {
        const header = document.getElementById('header');
        if (!header) return;
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    };

    // Inicializa todas as funções
    initLanguage();
    initParticles();
    fetchGitHubProjects(); // Chama a nova função para buscar os projetos
    setupMobileMenu();
    updateFooterYear();
    setupSmoothScroll();
    handleHeaderScroll();
});