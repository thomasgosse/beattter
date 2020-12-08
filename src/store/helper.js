export function updateIngredients(ingredients, ingredient) {
  if (!ingredients || ingredients.length === 0) {
    return [];
  }

  let ingrIndex = ingredients.findIndex(
    (i) => i.slug === ingredient.slug && i.quantity.unit === ingredient.quantity.unit
  );
  if (ingrIndex > -1) {
    ingredients[ingrIndex].quantity.value =
      Number(ingredients[ingrIndex].quantity.value) + Number(ingredient.quantity.value);
  } else {
    ingredients.push(ingredient);
  }
  return ingredients;
}
