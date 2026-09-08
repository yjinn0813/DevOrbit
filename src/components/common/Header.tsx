import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import DarkMode from './DarkMode';

const Header = () => {
  const location = useLocation();
  const isDetailPage = location.pathname === '/detail';

  return (
    <header id='header' className='flex flex-row justify-between items-center px-3 py-4 border-b-2 border-primary bg-background'>
      <div className='flex flex-row gap-2 items-center'>
        <img src="/favicon/DevOrbit.svg" alt="DevOrbit" height="34" width="34" />
        <Logo className="text-xl" />
      </div>
      <div className='flex flex-row gap-4 items-center'>
        {isDetailPage && <SearchBar />}
        <DarkMode />
      </div>
    </header>
  )
}

export default Header;