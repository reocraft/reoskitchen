function loadProjects() {
  const grid = document.getElementById('projects-grid');

  const projects = [
  {
    "id": 1,
    "title": "CollegeMiner",
    "description": "A personalized assistant for high school students that help find Universities/Colleges that are best tailored for a given individual. (It may take a minute for the website to launch)",
    "tech": [],
    "image": "images/collegeminer.png",
    "link": "https://collegeminer.onrender.com/",
    "github": "https://github.com/reocraft/collegeminer",
    "featured": true
  },
  {
    "id": 2,
    "title": "GrinZip",
    "description": "A file compression/decompression utility using Huffman coding to encode files into a custom .grin format and decode them back to their original state. Built as a CSC 207 project at Grinnell College.",
    "tech": ["Java", "Huffman Coding", "Maven"],
    "github": "https://github.com/reocraft/GrinZip",
    "featured": false
  }
];

    grid.innerHTML = projects.map((p, i) => {
      const imgHtml = p.image
        ? `<img src="${p.image}" alt="${p.title}" class="p-card-img" />`
        : `<div class="p-card-img-placeholder">
             <span class="img-icon">🖼️</span>
             <span>project screenshot / demo gif</span>
           </div>`;

      return `
        <a class="p-card" href="${p.github}" target="_blank" rel="noopener">
          ${imgHtml}
          <div class="p-card-num">project_${String(i + 1).padStart(2, '0')}</div>
          <div class="p-card-title">${p.title}</div>
          <div class="p-card-desc">${p.description}</div>
          <div class="p-card-tech">
            ${p.tech.map(t => `<span class="p-tech-badge">${t}</span>`).join('')}
          </div>
          <div class="p-card-footer">
            <div class="p-card-github">View on GitHub</div>
            ${p.featured ? '<span class="p-featured-badge">featured</span>' : ''}
          </div>
        </a>
      `;
    }).join('');
}

loadProjects();
