import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'database', 'users.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, locationId } = req.query;

  if (typeof userId !== 'string' || typeof locationId !== 'string') {
    return res.status(400).json({ error: 'Invalid userId or locationId' });
  }

  if (req.method === 'GET') {
    try {
      const data = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
      const user = data.find((user: any) => user.id === userId);

      if (user) {
        const location = user.locations.find((loc: any) => loc.id === locationId);
        if (location) {
          res.status(200).json(location);
        } else {
          res.status(404).json({ error: 'Location not found' });
        }
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching location' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'PUT') {
    try {
      const data = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
      const user = data.find((user: any) => user.id === userId);

      if (user) {
        const index = user.locations.findIndex((loc: any) => loc.id === locationId);
        if (index !== -1) {
          user.locations[index] = { ...user.locations[index], ...req.body };
          fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
          res.status(200).json(user.locations[index]);
        } else {
          res.status(404).json({ error: 'Location not found' });
        }
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating location' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
