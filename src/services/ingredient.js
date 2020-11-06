export function isSeasonal(ingredients) {
  const month = new Date().getMonth() + 1;
  for (const ingredient of ingredients) {
    const monthIndex = ingredient.months?.indexOf(month);
    if (monthIndex === -1) {
      return false;
    }
  }
  return true;
}

export function getPrincipalKind(ingredients) {
  const isNonVegetal = (ingredient) => ['meat', 'fish'].includes(ingredient.kind) || ingredient.nonVegetal;
  const isFishOrMeat = (ingredient) => ['meat', 'fish'].includes(ingredient.kind);

  const nonVegetals = ingredients.filter(isNonVegetal);

  if (nonVegetals.length === 0) {
    return 'vegetarian';
  }

  const fishMeatCount = nonVegetals.filter(isFishOrMeat).reduce(
    (acc, item) => {
      acc[item.kind]++;
      return acc;
    },
    { meat: 0, fish: 0 }
  );

  if (fishMeatCount.meat === 0 && fishMeatCount.fish === 0) {
    return 'nonVegetal';
  }
  return fishMeatCount.meat >= fishMeatCount.fish ? 'meatBased' : 'fishBased';
}
