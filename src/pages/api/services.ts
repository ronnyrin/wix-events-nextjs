// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServices, GetServicesResponse } from '@model/service/service-api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetServicesResponse | string>
) {
  const { query } = req.body;
  const apiKey = req.headers.authorization as string;
  const siteId = req.headers['wix-site-id'] as string;
  if (!apiKey || !siteId) {
    res.status(403).send('Error missing security headers');
  } else if (req.method === 'POST') {
    getServices(query, { apiKey, siteId })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((e) => {
        console.error(e);
        res.status(500).send(e);
      });
  } else {
    res.status(501).send('Method not implemented');
  }
}
