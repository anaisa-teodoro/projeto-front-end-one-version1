"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  local: string;
  estado: string;
  descricao: string;
  cep: string;
  endereco: string;
  latitude: string;
  longitude: string;
};

export const LocationEditForm = () => {
  const { id, locationIndex } = useParams();
  const [locationData, setLocationData] = useState<Inputs | null>(null);
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>();

  useEffect(() => {
    // Buscar dados da localização para edição
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(`/api/location/${id}/${locationIndex}`);
        setLocationData(response.data);
        if (response.data) {
          setValue('local', response.data.local);
          setValue('estado', response.data.estado);
          setValue('descricao', response.data.descricao);
          setValue('cep', response.data.cep);
          setValue('endereco', response.data.endereco);
          setValue('latitude', response.data.latitude);
          setValue('longitude', response.data.longitude);
        }
      } catch (error) {
        console.error('Erro ao buscar dados da localização:', error);
      }
    };

    fetchLocationData();
  }, [id, locationIndex]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.put('/api/update-location', { ...data, userId: id, locationIndex });

      alert('Localização atualizada com sucesso!');
      router.push('/location');
    } catch (error) {
      console.error('Erro ao atualizar localização:', error);
    }
  };

  if (!locationData) return <div>Carregando...</div>;

  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Editar Localização</h1>
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
            className="p-2 border rounded"
          />
        </label>
        {errors.cep && <span className="text-red-500 text-xs">{errors.cep.message}</span>}

        <label className="flex flex-col">
          Endereço
          <input
            type="text"
            {...register('endereco')}
            className="p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          Latitude
          <input
            type="text"
            {...register('latitude')}
            className="p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          Longitude
          <input
            type="text"
            {...register('longitude')}
            className="p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          Estado
          <input
            type="text"
            {...register('estado')}
            className="p-2 border rounded"
          />
        </label>

        <div className="w-full flex items-center gap-4 mt-5">
          <button 
            className="w-full h-12 bg-lime-400 text-black font-bold rounded-md"
            type="submit"
          >
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
};
