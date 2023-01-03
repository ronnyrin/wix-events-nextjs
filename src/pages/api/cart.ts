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

  try {
    const cart = await client.currentCart.getCurrentCart();
    res.status(200).json(cart);
  } catch (e: any) {
    res
      .status(e.details?.applicationError?.code)
      .send(e.details?.applicationError.description);
  }
}
