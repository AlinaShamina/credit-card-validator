import luhnCheck from './luhn';
import detectPaymentSystem from './detectPaymentSystem';

import visa from '../img/visa.png';
import mastercard from '../img/mastercard.png';
import mir from '../img/mir.png';
import amex from '../img/amex.png';
import discover from '../img/discover.png';
import diners from '../img/diners.png';
import jcb from '../img/jcb.png';

export default class CardValidatorWidget {
  constructor(parent) {
    this.parent = parent;
  }

  bindToDOM() {
    this.parent.innerHTML = `
      <div class="card-validator">

        <div class="cards-list">
          <img src="${visa}" data-card="visa" alt="visa">
          <img src="${mastercard}" data-card="mastercard" alt="mastercard">
          <img src="${mir}" data-card="mir" alt="mir">
          <img src="${amex}" data-card="amex" alt="amex">
          <img src="${discover}" data-card="discover" alt="discover">
          <img src="${diners}" data-card="diners" alt="diners">
          <img src="${jcb}" data-card="jcb" alt="jcb">
        </div>

        <input class="card-input" placeholder="Введите номер карты" />
        <button class="validate-btn">Проверить</button>

        <div class="result"></div>
      </div>
    `;

    this.input = this.parent.querySelector('.card-input');
    this.button = this.parent.querySelector('.validate-btn');
    this.result = this.parent.querySelector('.result');
    this.cards = this.parent.querySelectorAll('.cards-list img');

    this.button.addEventListener('click', () => this.validate());
    this.input.addEventListener('input', () => this.highlightSystem());
  }

  highlightSystem() {
    const system = detectPaymentSystem(this.input.value);

    this.cards.forEach((el) => el.classList.remove('active'));

    if (system) {
      const img = this.parent.querySelector(`img[data-card="${system}"]`);
      if (img) img.classList.add('active');
    }
  }

  validate() {
    const value = this.input.value.trim();

    if (luhnCheck(value)) {
      this.result.textContent = 'Карта валидна ✔';
      this.result.style.color = 'green';
    } else {
      this.result.textContent = 'Карта не валидна ✘';
      this.result.style.color = 'red';
    }
  }
}
