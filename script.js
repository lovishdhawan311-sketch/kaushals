document.addEventListener('DOMContentLoaded', () => {
  const navigation = document.querySelector('.nav');
  const setNavigationState = () => navigation.classList.toggle('nav--visible', window.scrollY > window.innerHeight * 0.82);
  window.addEventListener('scroll', setNavigationState, { passive: true });
  window.addEventListener('resize', setNavigationState);
  setNavigationState();

  const quotes = [...document.querySelectorAll('.quote')];
  let current = 0;
  const showQuote = (index) => { quotes[current].classList.remove('active'); current = (index + quotes.length) % quotes.length; quotes[current].classList.add('active'); };
  document.querySelector('.quote-next').addEventListener('click', () => showQuote(current + 1));
  document.querySelector('.quote-prev').addEventListener('click', () => showQuote(current - 1));

  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero__content > *', { y: 30, opacity: 0, duration: 1.15, stagger: 0.16, ease: 'power3.out' });
  gsap.utils.toArray('.statement__copy, .intro h2, .section-heading h2, .gallery h2, .faq h2').forEach((element) => {
    gsap.from(element, { opacity: 0.13, scrollTrigger: { trigger: element, start: 'top 83%', end: 'top 42%', scrub: true } });
  });
  gsap.utils.toArray('.process-panel').forEach((panel) => {
    const image = panel.querySelector('img');
    gsap.fromTo(image, { scale: 0.83, opacity: 0.25 }, { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: panel, start: 'top 90%', end: 'top 40%', scrub: true } });
  });
  const trustMedia = document.querySelector('.trust__media img');
  if (trustMedia) {
    gsap.fromTo(trustMedia, { scale: 0.84, opacity: 0.3 }, { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.trust__media', start: 'top 88%', end: 'bottom 45%', scrub: true } });
  }
  gsap.utils.toArray('.gallery img').forEach((image) => gsap.from(image, { y: 55, opacity: 0, duration: 1, scrollTrigger: { trigger: image, start: 'top 88%' } }));
});
