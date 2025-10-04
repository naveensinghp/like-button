import { random, range } from 'lodash';
import './reset.css';
import './styles.css';

const btn = document.querySelector('.particleButton');

btn.addEventListener('click', () => {
  btn.classList.toggle('liked');

  const isLiked = btn.classList.contains('liked');
  
  // Bail out early if the user is *undoing* their like.
  // No particles in this case.
  if (!isLiked) {
    return;
  }


  range(5).forEach(() => {
    const particle = document.createElement('span');
    particle.classList.add('particle');

    particle.style.top = random(0,100) + '%';
    particle.style.left = random(0,100) + '%';

    btn.appendChild(particle);
  })


  // range(5).forEach(() => {
  //   const particle = document.createElement('span');
  //   particle.classList.add('particle');

  //   particle.style.top = random(0, 100) + '%';
  //   particle.style.left = random(0, 100) + '%';

  //   btn.appendChild(particle);
  // });
});