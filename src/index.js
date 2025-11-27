import './css/style.css';
import CardValidatorWidget from './js/CardValidatorWidget';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const widget = new CardValidatorWidget(app);
  widget.bindToDOM();
});
