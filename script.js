// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if(target){
            target.scrollIntoView({
                behavior:'smooth'
            });
        }
    });
});

// Reveal Animation
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('active');
        }
    });
}, {
    threshold:0.15
});

reveals.forEach(el => revealObserver.observe(el));

// Typing Effect
const words = [
    'Photographer & Media Artist',
    'AI Creative Studio',
    'Cinematic Visual Designer',
    'VFX & Motion Creator'
];

const typingText = document.getElementById('typing-text');

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(isDeleting){
        typingText.textContent = currentWord.substring(0, charIndex--);
    }else{
        typingText.textContent = currentWord.substring(0, charIndex++);
    }

    let speed = isDeleting ? 50 : 100;

    if(!isDeleting && charIndex === currentWord.length){
        speed = 1500;
        isDeleting = true;
    }

    if(isDeleting && charIndex === 0){
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// Cursor Glow
const glow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if(window.scrollY > 50){
        navbar.style.background = 'rgba(0,0,0,0.9)';
    }else{
        navbar.style.background = 'rgba(0,0,0,0.6)';
    }
});

// Fake Contact Submit
const form = document.querySelector('.contact-form');

form.addEventListener('submit', e => {
    e.preventDefault();

    alert('메시지가 전송되었습니다 🚀');
    form.reset();
});

console.log('HealingArty upgraded version loaded.');
