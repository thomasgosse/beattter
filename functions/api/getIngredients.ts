import { NowRequest, NowResponse } from '@vercel/node';
import { Db } from 'mongodb';
import { connectToDatabase } from '../services/mongo';
import { getDatas } from '../services/cache';

type Query = { nPerPage?: number; pageNumber?: number; version?: number };
export type Ingredient = {
  name: string;
  slug: string;
  kind:
    | 'meat'
    | 'vegetable'
    | 'dairy'
    | 'alcool-drink'
    | 'non-alcool-drink'
    | 'oil'
    | 'other'
    | 'egg'
    | 'fish'
    | 'sauce-spice-seasoning'
    | 'starchy'
    | 'sweet-fat-product'
    | 'food-additive';
  months?: number[];
  nonVegetal?: string;
};

type GetIngredientsArgs = {
  db: Db;
  pageNumber: number;
  nPerPage: number;
  version: number;
};

async function getIngredients(args: GetIngredientsArgs): Promise<Ingredient[]> {
  const { db, pageNumber, nPerPage, version } = args;

  let query = {};
  if (version > 1) {
    query = { version };
  }

  return db
    .collection('ingredients')
    .find(query)
    .project({ _id: 0, version: 0 })
    .sort({ slug: 1 })
    .skip(pageNumber * nPerPage)
    .limit(nPerPage)
    .toArray();
}

export default async (request: NowRequest, response: NowResponse): Promise<void> => {
  let { nPerPage = 100, pageNumber = 0, version = 1 }: Query = request.query;
  nPerPage = Number(nPerPage);
  pageNumber = Number(pageNumber);
  version = Number(version);
  const db = await connectToDatabase(process.env.MONGODB_URI);

  const key = `${pageNumber}_${nPerPage}_v_${version}`;
  const ingredients = await getDatas<GetIngredientsArgs, Ingredient>(key, getIngredients, {
    db,
    pageNumber,
    nPerPage,
    version,
  });
  response.status(200).json(ingredients);
};
