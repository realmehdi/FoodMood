import View from './view.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        curPage + 1
      }" style="margin-left:auto;">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
    // other pages
    if (curPage < numPages) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          curPage - 1
        }">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next" data-goto="${
          curPage + 1
        }">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
             <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
    // last page
    if (curPage === numPages && curPage > 1) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          curPage - 1
        }">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
            `;
    }
    // page 1, and there are no other pages
    return '';
  }
}
export default new PaginationView();
