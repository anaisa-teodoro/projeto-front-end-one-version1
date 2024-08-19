import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

type UserInputs = {
  nome: string;
  sexo: string;
  dataNascimento: string;
  cpf: string;
  email: string;
  senha: string;
  cep: string;
  endereco: {
    endereco: string;
    numero: string;
    complemento: string;
  };
};

type EditUserFormProps = {
  userId: string;
  userIdToEdit?: string;
};

export const EditUserForm = ({ userId, userIdToEdit }: EditUserFormProps) => {
  const [userData, setUserData] = useState<UserInputs | null>(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UserInputs>();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userIdToEdit) {
        try {
          const response = await axios.get(`/api/users/${userId}/${userIdToEdit}`);
          const data = response.data;

          // Atualiza o estado com os dados do usuário
          setUserData(data);

          // Preenche os campos do formulário com os dados do usuário
          setValue('nome', data.nome);
          setValue('sexo', data.sexo);
          setValue('dataNascimento', data.dataNascimento);
          setValue('cpf', data.cpf);
          setValue('email', data.email);
          setValue('senha', data.senha);
          setValue('cep', data.cep);
          setValue('endereco.endereco', data.endereco.endereco);
          setValue('endereco.numero', data.endereco.numero);
          setValue('endereco.complemento', data.endereco.complemento);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [userId, userIdToEdit, setValue]);

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    try {
      if (userIdToEdit) {
        await axios.put(`/api/users/${userId}/${userIdToEdit}`, data);
      } else {
        await axios.post(`/api/users/${userId}`, data);
      }
      alert('Usuário salvo com sucesso!');
      router.push('/users');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const cep = event.target.value;
    setValue('cep', cep);

    if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, complemento } = response.data;
        setValue('endereco.endereco', logradouro || '');
        setValue('endereco.complemento', complemento || '');
      } catch (error) {
        console.error('Error fetching address data:', error);
      }
    }
  };

  return (
    <div className="p-4 bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Editar Usuário</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label className="flex flex-col">
            Nome
            <input
              type="text"
              {...register('nome', { required: 'Nome é obrigatório' })}
              className="p-2 border rounded"
            />
          </label>
          {errors.nome && <span className="text-red-500 text-xs">{errors.nome.message}</span>}

          <div className="flex flex-col">
            <label htmlFor="nome" className="text-black font-semibold mb-1">Sexo</label>
            <select 
            id="sexo"
            className='w-full h-10 pl-2 rounded border border-gray-300 bg-white text-black'
            {...register('sexo', { required: 'Sexo é obrigatório' })}
            >
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
              <option value="Outros">Outros</option>
            </select>
            {errors.sexo && <span className="text-red-500 text-xs mt-1">{errors.sexo.message}</span>}
          </div>

          <label className="flex flex-col">
            Data de Nascimento
            <input
              type="date"
              {...register('dataNascimento', { required: 'Data de Nascimento é obrigatória' })}
              className="p-2 border rounded"
            />
          </label>
          {errors.dataNascimento && <span className="text-red-500 text-xs">{errors.dataNascimento.message}</span>}

          <label className="flex flex-col">
            CPF
            <input
              type="text"
              {...register('cpf', { required: 'CPF é obrigatório' })}
              className="p-2 border rounded"
            />
          </label>
          {errors.cpf && <span className="text-red-500 text-xs">{errors.cpf.message}</span>}

          <label className="flex flex-col">
            E-mail
            <input
              type="email"
              {...register('email', { required: 'E-mail é obrigatório' })}
              className="p-2 border rounded"
            />
          </label>
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}

          <label className="flex flex-col">
            Senha
            <input
              type="password"
              {...register('senha', { required: 'Senha é obrigatória' })}
              className="p-2 border rounded"
            />
          </label>
          {errors.senha && <span className="text-red-500 text-xs">{errors.senha.message}</span>}

          <label className="flex flex-col">
            CEP
            <input
              type="text"
              {...register('cep', { required: 'CEP é obrigatório' })}
              className="p-2 border rounded"
              onChange={handleCepChange}
            />
          </label>
          {errors.cep && <span className="text-red-500 text-xs">{errors.cep.message}</span>}

          <label className="flex flex-col">
            Endereço
            <input
              type="text"
              {...register('endereco.endereco', { required: 'Endereço é obrigatório' })}
              className="p-2 border rounded"
            />
          </label>
          {errors.endereco?.endereco && <span className="text-red-500 text-xs">{errors.endereco.endereco.message}</span>}

          <label className="flex flex-col">
            Número
            <input
              type="text"
              {...register('endereco.numero', { required: 'Número é obrigatório' })}
              className="p-2 border rounded"
            />
          </label>
          {errors.endereco?.numero && <span className="text-red-500 text-xs">{errors.endereco.numero.message}</span>}

          <label className="flex flex-col">
            Complemento
            <input
              type="text"
              {...register('endereco.complemento')}
              className="p-2 border rounded"
            />
          </label>

          <div className="flex gap-4 mt-4">
            <button type="button" onClick={() => router.back()} className="w-full h-12 bg-gray-300 text-black font-bold rounded-md">
              Voltar
            </button>
            <button type="submit" className="w-full h-12 bg-lime-400 text-black font-bold rounded-md">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
