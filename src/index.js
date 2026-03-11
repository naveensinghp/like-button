import { random, range } from 'lodash';
import './reset.css';
import './styles.css';
import { normalize } from './constant';


const btn = document.querySelector('.particleButton');

const MIN_DISTANCE = 32;
const MAX_DISTANCE = 64;
const MIN_FADE_DURATION = 1000 - 500;
const MAX_FADE_DURATION = 1000 + 500;
const MAX_FADE_DELAY = 500;
const MAX_FADE_ADJUST = 200;
const NUM_OF_PARTICLES = 15;

/*
  In the video above, we wait 150ms before adding
  the freshly-generated particles to the DOM. This
  value was chosen since that’s how long it takes for
  the circle to grow to its full size.
  
  To avoid an implicit dependency between these two
  things, I created a new constant, PARTICLE_DELAY:
*/
const PARTICLE_DELAY = 150;

/*
  Make PARTICLE_DELAY available to CSS by setting
  it as a CSS variable on the parent button.
  
  This value will be used for the “animation-duration”
  for the main “fromShrunken” keyframe. I’ve chosen a
  more semantically-meaningful name for the CSS
  variable:
*/
btn.style.setProperty(
  '--pop-circle-duration',
  PARTICLE_DELAY + 'ms'
);

btn.addEventListener('click', () => {
  btn.classList.toggle('liked');

  const isLiked = btn.classList.contains('liked');
  if (!isLiked) {
    return;
  }

  const isMotionEnabled = window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  ).matches;
  if (!isMotionEnabled) {
    return;
  }

  const particles = [];
  range(NUM_OF_PARTICLES).forEach((index) => {
    const particle = document.createElement('span');
    particle.classList.add('particle');

    let angle = normalize(index, 0, NUM_OF_PARTICLES, 0, 360);
    angle += random(-40, 40);

    const distance = random(MIN_DISTANCE, MAX_DISTANCE);

    particle.style.setProperty('--angle', angle + 'deg');
    particle.style.setProperty('--distance', distance + 'px');

    particle.style.setProperty(
      '--fade-duration',
      normalize(
        distance,
        MIN_DISTANCE,
        MAX_DISTANCE,
        MIN_FADE_DURATION,
        MAX_FADE_DURATION
      ) +
        random(-200, 200) +
        'ms'
    );
    particle.style.setProperty(
      '--fade-delay',
      normalize(distance, MIN_DISTANCE, MAX_DISTANCE, 0, MAX_FADE_DELAY) +
        random(0, MAX_FADE_ADJUST) +
        'ms'
    );
    particle.style.setProperty(
      '--pop-duration',
      normalize(distance, MIN_DISTANCE, MAX_DISTANCE, 400, 800) +
        random(-200, 200) +
        'ms'
    );
    particle.style.setProperty(
      '--size',
      random(9, 15) + 'px'
    );
    particle.style.setProperty(
      '--twinkle-duration',
      random(150, 300) + 'ms'
    );
    particle.style.setProperty(
      '--twinkle-amount',
      random(0.325, 1, true)
    );

    particles.push(particle);
  });

  // Wait a short while before adding those particles
  // to the button, using our new PARTICLE_DELAY constant:
  window.setTimeout(() => {
    particles.forEach((particle) => {
      btn.appendChild(particle);
    });
  }, PARTICLE_DELAY);

  // Our cleanup timeout should wait for all of
  // the particles to be totally invisible. Extend
  // this time by the new PARTICLE_DELAY value.
  //
  // I pulled this expression into a variable since
  // it didn’t fit neatly on one line anymore:
  const cleanupDuration =
    MAX_FADE_DURATION +
    MAX_FADE_DELAY +
    MAX_FADE_ADJUST +
    PARTICLE_DELAY +
    200;

  window.setTimeout(
    () => {
      particles.forEach((particle) => {
        particle.remove();
      });
    },
    cleanupDuration
  );
});