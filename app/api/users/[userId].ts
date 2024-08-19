import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'database', 'users.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  
  if (typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  if (req.method === 'GET') {
    try {
      const data = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
      const user = data.find((user: any) => user.id === userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error reading data' });
    }
  } else if (req.method === 'PUT') {
    try {
      const data = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
      const index = data.findIndex((user: any) => user.id === userId);
      
      if (index !== -1) {
        data[index] = { ...data[index], ...req.body };
        fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
        res.status(200).json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
