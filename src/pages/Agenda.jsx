import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, MapPin, Clock, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import SEO from '../components/SEO';

export default function Agenda() {
  const { isLoggedIn } = useApp();
  const [agendas, setAgendas] = useState([]);
  const [form, setForm] = useState({ judul: '', tanggal: '', waktu: '', lokasi: '', deskripsi: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('himmah_agenda');
    if (saved) setAgendas(JSON.parse(saved));
  }, []);

  const saveAgendas = (data) => {
    setAgendas(data);
    localStorage.setItem('himmah_agenda', JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.judul || !form.tanggal) return;

    if (editId) {
      saveAgendas(agendas.map(a => a.id === editId ? { ...form, id: editId } : a));
      setEditId(null);
    } else {
      saveAgendas([...agendas, { ...form, id: Date.now() }]);
    }
    setForm({ judul: '', tanggal: '', waktu: '', lokasi: '', deskripsi: '' });
  };

  const handleEdit = (item) => {
    setForm({ judul: item.judul, tanggal: item.tanggal, waktu: item.waktu, lokasi: item.lokasi, deskripsi: item.deskripsi });
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus agenda ini?')) {
      saveAgendas(agendas.filter(a => a.id !== id));
    }
  };

  return (
    <>
      <SEO title="Agenda Kegiatan" description="Jadwal kegiatan HIMMAH NW Komisariat STMIK." />
      <div className="min-h-screen pb-16">
        <div className="bg-gradient-to-br from-[#003d1c] to-[#004d24] py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-white">Agenda Kegiatan</h1>
          <p className="text-green-300 mt-2">Jadwal Kegiatan HIMMAH NW Komisariat STMIK</p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          {isLoggedIn && (
            <div className="mb-6 bg-[#111a11] border border-green-900/30 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">{editId ? '✏️ Edit Agenda' : '➕ Tambah Agenda'}</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" placeholder="Judul Agenda" value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white" required />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white" required />
                  <input type="time" value={form.waktu} onChange={(e) => setForm({ ...form, waktu: e.target.value })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white" />
                </div>
                <input type="text" placeholder="Lokasi" value={form.lokasi} onChange={(e) => setForm({ ...form, lokasi: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white" />
                <textarea placeholder="Deskripsi" value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} rows="3" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white resize-none" />
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm"><Save size={16} className="inline mr-1" /> {editId ? 'Update' : 'Simpan'}</button>
                  {editId && <button type="button" onClick={() => { setEditId(null); setForm({ judul: '', tanggal: '', waktu: '', lokasi: '', deskripsi: '' }); }} className="px-4 py-2 bg-gray-500/30 text-white rounded-xl text-sm"><X size={16} className="inline mr-1" /> Batal</button>}
                </div>
              </form>
            </div>
          )}

          {agendas.length === 0 ? (
            <div className="glass p-12 text-center rounded-2xl">
              <p className="text-green-300/60">Belum ada agenda kegiatan.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {agendas
                .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
                .map((item) => (
                  <div key={item.id} className="glass rounded-2xl p-5 hover:scale-[1.01] transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">{item.judul}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-green-300/70 mt-2">
                          <span className="flex items-center gap-1"><Calendar size={14} /> {item.tanggal}</span>
                          {item.waktu && <span className="flex items-center gap-1"><Clock size={14} /> {item.waktu}</span>}
                          {item.lokasi && <span className="flex items-center gap-1"><MapPin size={14} /> {item.lokasi}</span>}
                        </div>
                        {item.deskripsi && <p className="text-green-100/70 text-sm mt-3">{item.deskripsi}</p>}
                      </div>
                      {isLoggedIn && (
                        <div className="flex gap-2 ml-4">
                          <button onClick={() => handleEdit(item)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit3 size={14} /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}