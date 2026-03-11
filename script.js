const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

const particlesContainer = document.getElementById('particles-js');
if (particlesContainer) {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#aaaaaa" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#aaaaaa", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } }
            }
        },
        retina_detect: true
    });
}

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        }
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;
    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.skill-card, .archive-card, .link-card, .info-item, .project-showcase, .section-title, .section-subtitle').forEach(el => {
    el.classList.add('reveal-element');
    revealObserver.observe(el);
});

document.querySelectorAll('.skills-row, .archive-grid, .links-grid').forEach(container => {
    container.querySelectorAll('.skill-card, .archive-card, .link-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

const terminal = document.querySelector('.terminal-window');
if (terminal) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = terminal.getBoundingClientRect();
            const moveX = (e.clientX - (rect.left + rect.width / 2)) / 50;
            const moveY = (e.clientY - (rect.top + rect.height / 2)) / 50;
            terminal.style.transform = `translateY(${-10 + moveY}px) rotateX(${-moveY * 0.5}deg) rotateY(${moveX * 0.5}deg)`;
        }
    });

    document.querySelector('.home-visual').addEventListener('mouseleave', () => {
        terminal.style.transform = '';
    });
}

const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');

// TEMPLATE: Update these command responses with your own info
const commands = {
    help: "Available commands: <span class='t-keyword'>about</span>, <span class='t-keyword'>skills</span>, <span class='t-keyword'>projects</span>, <span class='t-keyword'>contact</span>, <span class='t-keyword'>clear</span>",
    // TEMPLATE: Replace with your own bio
    about: "TEMPLATE: Replace with your bio. e.g. Final year CS student passionate about <span class='t-string'>Machine Learning</span>.",
    // TEMPLATE: Replace with your skills
    skills: "TEMPLATE: e.g. ['Python', 'JavaScript', 'React', 'Node.js']",
    // TEMPLATE: Replace with your featured project
    projects: "TEMPLATE: e.g. <span class='t-function'>My Project</span> — short description here.",
    // TEMPLATE: Replace with your email
    contact: "TEMPLATE: e.g. Email: <span class='t-string'>your.email@example.com</span>",
    sudo: "<span class='t-error'>Permission denied: user is not in the sudoers file. This incident will be reported.</span>",
    whoami: "visitor"
};

if (terminalInput) {
    terminalInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const input = this.value.trim().toLowerCase();

            // TEMPLATE: Replace "yourname" with your username/handle
            const historyLine = document.createElement('div');
            historyLine.className = 'terminal-line';
            historyLine.style.opacity = '1';
            historyLine.innerHTML = `<span class="t-path">visitor@yourname:~$</span> ${this.value}`;
            terminalOutput.appendChild(historyLine);

            if (input === 'clear') {
                terminalOutput.innerHTML = '';
            } else if (commands[input]) {
                const responseLine = document.createElement('div');
                responseLine.className = 'terminal-line indent';
                responseLine.style.opacity = '1';
                responseLine.innerHTML = commands[input];
                terminalOutput.appendChild(responseLine);
            } else if (input !== '') {
                const errorLine = document.createElement('div');
                errorLine.className = 'terminal-line';
                errorLine.style.opacity = '1';
                errorLine.innerHTML = `<span class="t-error">Command not found: ${input}. Type 'help' for list.</span>`;
                terminalOutput.appendChild(errorLine);
            }

            this.value = '';
            setTimeout(() => { terminalBody.scrollTop = terminalBody.scrollHeight; }, 10);
        }
    });

    terminalBody.addEventListener('click', () => terminalInput.focus());
}
