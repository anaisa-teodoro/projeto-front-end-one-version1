import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'database', 'users.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  if (req.method === 'POST') {
    try {
      const data = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
      const user = data.find((user: any) => user.id === userId);

      if (user) {
        user.locations.push(req.body);
        fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
        res.status(201).json({ message: 'Location added successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error adding location' });
    }
  } else if (req.method === 'GET') {
    try {
      const { locationId } = req.query;
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
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
