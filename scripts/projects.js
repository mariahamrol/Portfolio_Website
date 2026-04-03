const PROJECTS = [
    {
        id: 'ropeSync',
        field: 'Embedded Systems',
        state: 'In Progress',
        title: 'RopeSync',
        short: 'Project completed on ESP32, measuring climber parameters and sending data wirelessly between devices. ',
        description: 'Development of a climber monitoring system using ESP32. The system measures various climber parameters such as tension on rope, body position, height, and sends the data wirelessly between devices.The project also involves creating a mobile app to display the data and creating an environment for users of the device. Project is completed in simple version, now it is being expanded for engineering thesis.',
        tech: ['C++', 'ESP32', 'I2C', 'SPI', 'UART', 'Wireless Communication'],
        image: 'https://i.pinimg.com/1200x/5d/77/ef/5d77ef0bffe5f0181fb5d383b2a7946b.jpg',
        github: 'https://github.com/mariahamrol/RopeSync'
    },
    {
        id: 'database',
        field: 'Database Systems',
        state: 'Completed',
        title: 'Climbing Topo',
        short: 'Internet application development with a focus on database design and optimization.',
        description: 'Design and implementation of a climbing route database application. Involved creating an efficient relational database schema, writing SQL queries for data retrieval and manipulation. In addition, developed a web interface using HTML, CSS, and using fastAPi to serve data and handle user interactions. Docker was used for containerization and deployment of the database.',
        tech: ['SQL', 'ER Diagrams', 'DDL','HTML', 'CSS', 'Docker','Oracle'],
        image: 'https://i.pinimg.com/736x/2f/95/9f/2f959fb7759fd03cbff5f0085dd25907.jpg',
        github: 'https://github.com/mariahamrol/climbing_topo'
    },
    {
        id: 'networks',
        field: 'Computer Networks',
        state: 'Completed',
        title: 'Wisielec Game',
        short: 'Wisielec game, mostly focused on implementing socket-level communication and network design.',
        description: 'Networked implementation of the classic Hangman game. The project involved designing a client-server architecture where the server manages game state and multiple clients can connect to play. Implemented using C++ and Qt for the client interface, and TCP/IP sockets for communication. The server handles multiple clients concurrently, allowing for multiplayer gameplay. Additionally, an admin function was implemented to monitor the state of every game.',
        tech: ['C++','Qt','TCP/IP','Sockets'],
        image: 'https://i.pinimg.com/736x/2f/95/9f/2f959fb7759fd03cbff5f0085dd25907.jpg',
        github: 'https://github.com/mariahamrol/ComputerNetworks_WisielecGame'
    },
    {
        id: 'webApp',
        field: 'Web Development',
        state: 'In Progress',
        title: 'Personal Portfolio Website',
        short: 'Personal portfolio website built with HTML, CSS and Javascript.',
        description: 'Development of a personal website to showcase my projects and skills. The website is built using HTML, CSS and Javascript. Projects main focus was to learn use of technologies such as Docker, Nginx and basic networking concepts',
        tech: ['HTML','CSS','JavaScript','Docker','Nginx'],
        image: 'https://i.pinimg.com/736x/2f/95/9f/2f959fb7759fd03cbff5f0085dd25907.jpg'
    }
];

function openProject(id) {
    const project = PROJECTS.find(p => p.id === id);
    if (!project) return;

    document.getElementById('proj-modal-title').textContent = project.title;
    document.getElementById('proj-modal-img').src = project.image;
    document.getElementById('proj-modal-img').alt = project.title;
    document.getElementById('proj-modal-desc').textContent = project.description;

    const techEl = document.getElementById('proj-modal-tech');
    techEl.innerHTML = project.tech
        .map(t => `<span class="tech-tag">${t}</span>`)
        .join('');

    const linkEl = document.getElementById('proj-modal-link');
    linkEl.href = project.github || '#';
    linkEl.style.display = project.github ? '' : 'none';

    const modal = document.getElementById('project-modal');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projects-grid');
    if (grid) {
        PROJECTS.forEach(project => {
            const card = document.createElement('div');
            card.className = 'proj-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.innerHTML = `
                <img class="proj-img" src="${project.image}" alt="${project.title}">
                <div class="proj-card-body">
                    <h3 class="proj-card-title">${project.title}</h3>
                    <p class="proj-card-short">${project.short}</p>
                    <div class="proj-tags">${project.tech.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
                </div>
            `;
            card.addEventListener('click', () => openProject(project.id));
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProject(project.id);
                }
            });
            grid.appendChild(card);
        });
    }

    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeProject();
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeProject();
    });
});
