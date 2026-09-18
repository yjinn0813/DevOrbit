import { Route, Routes } from 'react-router-dom'
import { TooltipProvider } from "./components/ui/tooltip";
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import './index.css';

export default function App() {
  return (
    <TooltipProvider>
      <div id='container' className='flex flex-col min-h-screen bg-surface-light dark:bg-background'>
        <Header />
        <main id='wrap' className='flex flex-1 flex-col mx-auto w-full max-w-360'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:username" element={<Detail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  )
}