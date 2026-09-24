// Recipes come from Notion without a servings field: it only lives in the
// "Ingredients (2 persons)" heading.
export const recipeServings = (body = '') =>
  body.match(/\((\d+(?:\/\d+)?) persons\)/)?.[1].replace('/', '–')
