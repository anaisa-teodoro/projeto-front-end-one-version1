import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  nome: string
  sexo: string
  dataNascimento: string
  cpf: string
  email: string
  senha: string
  cep: string
  endereco: string
  numero: string
  complemento: string
}

export const RegisterFormLogged = () => {
    const [cepData, setCepData] = useState<any>(null);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>()

  const fetchCepData = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setCepData(data);
        setValue('endereco', data.logradouro);
        setValue('complemento', data.complemento || '');
      } else {
        setCepData(null);
        alert('CEP não encontrado');
      }
    } catch (error) {
      console.error('Erro ao consultar CEP:', error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Adicionar um array de localizações vazio ao criar um usuário
    const userData = { ...data, locations: [] };

    try {
      const response = await fetch('/api/register-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
      } else {
        alert('Erro ao cadastrar usuário.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg">
        <span className="text-4xl font-bold mb-4 block text-center">Cadastra-se</span>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label htmlFor="nome" className="text-black font-semibold mb-1">Nome</label>
            <input
              id="nome"
              type="text"
              {...register('nome', { required: 'Nome é obrigatório' })}
              className="w-full h-10 pl-2 rounded border border-gray-300 bg-white text-black"
            />
            {errors.nome && <span className="text-red-500 text-xs mt-1">{errors.nome.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="dataNascimento" className="text-black font-semibold mb-1">Data de nascimento</label>
            <input
              id="dataNascimento"
              type="date"
              {...register('dataNascimento', { required: 'Data de nascimento é obrigatória' })}
              className="w-full h-10 pl-2 rounded border border-gray-300 bg-white text-black"
            />
            {errors.dataNascimento && <span className="text-red-500 text-xs mt-1">{errors.dataNascimento.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="cpf" className="text-black font-semibold mb-1">CPF</label>
            <input
              id="cpf"
              type="text"
              {...register('cpf', { required: 'CPF é obrigatório' })}
              className="w-full h-10 pl-2 rounded border border-gray-300 bg-white text-black"
            />
            {errors.cpf && <span className="text-red-500 text-xs mt-1">{errors.cpf.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-black font-semibold mb-1">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email é obrigatório' })}
              className="w-full h-10 pl-2 rounded border border-gray-300 bg-white text-black"
            />
            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="senha" className="text-black font-semibold mb-1">Senha</label>
            <input
              id="senha"
              type="password"
              {...register('senha', { required: 'Senha é obrigatória' })}
              className="w-full h-10 pl-2 rounded border border-gray-300 bg-white text-black"
            />
            {errors.senha && <span className="text-red-500 text-xs mt-1">{errors.senha.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="cep" className="text-black font-semibold mb-1">CEP</label>
            <input
              id="cep"
              type="text"
              {...register('cep', { required: 'CEP é obrigatório' })}
              className="w-full h-10 pl-2 rounded border border-gray-300 bg-white text-black"
              onBlur={(e) => fetchCepData(e.target.value)}
            />
            {errors.cep && <span className="text-red-500 text-xs mt-1">{errors.cep.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="endereco" className="text-black font-semibold mb-1">Endereço</label>
            <input
              id="endereco"
              type="text"
              {...register('endereco', { required: 'Endereço é obrigatório' })}
              className="w-full h-10 pl-2 rounded border border-gray-300 bg-white text-black"
            />
            {errors.endereco && <span className="text-red-500 text-xs mt-1">{errors.endereco.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="numero" className="text-black font-semibold mb-1">Número</label>
            <input
              id="numero"
              type="text"
              {...register('numero', { required: 'Número é obrigatório' })}
              className="w-full h-10 pl-2 rounded border border-gray-300 bg-white text-black"
            />
            {errors.numero && <span className="text-red-500 text-xs mt-1">{errors.numero.message}</span>}
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="complemento" className="text-black font-semibold mb-1">Complemento</label>
            <input
              id="complemento"
              type="text"
              {...register('complemento')}
              className="w-full h-10 pl-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>

          <div className="w-full flex items-center gap-4 mt-5">
            <button
              className="w-full h-12 bg-lime-400 text-black font-bold rounded-md"
              type="submit"
            >
              Cadastrar
            </button>
            <Link 
                href="/users" 
                className="w-full h-12 bg-gray-200 text-black font-bold rounded-md flex items-center justify-center text-center"
                >
                Voltar
            </Link>
          </div>

        </form>

      </div>
    </div>
  )
}
