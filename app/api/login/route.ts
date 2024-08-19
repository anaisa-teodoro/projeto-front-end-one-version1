import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const dataFilePath = path.join(process.cwd(), 'database', 'users.json');

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    const password = url.searchParams.get('password');

    if (!email || !password) {
      return NextResponse.json({ message: 'Email e senha são obrigatórios' }, { status: 400 });
    }

    if (!fs.existsSync(dataFilePath)) {
      console.log('Arquivo de dados não encontrado.');
      return NextResponse.json({ message: 'Usuários não encontrados' }, { status: 404 });
    }

    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const users = JSON.parse(fileData);

    console.log('Usuários carregados:', users);

    const user = users.find((user: any) => user.email === email);

    if (!user) {
      console.log('Usuário não encontrado.');
      return NextResponse.json({ message: 'Email ou senha incorretos' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.senha);

    if (!isMatch) {
      console.log('Senha incorreta.');
      return NextResponse.json({ message: 'Email ou senha incorretos' }, { status: 401 });
    }

    console.log('Login bem-sucedido:', user);
    return NextResponse.json({ id: user.id, message: 'Login bem-sucedido' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}