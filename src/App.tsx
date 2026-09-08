import { Route, Routes } from 'react-router-dom'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import './index.css';

export default function App() {
  return (
    <div id='container' className='flex flex-col min-h-screen'>
      <Header />
      <main id='wrap' className='flex flex-col grow'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:username" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}