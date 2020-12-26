export function updateIngredients(ingredients, ingredient) {
  if (!ingredients || ingredients.length === 0) {
    return [ingredient];
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

export function orderDescTimestamp(key, a, b) {
  var keyA = new Date(a[key]),
    keyB = new Date(b[key]);
  if (keyA < keyB) {
    return -1;
  }
  if (keyA > keyB) {
    return 1;
  }
  return 0;
}

export function isListOver(endingDay) {
  let now = new Date().setHours(0, 0, 0);
  return new Date(endingDay) < now;
}
