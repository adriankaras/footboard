import './style.css';
import './components/index.js';

document.querySelector('#app').innerHTML = `
  <div>
    <p-button>Test</p-button>
    <p-button id="test2">Test 2</p-button>
    <p-button disabled>Test 3</p-button>
  </div>
`;

document.getElementById('test2').addEventListener('custom-click', (event) => console.log('log event', event));
