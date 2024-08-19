import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function PUT(request: Request) {
  try {
    const { userId, locationIndex, local, estado, descricao, cep, endereco, latitude, longitude } = await request.json();
    const dataFilePath = path.join(process.cwd(), 'database', 'users.json');
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

    const user = data.find((user: any) => user.id === userId);
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const location = user.locations[locationIndex];
    if (!location) {
      return NextResponse.json({ error: 'Localização não encontrada' }, { status: 404 });
    }

    // Atualizar localização
    location.local = local;
    location.estado = estado;
    location.descricao = descricao;
    location.cep = cep;
    location.endereco = endereco;
    location.latitude = latitude;
    location.longitude = longitude;

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: 'Localização atualizada com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar localização:', error);
    return NextResponse.json({ error: 'Erro ao atualizar localização' }, { status: 500 });
  }
}
