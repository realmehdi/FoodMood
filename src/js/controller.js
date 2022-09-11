import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import NutritionView from './views/nutritionView.js';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    RecipeView.renderSpinner();

    // load recipe
    await model.loadRecipe(id);
    console.log(model.state.recipe);

    // render recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    RecipeView.renderError();
  }
};

const controlNutrition = function () {
  // render spinner
  NutritionView.renderSpinner();

  NutritionView.render(model.state.nutrition);
};

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    // geting query
    const query = SearchView.getQuery();
    if (!query) return;

    // loading results
    await model.loadSearchResults(query);

    // render results
    ResultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
    ResultsView.renderError();
  }
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipe);
  SearchView.addHandlerSearch(controlSearchResults);
  NutritionView.addHandlerNutrition(controlNutrition);
};
init();
