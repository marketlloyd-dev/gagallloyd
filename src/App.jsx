// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import NewsChecker from './components/NewsChecker';
import Analytics from './components/Analytics';
import Beranda from './pages/Beranda';
import Information from './pages/Information';
import SeputarHimmah from './pages/SeputarHimmah';
import Galeri from './pages/Galeri';
import Agenda from './pages/Agenda';
import Admin from './pages/Admin';

export default function App() {
  return (
    <div className="min-h-screen bg-[#004d24] font-poppins flex flex-col">
      <Analytics />
      <NewsChecker />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/informasi" element={<Information />} />
          <Route path="/berita" element={<SeputarHimmah />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}