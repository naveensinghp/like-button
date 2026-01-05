import { random, range } from 'lodash';
import './reset.css';
import './styles.css';

const btn = document.querySelector('.particleButton');

// Our "Source of Truth" for animation's fade duration
// This ensures the cleanup timeout will never fire 
// before the animation has completed 
const FADE_DURATION = 1000;
const MAGNITUDE = 50;



btn.addEventListener('click', () => {
  btn.classList.toggle('liked');

  const isLiked = btn.classList.contains('liked');
  
  // Bail out early if the user is *undoing* their like.
  // No particles in this case.
  if (!isLiked) {
    return;
  }


  // We Will Collect Freshly Created Particle in this array:
  const particles = [];
  range(10).forEach(() => {
    const particle = document.createElement('span');
    particle.classList.add('particle');

//    particle.style.top = random(0,100) + '%';
//    particle.style.left = random(0,100) + '%';
  
    // const x = random(-MAGNITUDE,MAGNITUDE);
    // const y = random(-MAGNITUDE, MAGNITUDE);

    particle.style.transform = `translate(${x}px, ${y}px)`;
    
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