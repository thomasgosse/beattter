import { NowRequest, NowResponse } from '@vercel/node';

export default (request: NowRequest, response: NowResponse): void => {
  response.status(200).json({ version: '1' });
};
