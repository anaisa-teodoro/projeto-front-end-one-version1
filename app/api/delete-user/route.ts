import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'database', 'users.json');

  let users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  users = users.filter((user: { id: string }) => user.id !== userId);

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

  return NextResponse.json({ message: 'User deleted successfully' });
}
