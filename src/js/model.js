import {
  API_URL,
  KEY,
  NUM_SEARCH_RESUALT,
  NUM_SIMILAR,
  RES_PER_PAGE,
} from './config.js';
import { getJSON, getNutritionHTML } from './helpers.js';

export const state = {
  recipe: {},
  nutrition: [],
  simirals: [],
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    // getting recipe information
    const data = await getJSON(`${API_URL}${id}/information?apiKey=${KEY}`);
    console.log(data);

    const ingredients = data.extendedIngredients.map(ing => {
      return {
        amount: ing.amount,
        unit: ing.unit,
        description: ing.name,
      };
    });

    state.recipe = {
      id: data.id,
      title: data.title,
      image: data.image,
      readyInMinutes: data.readyInMinutes,
      servings: data.servings,
      publisher: data.sourceName,
      sourceUrl: data.sourceUrl,
      pricePerServing: data.pricePerServing,
      ingredients,
    };

    // getting nutrition data of current recipe
    const recipeNutritionData = await getNutritionHTML(
      `${API_URL}${id}/nutritionWidget?apiKey=${KEY}`
    );

    state.nutrition.push(recipeNutritionData);

    // getting similar recipe of current recipe
    const similarRecipes = await getJSON(
      `${API_URL}${id}/similar?number=${NUM_SIMILAR}&apiKey=${KEY}`
    );
    console.log(similarRecipes);

    state.simirals = similarRecipes.map(recipe => {
      // const similarRecipeImage = `https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`;
      // console.log(similarRecipeImage);
      return {
        id: recipe.id,
        image: `https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`,
        title: recipe.title,
      };
    });
    console.log(state.simirals);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(
      `${API_URL}complexSearch?query=${query}&number=${NUM_SEARCH_RESUALT}&apiKey=${KEY}`
    );

    state.search.results = data.results.map(result => {
      return {
        id: result.id,
        image: result.image,
        title: result.title,
      };
    });

    state.search.page = 1;
    console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(
    ing => (ing.amount = (ing.amount * newServings) / state.recipe.servings)
  );
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(rec => rec.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
