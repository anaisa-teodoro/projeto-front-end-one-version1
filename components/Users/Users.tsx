"use client";

import { useState } from 'react';
import usuariosData from '../../database/users.json';
import Link from 'next/link';
import axios from 'axios';

export const Usuarios = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Função para dividir os usuários por páginas
  const paginatedUsuarios = usuariosData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(usuariosData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete('/api/delete-user', { data: { userId } });
      alert('Usuário excluído com sucesso!');
      // Atualize a lista de usuários após a exclusão
      window.location.reload(); // Simples, recarrega a página para ver as mudanças
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
    }
  };
  

  return (
    <div className="p-4 bg-white min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Usuários</h1>
          <p className="text-base mb-4">Lista de usuários cadastrados.</p>
        </div>
        <Link 
          href="/register-user-logged" 
          className="bg-[#D7FB00] text-black font-bold rounded-lg flex items-center justify-center text-center" 
          style={{ width: '205px', height: '49px' }}
        >
          Cadastrar um usuário
        </Link>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="text-left text-[#7C7C8A] text-sm">
            <tr>
              <th className="p-4">Nome</th>
              <th className="p-4">Email</th>
              <th className="p-4">Locais Adicionados</th> {/* Nova coluna */}
              <th className="p-4">Opções</th>
            </tr>
          </thead>
          <tbody className="bg-[#FAFAFA] text-sm rounded-lg text-gray-600">
            {paginatedUsuarios.map((usuario, index) => (
              <tr key={index} className="border-b-4 border-white py-4 hover:bg-zinc-200">
                <td className="p-4">{usuario.nome}</td>
                <td className="p-4">{usuario.email}</td>
                <td className="p-4">{usuario.locations.length}</td> {/* Contagem de locais */}
                <td className="p-4 flex space-x-4">
                  <Link href={`/user-update?userId=${usuario.id}`} className="icon-edit" aria-label="Editar">
                  </Link>
                  <button 
                    className="icon-delete" 
                    aria-label="Excluir" 
                    onClick={() => handleDelete(usuario.id)}
                  >
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100"
          aria-label="Página anterior"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, pageNumber) => (
          <button
            key={pageNumber}
            className={`text-black p-2 rounded-full w-8 h-8 flex items-center justify-center ${pageNumber + 1 === currentPage ? 'bg-[#D7FB00]' : 'bg-white'} hover:bg-[#b5e300]`}
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100"
          aria-label="Próxima página"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
