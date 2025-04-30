import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        {/* Mitad Heoes */}
        <div
          className="w-1/2 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('/heroes.jpg')",
            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
          }}
        >
          <button className="px-8 py-4 bg-blue-600 text-white text-2xl font-bold rounded-lg shadow-lg hover:bg-blue-700 transition">
            Héroes
          </button>
        </div>

        {/* Mitad Villanos */}
        <div
          className="w-1/2 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('/villanos.webp')",
            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
          }}
        >
          <button className="px-8 py-4 bg-red-600 text-white text-2xl font-bold rounded-lg shadow-lg hover:bg-red-700 transition">
            Villanos
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
