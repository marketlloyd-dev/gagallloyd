import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Upload, X, ZoomIn } from 'lucide-react';
import SEO from '../components/SEO';
import CropModal from '../components/CropModal';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export default function Galeri() {
  const { isLoggedIn } = useApp();
  const [fotos, setFotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const [cropModal, setCropModal] = useState({
    open: false,
    imageSrc: '',
    onCropComplete: null,
    aspect: 4 / 3,
    cropShape: 'rect',
  });

  useEffect(() => {
    const saved = localStorage.getItem('himmah_galeri');
    if (saved) setFotos(JSON.parse(saved));
  }, []);

  const uploadToImgBB = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        const formData = new FormData();
        formData.append('key', IMGBB_API_KEY);
        formData.append('image', base64);
        formData.append('name', file.name);
        const response = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (result.success) resolve(result.data.url);
        else reject(new Error(result.error?.message || 'Upload gagal'));
      };
      reader.onerror = () => reject(new Error('Gagal membaca file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setCropModal({
        open: true,
        imageSrc: reader.result,
        aspect: 4 / 3,
        cropShape: 'rect',
        onCropComplete: (croppedBlob) => {
          const croppedFile = new File([croppedBlob], file.name || 'cropped.jpg', {
            type: 'image/jpeg',
          });
          handleUpload([croppedFile]);
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (files) => {
    setUploading(true);
    const newPhotos = [];
    for (const file of files) {
      try {
        const url = await uploadToImgBB(file);
        newPhotos.push({
          id: Date.now() + Math.random(),
          src: url,
          alt: file.name,
          tanggal: new Date().toISOString(),
        });
      } catch (err) {
        alert(`Gagal upload ${file.name}: ${err.message}`);
      }
    }
    const updated = [...newPhotos, ...fotos];
    setFotos(updated);
    localStorage.setItem('himmah_galeri', JSON.stringify(updated));
    setUploading(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus foto ini?')) {
      const updated = fotos.filter((f) => f.id !== id);
      setFotos(updated);
      localStorage.setItem('himmah_galeri', JSON.stringify(updated));
    }
  };

  return (
    <>
      <SEO title="Galeri Foto" description="Galeri foto kegiatan HIMMAH NW Komisariat STMIK." />
      <div className="min-h-screen pb-16">
        <div className="bg-gradient-to-br from-[#003d1c] to-[#004d24] py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-white">
            Galeri Foto Kegiatan
          </h1>
          <p className="text-green-300 mt-2">Dokumentasi Kegiatan HIMMAH NW Komisariat STMIK</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          {isLoggedIn && (
            <div className="mb-6 flex justify-end">
              <label className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center gap-2 cursor-pointer text-sm font-medium">
                <Upload size={16} />
                {uploading ? 'Mengunggah...' : 'Upload Foto'}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {fotos.length === 0 ? (
            <div className="glass p-12 text-center rounded-2xl">
              <p className="text-green-300/60">Belum ada foto kegiatan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {fotos.map((foto) => (
                <div
                  key={foto.id}
                  className="glass rounded-xl overflow-hidden group relative cursor-pointer"
                  onClick={() => setLightbox(foto)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={foto.src}
                      alt={foto.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn size={32} className="text-white" />
                  </div>
                  {isLoggedIn && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(foto.id);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white hover:text-green-300"
            >
              <X size={32} />
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        <CropModal
          open={cropModal.open}
          onClose={() => setCropModal({ ...cropModal, open: false })}
          imageSrc={cropModal.imageSrc}
          aspect={cropModal.aspect}
          cropShape={cropModal.cropShape}
          onCropComplete={cropModal.onCropComplete}
        />
      </div>
    </>
  );
}