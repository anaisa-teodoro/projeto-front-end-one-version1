"use client";

import { useState } from 'react';

export const Location = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const locations = [
    { local: 'Local A', area: 'Vegetação nativa', user: 'Usuário 1' },
    { local: 'Local B', area: 'Curso D’água ', user: 'Usuário 2' },
    { local: 'Local C', area: 'Restinga', user: 'Usuário 3' },
    { local: 'Local D', area: 'Lagoa', user: 'Usuário 4' },
    { local: 'Local E', area: 'Encostas', user: 'Usuário 5' },
  ];

  return (
    <div className="p-4 bg-white min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Locais</h1>
          <p className="text-base mb-4">Localidades de preservação cadastradas.</p>
        </div>
        <button className="bg-[#D7FB00] text-black font-bold rounded-lg" style={{ width: '205px', height: '49px' }}>
          Cadastrar Local
        </button>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="text-left text-[#7C7C8A] text-sm">
            <tr>
              <th className="p-4">Local</th>
              <th className="p-4">Área de preservação</th>
              <th className="p-4">Usuário</th>
              <th className="p-4">Opções</th>
            </tr>
          </thead>
          <tbody className="bg-[#FAFAFA] text-sm rounded-lg text-gray-600">
            {locations.map((location, index) => (
              <tr key={index} className="border-b-4 border-white py-4">
                <td className="p-4">{location.local}</td>
                <td className="p-4">{location.area}</td>
                <td className="p-4">{location.user}</td>
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
