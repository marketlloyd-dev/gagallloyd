import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export default function NewsChecker() {
  const { berita } = useApp();
  const prevBeritaIds = useRef(JSON.parse(localStorage.getItem('known_berita_ids') || '[]'));

  useEffect(() => {
    const checkNewBerita = () => {
      const currentIds = berita.map(b => b.id);
      const newIds = currentIds.filter(id => !prevBeritaIds.current.includes(id));

      if (newIds.length > 0 && Notification.permission === 'granted') {
        const latest = berita.find(b => b.id === newIds[0]);
        if (latest) {
          new Notification('📰 Berita Baru!', {
            body: latest.judul,
            icon: '/img/logo.png',
            tag: 'berita-baru',
          });
        }
      }

      prevBeritaIds.current = currentIds;
      localStorage.setItem('known_berita_ids', JSON.stringify(currentIds));
    };

    const interval = setInterval(checkNewBerita, 60000);
    return () => clearInterval(interval);
  }, [berita]);

  return null;
}