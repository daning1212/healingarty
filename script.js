'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobileViewport = window.matchMedia('(max-width: 768px)');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? '−' : '＋';
  navigation.hidden = mobileViewport.matches && !open;
}

function syncMenu() {
  setMenu(false);
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a') && mobileViewport.matches) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});

mobileViewport.addEventListener('change', syncMenu);
syncMenu();
document.querySelector('#year').textContent = String(new Date().getFullYear());

document.querySelectorAll('.featured-thumb[data-youtube-id]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
        typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;

    event.preventDefault();
    const dialog = document.createElement('dialog');
    dialog.className = 'featured-dialog';
    dialog.setAttribute('aria-label', '대표 영상 재생');

    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = '닫기 ×';
    close.autofocus = true;
    close.addEventListener('click', () => dialog.close());

    const player = document.createElement('iframe');
    player.src = `https://www.youtube-nocookie.com/embed/${link.dataset.youtubeId}?autoplay=1&playsinline=1`;
    player.title = link.getAttribute('aria-label');
    player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';

    dialog.addEventListener('close', () => {
      dialog.remove();
      link.focus();
    }, { once: true });
    dialog.append(close, player);
    document.body.append(dialog);
    dialog.showModal();
  });
});
