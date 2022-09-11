import View from './view.js';

class NutritionView extends View {
  _parentEl = document.querySelector('.nutrition-window');
  _btnNutritionParent = document.querySelector('.recipe');
  _errorMessage = 'Nutriton not found for this recipe :(';

  _generateMarkup() {
    return `
    <button class="btn--close-modal">&times;</button>
    ${this._data[0]}
    `;
  }

  addHandlerNutrition(handler) {
    const overlay = document.querySelector('.overlay');
    const window = document.querySelector('.nutrition-window');

    const toggleWindow = function () {
      overlay.classList.toggle('hidden');
      window.classList.toggle('hidden');
    };

    this._btnNutritionParent.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--nutrition');
      if (!btn) return;
      toggleWindow();
      handler();
    });

    window.addEventListener('click', function (e) {
      const btn = e.target.classList.contains('btn--close-modal');
      if (!btn) return;
      toggleWindow();
    });

    overlay.addEventListener('click', toggleWindow);
  }
}

export default new NutritionView();
