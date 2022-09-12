import View from './view.js';

class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = 'we could not find that recipe. please try another one!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      console.log(btn);

      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
      console.log(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
        <figure class="recipe__fig">
          <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <!-- RECIPE DETAILS -->
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="./src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.readyInMinutes
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>

          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="./src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <button class="btn--nutrition">
          <span>Nutrition</span>
            <svg>
              <use href="./src/img/icons.svg#icon-trending-up"></use>
            </svg>
          </button>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="./src/img/icons.svg#icon-bookmark${
                this._data.bookmarked ? '-fill' : ''
              }"></use>
            </svg>
          </button>
        </div>

        <!-- RECIPE-INGREDIENTS -->
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredients-list">
          ${this._data.ingredients
            .map(this._generateMarkupIngeridient)
            .join('')}
          </ul>
        </div>

        <!-- RECIPE DIRECTION -->
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher ? this._data.publisher : 'Cool chef'
            }</span>. Please
            check out directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>

        <!-- SIMILAR RECIPES -->
        <div class="recipe__similar">
           <h2 class="heading--2">Similar Recipes</h2>
           <ul class="similar__list">
           </ul>
        </div>
      `;
  }

  _generateMarkupIngeridient(ing) {
    return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="src/img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.amount.toFixed(2)}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
            `;
  }

  renderSimilars(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;

    const similarsParent = document.querySelector('.similar__list');
    const markup = data.map(this._generateMarkupSimilarPreview).join('');
    similarsParent.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkupSimilarPreview(result) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
          </div>
        </a>
      </li>
        `;
  }
}
export default new RecipeView();
