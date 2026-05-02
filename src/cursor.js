import './styles.css';
import './reset.css';
import { getDistanceBetweenPoints, clampedNormalize } from './utils';

const socket = document.querySelector('.socket');
const ball = document.querySelector('.ball');

window.addEventListener('pointermove', (event) => {
  // Grab the cursor’s X/Y position from the
  // `event` object:
  const cursorPoint = {
    x : event.clientX,
    y : event.clientY
  }

  // Grab the element’s center position by
  // generating a bounding box, and calculating
  // the center point:
  const boundingBox = socket.getBoundingClientRect();
  // const centerX =
  //   boundingBox.left + boundingBox.width / 2;
  // const centerY =
  //   boundingBox.top + boundingBox.height / 2;

  const centerPoint = {
    x : boundingBox.left + boundingBox.width / 2,
    y : boundingBox.top + boundingBox.height / 2,
  }

  // Calculate the lengths of our hypothetical
  // triangle, A and B, by getting the
  // difference between the cursor point and
  // the element’s center point:
 
  // Calculate the distance using the
  // Pythagorean theorem:
  const distance =
    getDistanceBetweenPoints(
      cursorPoint,
      centerPoint
    );

  // Map the `distance` value onto a scale from
  // 1 to 0, and apply it as an inline style:
  ball.style.scale =
    clampedNormalize(distance, 10, 100, 1, 0);
});