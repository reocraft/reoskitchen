// Recipe emojis mapped by tag keywords
const recipeEmojis = {
  Italian: '🍝', Pasta: '🍝', Japanese: '🍜', Seafood: '🐟',
  Korean: '🥘', Chicken: '🍗', Baking: '🍪', Dessert: '🍪',
  Soup: '🍜', default: '🍽️'
};

function getRecipeEmoji(tags) {
  for (const tag of tags) {
    if (recipeEmojis[tag]) return recipeEmojis[tag];
  }
  return recipeEmojis.default;
}

async function loadFeaturedProject() {
  try {
    const res = await fetch('./data/projects.json');
    const projects = await res.json();
    const featured = projects.find(p => p.featured) || projects[0];

    const card = document.getElementById('featured-project');
    const projectUrl = featured.link || featured.github;
    const projectLinkLabel = featured.link ? 'Visit Website' : 'View on GitHub';
    card.href = projectUrl;

    const projectImg = featured.image
      ? `<img src="${featured.image}" alt="${featured.title}" class="card-img-tech" />`
      : `<div class="card-img-placeholder-tech">
           <span class="img-icon">🖼️</span>
           <span>project screenshot / demo gif</span>
         </div>`;

    card.innerHTML = `
      ${projectImg}
      <div class="project-card-title">${featured.title}</div>
      <div class="project-card-desc">${featured.description}</div>
      <div class="project-card-tech">
        ${featured.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
      </div>
      <div class="project-card-links">
        <div class="project-card-link">${projectLinkLabel}</div>
        ${featured.github ? `<div class="project-card-link project-card-github" onclick="event.preventDefault();event.stopPropagation();window.open('${featured.github}','_blank')">GitHub</div>` : ''}
      </div>
    `;
  } catch (err) {
    console.error('Could not load featured project:', err);
  }
}

async function loadFeaturedRecipe() {
  try {
    const res = await fetch('./data/recipes.json');
    const recipes = await res.json();
    const featured = recipes.find(r => r.featured) || recipes[0];
    const emoji = getRecipeEmoji(featured.tags);

    const card = document.getElementById('featured-recipe');

    const recipeImg = featured.image
      ? `<img src="${featured.image}" alt="${featured.title}" class="card-img-fun" />`
      : `<div class="card-img-placeholder-fun">
           <span class="img-icon">${emoji}</span>
           <span>add a photo of this dish</span>
         </div>`;

    const hasSteps = featured.steps && featured.steps.length > 0;
    const btnLabel = hasSteps ? 'Ingredients & Steps' : 'Ingredients';

    const ingredientsHtml = featured.ingredients
      .map(i => `<div class="recipe-ingredient">${i}</div>`)
      .join('');

    const stepsHtml = hasSteps
      ? `<div class="recipe-detail-label">Steps</div>
         ${featured.steps.map((s, i) => `<div class="recipe-step"><span class="recipe-step-num">${i + 1}</span>${s}</div>`).join('')}`
      : '';

    card.innerHTML = `
      ${recipeImg}
      <div class="recipe-card-header">
        <div class="recipe-card-title">${featured.title}</div>
        <div class="recipe-card-emoji">${emoji}</div>
      </div>
      <div class="recipe-card-desc">${featured.description}</div>
      <div class="recipe-card-tags">
        ${featured.tags.map(t => `<span class="recipe-tag">${t}</span>`).join('')}
      </div>
      <button class="recipe-card-expand-btn" data-label="${btnLabel}" onclick="toggleRecipeDetails(this)">
        <span class="label">${btnLabel}</span>
        <span class="arrow">▾</span>
      </button>
      <div class="recipe-card-details">
        <div class="recipe-detail-label">Ingredients</div>
        ${ingredientsHtml}
        ${stepsHtml}
      </div>
    `;
  } catch (err) {
    console.error('Could not load featured recipe:', err);
  }
}

function toggleRecipeDetails(btn) {
  const card = btn.closest('.recipe-card');
  const details = card.querySelector('.recipe-card-details');
  const isOpen = details.classList.contains('visible');
  details.classList.toggle('visible', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.querySelector('.label').textContent = isOpen ? btn.dataset.label : 'Hide';
}

loadFeaturedProject();
loadFeaturedRecipe();

// Hobby cards expand / collapse
document.querySelector('.hobby-grid').addEventListener('click', e => {
  const card = e.target.closest('.hobby-card');
  if (!card) return;
  card.classList.toggle('open');
});

// CS interest cards expand / collapse
document.querySelector('.cs-grid').addEventListener('click', e => {
  const card = e.target.closest('.cs-card');
  if (!card) return;
  card.classList.toggle('open');
});

// Intro band expand / collapse
const introBand   = document.querySelector('.intro-band');
const introToggle = document.querySelector('.intro-toggle');
const introBody   = document.querySelector('.intro-band-body');

introToggle.addEventListener('click', () => {
  const isOpen = introBand.classList.toggle('open');
  introToggle.setAttribute('aria-expanded', isOpen);
  introBody.setAttribute('aria-hidden', !isOpen);
});
