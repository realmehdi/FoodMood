import view from './view.js';

class BookmarksView extends view {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkupPreview(result) {
    const id = +window.location.hash.slice(1);
    return `
          <li class="preview">
            <a
              class="preview__link ${
                result.id === id ? 'preview__link--active' : ''
              }"
              href="#${result.id}"
            >
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">
                  ${result.title}
                </h4>
              </div>
            </a>
          </li>
        `;
  }
}
export default new BookmarksView();
