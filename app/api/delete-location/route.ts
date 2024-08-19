import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request) {
  try {
    const { userId, locationIndex } = await request.json();
    const dataFilePath = path.join(process.cwd(), 'database', 'users.json');
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

    const user = data.find((user: any) => user.id === userId);
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    if (user.locations.length <= locationIndex) {
      return NextResponse.json({ error: 'Localização não encontrada' }, { status: 404 });
    }

    user.locations.splice(locationIndex, 1);

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: 'Localização excluída com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir localização:', error);
    return NextResponse.json({ error: 'Erro ao excluir localização' }, { status: 500 });
  }
}
