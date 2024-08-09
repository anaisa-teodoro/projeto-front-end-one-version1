"use client";

import { useState } from 'react';

export const Usuarios = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const usuarios = [
    { nome: 'Ana', cpf: '123.456.789-00', email: 'ana@example.com' },
    { nome: 'Bruno', cpf: '987.654.321-00', email: 'bruno@example.com' },
    { nome: 'Carlos', cpf: '456.123.789-00', email: 'carlos@example.com' },
    { nome: 'Diana', cpf: '789.456.123-00', email: 'diana@example.com' },
    { nome: 'Elisa', cpf: '321.654.987-00', email: 'elisa@example.com' },
  ];

  return (
    <div className="p-4 bg-white min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Usuários</h1>
          <p className="text-base mb-4">Lista de usuários cadastrados.</p>
        </div>
        <button className="bg-[#D7FB00] text-black font-bold rounded-lg" style={{ width: '205px', height: '49px' }}>
          Cadastrar Usuário
        </button>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="text-left text-[#7C7C8A] text-sm">
            <tr>
              <th className="p-4">Nome</th>
              <th className="p-4">CPF</th>
              <th className="p-4">Email</th>
              <th className="p-4">Opções</th>
            </tr>
          </thead>
          <tbody className="bg-[#FAFAFA] text-sm rounded-lg text-gray-600">
            {usuarios.map((usuario, index) => (
              <tr key={index} className="border-b-4 border-white py-4">
                <td className="p-4">{usuario.nome}</td>
                <td className="p-4">{usuario.cpf}</td>
                <td className="p-4">{usuario.email}</td>
                <td className="p-4 flex space-x-4">
                  <button className="icon-edit" aria-label="Editar"></button>
                  <button className="icon-delete" aria-label="Excluir"></button>
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
        >
          &lt;
        </button>
        {[1, 2, 3].map(pageNumber => (
          <button
            key={pageNumber}
            className={`text-black p-2 rounded-full w-8 h-8 flex items-center justify-center ${pageNumber === currentPage ? 'bg-[#D7FB00]' : 'bg-white'} hover:bg-[#b5e300]`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100"
          aria-label="Próxima página"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
