import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import nutritionView from './views/nutritionView.js';
import paginationView from './views/paginationView.js';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // load recipe
    await model.loadRecipe(id);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlNutrition = function () {
  // render spinner
  nutritionView.renderSpinner();

  nutritionView.render(model.state.nutrition);
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // geting query
    const query = searchView.getQuery();
    if (!query) return;

    // loading results
    await model.loadSearchResults(query);

    model.getSearchResultsPage();

    // render results
    resultsView.render(model.getSearchResultsPage());

    // render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    resultsView.renderError();
  }
};

const controlServings = function (updateTo) {
  model.updateServings(updateTo);
  // recipeView.addHandlerUpdateServings(updateTo);
  recipeView.render(model.state.recipe);
};

const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  nutritionView.addHandlerNutrition(controlNutrition);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};
init();
