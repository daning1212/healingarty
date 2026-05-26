
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll(){
    const trigger = window.innerHeight * 0.85;

    reveals.forEach(el=>{
        const top = el.getBoundingClientRect().top;

        if(top < trigger){
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

window.addEventListener('scroll', ()=>{
    const nav = document.querySelector('.navbar');

    if(window.scrollY > 50){
        nav.style.background = 'rgba(0,0,0,.75)';
    }else{
        nav.style.background = 'rgba(0,0,0,.45)';
    }
});

console.log('HealingArty loaded.');
