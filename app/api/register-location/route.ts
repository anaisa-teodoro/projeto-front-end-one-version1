import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { userId, local, estado, descricao, cep, endereco, latitude, longitude } = await request.json();
    const dataFilePath = path.join(process.cwd(), 'database', 'users.json');
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

    const user = data.find((user: { id: string }) => user.id === userId);

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const newLocation = {
      local,
      estado,
      descricao,
      cep,
      endereco,
      latitude,
      longitude,
    };

    user.locations.push(newLocation);

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: 'Localização cadastrada com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao cadastrar localização:', error);
    return NextResponse.json({ error: 'Erro ao cadastrar localização' }, { status: 500 });
  }
}
