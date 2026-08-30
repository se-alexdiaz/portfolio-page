const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (reduceMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
} 
else {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classlist.add('is-visible');
                observer.unobserve(entry.target);
          }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    
    revealEls.forEach(el => observer.observe(el));

}

// Offset anchor scrolling for fixed nav
const navHeight = document.querySelector('.nav').offsetHeight;
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return; 
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - (navHeight - 1);
        window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
});