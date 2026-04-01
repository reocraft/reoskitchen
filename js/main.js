function toggleRecipeDetails(btn) {
  const card = btn.closest('.recipe-card');
  const details = card.querySelector('.recipe-card-details');
  const isOpen = details.classList.contains('visible');
  details.classList.toggle('visible', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.querySelector('.label').textContent = isOpen ? btn.dataset.label : 'Hide';
}

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
