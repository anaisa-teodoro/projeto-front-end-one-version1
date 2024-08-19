import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('Dados enviados:', data); // Verifique se os dados estão corretos

    try {
      const response = await axios.get('/api/login', {
        params: {
          email: data.email,
          password: data.password
        }
      });

      if (response.status === 200) {
        const userId = response.data.id;
        Cookie.set('userId', userId);
        router.push('/dashboard');
      } else {
        alert('Erro ao fazer login.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-6 rounded-lg">
      <span className="text-4xl font-bold mb-4 block">Efetue o seu login!</span>
      <span className="text-base mb-8 block">Entre para explorar e contribuir para a preservação da Natureza!</span>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-black font-semibold mb-1">E-mail</label>
          <input
            id="email"
            type="text"
            {...register('email', { required: 'Email é obrigatório' })}
            className="w-full h-10 pl-2 rounded border border-gray-300 bg-white text-black"
          />
          {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-black font-semibold mb-1">Senha</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Senha é obrigatória' })}
            className="w-full h-10 pl-2 rounded border border-gray-300 bg-white text-black"
          />
          {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
        </div>
        <button
          className="w-full h-12 bg-lime-400 text-black font-bold rounded-md mt-5"
          type="submit"
        >
          Entrar
        </button>
        <Link className="w-full h-12 bg-black text-lime-400 text-center flex items-center justify-center font-bold rounded-md mt-3" href="/register">
          Cadastrar-se
        </Link>
      </form>
    </div>
  );
};
