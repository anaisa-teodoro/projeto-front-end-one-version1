import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const dataFilePath = path.join(process.cwd(), 'database', 'users.json');

const generateId = () => Math.random().toString(36).substr(2, 9);

export async function POST(request: Request) {
  try {
    const newUser = await request.json();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.senha, saltRounds);
    const userWithIdAndHashedPassword = { ...newUser, senha: hashedPassword, id: generateId() };

    let usersData = [];
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      try {
        usersData = JSON.parse(fileData);
        if (!Array.isArray(usersData)) {
          throw new Error('O arquivo de dados não é um array');
        }
      } catch (error) {
        console.error('Erro ao analisar o arquivo de dados:', error);
        usersData = [];
      }
    }

    const userExists = usersData.find((user: any) => user.cpf === newUser.cpf);
    if (userExists) {
      return NextResponse.json({ message: 'CPF já cadastrado' }, { status: 400 });
    }

    usersData.push(userWithIdAndHashedPassword);

    fs.writeFileSync(dataFilePath, JSON.stringify(usersData, null, 2), 'utf8');

    return NextResponse.json({ message: 'Usuário cadastrado com sucesso!' }, { status: 201 });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return NextResponse.json({ message: 'Erro ao cadastrar usuário.' }, { status: 500 });
  }
}