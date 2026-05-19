// src/pages/StrukturPengurus.jsx
import { useApp } from '../context/AppContext';
import SEO from '../components/SEO';
import { Target } from 'lucide-react';

export default function StrukturPengurus() {
  const { divisi, pengurus } = useApp();

  // Fallback pengurus inti
  const defaultPengurus = {
    ketua: { nama: 'Ketua', foto: '/img/ketua.jpg' },
    sekretaris: { nama: 'Sekretaris', foto: '/img/sekretaris.jpg' },
    bendahara: { nama: 'Bendahara', foto: '/img/bendahara.jpg' },
  };

  const currentPengurus = pengurus || defaultPengurus;
  const { ketua, sekretaris, bendahara } = currentPengurus;

  const pengurusInti = [
    { ...sekretaris, jabatan: 'Sekretaris' },
    { ...ketua, jabatan: 'Ketua Umum' },
    { ...bendahara, jabatan: 'Bendahara' },
  ];

  return (
    <>
      <SEO title="Struktur Pengurus" description="Struktur pengurus dan anggota divisi HIMMAH NW Komisariat STMIK." />
      <div className="min-h-screen pb-16">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#003d1c] to-[#004d24] py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-white">Struktur Pengurus</h1>
          <p className="text-green-300 mt-2">HIMMAH NW Komisariat STMIK</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          
          {/* Pengurus Inti */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-white text-center mb-8">
              Pengurus Inti
            </h2>
            <div className="flex sm:grid sm:grid-cols-3 gap-6 overflow-x-auto snap-x sm:snap-none pb-4">
              {pengurusInti.map((person, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all shrink-0 w-64 sm:w-auto snap-center"
                >
                  <div className="h-56 sm:h-64 overflow-hidden">
                    <img
                      src={person.foto}
                      alt={person.nama}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.nama)}&background=004d24&color=fff&size=300`;
                      }}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <span className="text-xs font-semibold bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">
                      {person.jabatan}
                    </span>
                    <h3 className="text-white font-bold text-lg mt-2">{person.nama}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divisi, Anggota + Program Kerja */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-white text-center mb-8">
              Divisi & Anggota
            </h2>
            {divisi.map((d) => (
              <div key={d.id} className="mb-12">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-green-500/30 pb-2">
                  {d.nama}
                </h3>

                {/* Anggota */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {d.anggota.map((anggota, i) => {
                    const nama = typeof anggota === 'object' ? anggota.nama : anggota.replace(/\s*\(Kadiv\).*/, '');
                    const isKadiv = typeof anggota === 'object' ? anggota.jabatan === 'Kadiv' : anggota.includes('(Kadiv)');
                    const foto = typeof anggota === 'object' ? anggota.foto : null;

                    return (
                      <div key={i} className="glass rounded-2xl p-4 text-center hover:scale-[1.02] transition-all group">
                        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-green-400/50 group-hover:border-green-400 transition-all mb-3">
                          <img
                            src={foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(nama)}&background=004d24&color=fff&size=150`}
                            alt={nama}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-white font-medium text-sm">{nama}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${isKadiv ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
                          {isKadiv ? 'Kadiv' : 'Anggota'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Program Kerja */}
                {d.programKerja.length > 0 && (
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Target size={18} className="text-green-400" />
                      <h4 className="text-white font-semibold">Program Kerja</h4>
                    </div>
                    <ul className="space-y-2">
                      {d.programKerja.map((proker, i) => (
                        <li key={i} className="flex items-start gap-2 text-green-100/80 text-sm">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                          {proker}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}