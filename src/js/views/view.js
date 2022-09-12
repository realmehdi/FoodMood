export default class view {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    this._clear();
    const markup = this._generateMarkup();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // update change text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // update change attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
              <span></span>
              <p>Loading...</p>
          </div>
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(errorMessage = this._errorMessage) {
    const markup = `
            <div class="error">
              <div>
                <svg>
                  <use href="src/img/icons.svg#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${errorMessage}</p>
            </div>
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
            <div class="message">
              <div>
                <svg>
                  <use href="./src/img/icons.svg#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
