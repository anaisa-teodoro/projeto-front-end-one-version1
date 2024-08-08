"use client";

export const Dashboard = () => {
  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black text-white p-4 rounded-lg flex flex-col justify-between" style={{ width: '352px', height: '145px' }}>
          <div>
            <span className="text-xl font-bold">Usuários</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-[#D7FB00]">5</span>
            <div className="icon-user"></div>
          </div>
        </div>
        <div className="bg-black text-white p-4 rounded-lg flex flex-col justify-between" style={{ width: '352px', height: '145px' }}>
          <div>
            <span className="text-xl font-bold">Locais</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-[#D7FB00]">5</span>
            <div className="icon-location"></div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-4xl font-bold mb-8">Mapa</h2>
        <p className="text-base mb-4">Localidades marcadas no mapa</p>
        <div className="w-full h-[400px] border rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23456789.123456!2d-58.1234567!3d-34.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z!5e0!3m2!1sen!2sus!4v1234567890123"
            title="Mapa"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
