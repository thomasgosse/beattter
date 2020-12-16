import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 });

function setData<T>(key: string, data: T): boolean {
  return cache.set(key, data);
}

export async function getDatas<T1, T2>(key: string, callback?: (args: T1) => Promise<T2[]>, args?: T1): Promise<T2[]> {
  let ingredients = cache.get<T2[]>(key);
  if (!ingredients) {
    ingredients = await callback(args);
    setData<T2[]>(key, ingredients);
  } else {
    console.log('was in cache !!!');
  }
  return ingredients;
}
