import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@wix/sdk';
import { currentCart } from '@wix/ecom';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<currentCart.Cart | string>
) {
  const apiKey = req.headers.authorization as string;
  const client = createClient({
    modules: { currentCart },
    headers: { Authorization: apiKey },
  });
  const cart = await client.currentCart.getCurrentCart();
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).send('Error getting cart');
  }
}
