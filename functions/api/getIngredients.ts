import { NowRequest, NowResponse } from '@vercel/node';
import { Db } from 'mongodb';
import { connectToDatabase } from '../services/mongo';
import { getDatas } from '../services/cache';

type Query = { nPerPage?: number; pageNumber?: number };
export type Ingredient = {
  _id: string;
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
};

async function getIngredients(args: GetIngredientsArgs): Promise<Ingredient[]> {
  const { db, pageNumber, nPerPage } = args;
  return db
    .collection('ingredients')
    .find()
    .sort({ name: 1 })
    .skip(pageNumber * nPerPage)
    .limit(nPerPage)
    .toArray();
}

export default async (request: NowRequest, response: NowResponse): Promise<void> => {
  let { nPerPage = 100, pageNumber = 1 }: Query = request.query;
  nPerPage = Number(nPerPage);
  pageNumber = Number(pageNumber);
  const db = await connectToDatabase(process.env.MONGODB_URI);

  const key = `${pageNumber}_${nPerPage}`;
  const ingredients = await getDatas<GetIngredientsArgs, Ingredient>(key, getIngredients, {
    db,
    pageNumber,
    nPerPage,
  });
  response.status(200).json(ingredients);
};
