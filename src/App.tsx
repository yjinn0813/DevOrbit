import { Route, Routes } from 'react-router-dom'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import './App.css'

export default function App() {
  return (
    <div id='container'>
      <Header />
      <main id='wrap'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}