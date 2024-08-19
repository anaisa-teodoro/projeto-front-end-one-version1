"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';

type LocationInputs = {
  local: string;
  estado: string;
  descricao: string;
  cep: string;
  endereco: string;
  latitude: string;
  longitude: string;
};

type LocationFormProps = {
  userId: string;
};

export const LocationForm = ({ userId }: LocationFormProps) => {
  const [cepData, setCepData] = useState<any>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LocationInputs>({
    defaultValues: {
      local: '',
      estado: '',
      descricao: '',
      cep: '',
      endereco: '',
      latitude: '',
      longitude: '',
    },
  });

  const fetchCepData = async (cep: string) => {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      
      if (cleanCep.length !== 8) {
        alert('CEP inválido');
        return;
      }

      const response = await axios.get(`https://cep.awesomeapi.com.br/json/${cleanCep}`);
      
      if (response.data) {
        setCepData(response.data);
        setValue('endereco', `${response.data.address}, ${response.data.district}, ${response.data.city} - ${response.data.state}`);
        setValue('latitude', response.data.lat);
        setValue('longitude', response.data.lng);
        setValue('estado', response.data.state); // Atualiza o estado com o valor do CEP
      } else {
        setCepData(null);
        alert('CEP não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
    }
  };

  const onSubmit: SubmitHandler<LocationInputs> = async (data) => {
    try {
      await axios.post(`/api/register-location`, { ...data, userId });

      alert('Localização cadastrada com sucesso!');
      router.push('/location');
    } catch (error) {
      console.error('Erro ao cadastrar localização:', error);
    }
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Cadastrar Localização</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Local
          <input
            type="text"
            {...register('local', { required: 'Local é obrigatório' })}
            className="p-2 border rounded"
          />
        </label>
        {errors.local && <span className="text-red-500 text-xs">{errors.local.message}</span>}

        <label className="flex flex-col">
          Descrição
          <textarea
            {...register('descricao', { required: 'Descrição é obrigatória' })}
            className="p-2 border rounded"
          />
        </label>
        {errors.descricao && <span className="text-red-500 text-xs">{errors.descricao.message}</span>}

        <label className="flex flex-col">
          CEP
          <input
            type="text"
            {...register('cep', { required: 'CEP é obrigatório', maxLength: 8 })}
            onBlur={(e) => fetchCepData(e.target.value)}
            className="p-2 border rounded"
          />
        </label>
        {errors.cep && <span className="text-red-500 text-xs">{errors.cep.message}</span>}

        <label className="flex flex-col">
          Endereço
          <input
            type="text"
            {...register('endereco')}
            readOnly
            className="p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          Latitude
          <input
            type="text"
            {...register('latitude')}
            readOnly
            className="p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          Longitude
          <input
            type="text"
            {...register('longitude')}
            readOnly
            className="p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          Estado
          <input
            type="text"
            {...register('estado')}
            readOnly
            className="p-2 border rounded"
          />
        </label>

        <div className="w-full flex items-center gap-4 mt-5">
          <button 
          className="w-full h-12 bg-lime-400 text-black font-bold rounded-md"
          type="submit">
            Cadastrar
          </button>

          <Link 
              href="/location" 
              className="w-full h-12 bg-gray-200 text-black font-bold rounded-md flex items-center justify-center text-center"
          >
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
};
