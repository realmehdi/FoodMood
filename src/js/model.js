import { API_URL, KEY, NUM_SEARCH_RESUALT, RES_PER_PAGE } from './config.js';
import { getJSON, getNutritionHTML } from './helpers.js';

export const state = {
  recipe: {},
  nutrition: [],
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}/information?apiKey=${KEY}`);
    console.log(data);

    const recipeNutritionData = await getNutritionHTML(
      `${API_URL}${id}/nutritionWidget?apiKey=${KEY}`
    );

    state.nutrition.push(recipeNutritionData);

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
