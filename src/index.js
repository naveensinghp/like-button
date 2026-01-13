import { random, range } from 'lodash';
import './reset.css';
import './styles.css';

const btn = document.querySelector('.particleButton');

// Our "Source of Truth" for animation's fade duration
// This ensures the cleanup timeout will never fire 
// before the animation has completed 
const FADE_DURATION = 1000;
const NUM_OF_PARTICLES = 5;
const MAGNITUDE = 50;

// JITTER is the amount of variance allowed for each angle

// Tweak this value to control how orderly / chaotic the animation appears
const JITTER = 40;



btn.addEventListener('click', () => {
  btn.classList.toggle('liked');

  const isLiked = btn.classList.contains('liked');

  if (!isLiked) {
    return;
  }


  // We Will Collect Freshly Created Particle in this array:
  const particles = [];
  range(NUM_OF_PARTICLES).forEach((index) => {
    const particle = document.createElement('span');
    particle.classList.add('particle');

    // Divide the 360 filled into equally-sliced wedges, 
    // and grab N wedges, where N is the particle's index.
    const angle = (360 / NUM_OF_PARTICLES) * index * random(-JITTER,JITTER);
    const distance = random(32,64);

    particle.style.setProperty('--angle', angle + 'deg');
    particle.style.setProperty('--distance', distance + 'px');

   
    
    particle.style.setProperty(
      '--fade-duration',
      FADE_DURATION + 'ms'
    );

    btn.appendChild(particle);
    // Keep Track of this particle, So that it can be cleaned up
    particles.push(particle);
  })

  // Scheduled Timeout that will destroy freshly-created
  window.setTimeout(() => {
    particles.forEach((particle) => {
      particle.remove();
    });
  },FADE_DURATION  + 200)

});

const convertPolarToCartesian = (angle,distance) => {
  const angleInRadians = convertDegreeToRadian(angle);
  const x = Math.cos(angleInRadians) * distance;
  const y = Math.sin(angleInRadians) * distance;
  return [x,y];
}

const convertDegreeToRadian = (angle) => (angle * Math.PI) / 100;