// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import usersData from '../../database/users.json';

// export const Location = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [locations, setLocations] = useState<any[]>([]);
//   const router = useRouter();

//   const itemsPerPage = 5;
//   const paginatedLocations = locations.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );
//   const totalPages = Math.ceil(locations.length / itemsPerPage);

//   const loadLocations = () => {
//     const allLocations = usersData.flatMap((user: any) => user.locations);
//     setLocations(allLocations);
//   };

//   useEffect(() => {
//     loadLocations();
//   }, []);

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleAddLocation = () => {
//     router.push('/location-register');
//   };

//   return (
//     <div className="p-4 bg-white min-h-screen flex flex-col">
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-4xl font-bold">Locais</h1>
//           <p className="text-base mb-4">Localidades de preservação cadastradas.</p>
//         </div>
//         <button
//           className="bg-[#D7FB00] text-black font-bold rounded-lg"
//           style={{ width: '205px', height: '49px' }}
//           onClick={handleAddLocation}
//         >
//           Cadastrar Local
//         </button>
//       </div>

//       {/* Tabela */}
//       <div className="overflow-x-auto mb-8">
//         <table className="min-w-full bg-white rounded-lg">
//           <thead className="text-left text-[#7C7C8A] text-sm">
//             <tr>
//               <th className="p-4">Local</th>
//               <th className="p-4">Área de preservação</th>
//               <th className="p-4">CEP</th>
//               <th className="p-4">Endereço</th>
//               <th className="p-4">Opções</th>
//             </tr>
//           </thead>
//           <tbody className="bg-[#FAFAFA] text-sm rounded-lg text-gray-600">
//             {paginatedLocations.map((location, index) => (
//               <tr key={index} className="border-b-4 border-white py-4 hover:bg-zinc-200">
//                 <td className="p-4">{location.local}</td>
//                 <td className="p-4">{location.descricao}</td>
//                 <td className="p-4">{location.cep}</td>
//                 <td className="p-4">{location.estado}</td>
//                 <td className="p-4 flex space-x-4">
//                   <button className="icon-edit" aria-label="Editar"></button>
//                   <button className="icon-delete" aria-label="Excluir"></button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-center items-center mt-8 space-x-2">
//         <button
//           className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100"
//           aria-label="Página anterior"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           &lt;
//         </button>
//         {[...Array(totalPages)].map((_, pageNumber) => (
//           <button
//             key={pageNumber}
//             className={`text-black p-2 rounded-full w-8 h-8 flex items-center justify-center ${pageNumber + 1 === currentPage ? 'bg-[#D7FB00]' : 'bg-white'} hover:bg-[#b5e300]`}
//             onClick={() => handlePageChange(pageNumber + 1)}
//           >
//             {pageNumber + 1}
//           </button>
//         ))}
//         <button
//           className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100"
//           aria-label="Próxima página"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import usersData from '../../database/users.json';

export const Location = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [locations, setLocations] = useState<any[]>([]);
  const router = useRouter();

  const itemsPerPage = 5;
  const paginatedLocations = locations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(locations.length / itemsPerPage);

  // Carregar localizações e usuários
  const loadLocations = () => {
    const allLocations = usersData.flatMap((user: any) => user.locations.map((loc: any) => ({
      ...loc,
      userId: user.id
    })));
    setLocations(allLocations);
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAddLocation = () => {
    router.push('/location-register');
  };

  const handleDeleteLocation = async (userId: string, locationIndex: number) => {
    try {
      await axios.delete('/api/delete-location', {
        data: { userId, locationIndex },
      });
      loadLocations();
    } catch (error) {
      console.error('Erro ao excluir localização:', error);
    }
  };

  const handleEditLocation = (userId: string, locationIndex: number) => {
    router.push(`/location-edit/${userId}/${locationIndex}`);
  };
  
  return (
    <div className="p-4 bg-white min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Locais</h1>
          <p className="text-base mb-4">Localidades de preservação cadastradas.</p>
        </div>
        <button
          className="bg-[#D7FB00] text-black font-bold rounded-lg"
          style={{ width: '205px', height: '49px' }}
          onClick={handleAddLocation}
        >
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
              <th className="p-4">CEP</th>
              <th className="p-4">Endereço</th>
              <th className="p-4">Opções</th>
            </tr>
          </thead>
          <tbody className="bg-[#FAFAFA] text-sm rounded-lg text-gray-600">
            {paginatedLocations.map((location, index) => (
              <tr key={index} className="border-b-4 border-white py-4 hover:bg-zinc-200">
                <td className="p-4">{location.local}</td>
                <td className="p-4">{location.descricao}</td>
                <td className="p-4">{location.cep}</td>
                <td className="p-4">{location.endereco}</td>
                <td className="p-4 flex space-x-4">
                  <button
                    className="icon-edit"
                    aria-label="Editar"
                    onClick={() => handleEditLocation(location.userId, index)}
                  >
                  </button>
                  <button
                    className="icon-delete"
                    aria-label="Excluir"
                    onClick={() => handleDeleteLocation(location.userId, index)}
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
