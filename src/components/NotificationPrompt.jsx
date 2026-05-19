import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';

export default function NotificationPrompt() {
  const [permission, setPermission] = useState(Notification.permission);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const hasPrompted = localStorage.getItem('notif_prompted');
    if (permission === 'default' && !hasPrompted) {
      setShowPrompt(true);
      localStorage.setItem('notif_prompted', 'true');
    }
  }, []);

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === 'granted') {
      new Notification('HIMMAH NW', {
        body: 'Kamu akan menerima notifikasi berita terbaru!',
        icon: '/img/logo.png',
      });
    }
    setShowPrompt(false);
  };

  const dismiss = () => setShowPrompt(false);

  if (permission === 'granted') {
    return (
      <button
        onClick={() => setPermission('default')}
        className="flex items-center gap-2 px-3 py-2 text-green-300 hover:text-green-200 text-sm"
        title="Notifikasi aktif"
      >
        <Bell size={18} />
        <span className="hidden sm:inline">Notifikasi Aktif</span>
      </button>
    );
  }

  if (showPrompt) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-white rounded-2xl shadow-2xl p-5 max-w-sm border border-green-100">
        <p className="text-gray-800 font-semibold mb-2">🔔 Dapatkan Notifikasi Berita Terbaru!</p>
        <p className="text-gray-500 text-sm mb-4">Izinkan browser mengirim notifikasi saat ada berita baru dari HIMMAH NW.</p>
        <div className="flex gap-2">
          <button
            onClick={requestPermission}
            className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-1"
          >
            <Bell size={16} /> Izinkan
          </button>
          <button
            onClick={dismiss}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium flex items-center gap-1"
          >
            Nanti Saja
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={requestPermission}
      className="flex items-center gap-2 px-3 py-2 text-green-300 hover:text-green-200 text-sm"
      title="Aktifkan notifikasi"
    >
      <BellOff size={18} />
      <span className="hidden sm:inline">Notifikasi</span>
    </button>
  );
}