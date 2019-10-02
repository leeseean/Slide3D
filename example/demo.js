import Slide3D from '../src/index';
import './style.css';

const innerDom = `
  <div class="slide-item" index="1">1</div>
  <div class="slide-item" index="2">2</div>
  <div class="slide-item" index="3">3</div>
`;

new Slide3D("#app", innerDom);