import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from './../ui/button';
import Logo from './Logo';
import SearchBar from './SearchBar';
import DarkMode from './DarkMode';

const Header = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/detail/');
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 모바일에서 검색창 오픈

  return (
    <header id='header' 
      className='border-b-2 border-secondary bg-surface-light dark:bg-background'
    >
      <div className='w-full mx-auto max-w-360 flex flex-row items-center justify-between px-3 py-4'>
        <Link to="/" className='flex flex-row gap-2 items-center'>
          <img src="/favicon/DevOrbit.svg" alt="DevOrbit" height="34" width="34" />
          <Logo className="text-xl" />
        </Link>

        {isDetailPage && (
          <div className='flex flex-row gap-4 items-center'>
            {/* desktop */}
            <div className='hidden sm:block'>
              <SearchBar className='min-w-3xs border-secondary border-2 px-1'/>
            </div>

            {/* mobile */}
            <Button variant="ghost"
              size='icon'
              onClick={() => setIsSearchOpen((prev)=> !prev)}
              className='rounded-full bg-zinc-800 hover:bg-zinc-200 dark:bg-foreground dark:hover:bg-zinc-700 sm:hidden'
              aria-label='open searchbar'
              aria-expanded={isSearchOpen}
            >
              <Search className='size-4 font-semibold text-foreground dark:text-background'/>
            </Button>

            <DarkMode />
          </div>
        )}

        {!isDetailPage && <DarkMode />}
      </div>

      {/* Mobile Search */}
      {isDetailPage && isSearchOpen && (
        <div className="px-4 pb-4 sm:hidden">
          <SearchBar className="w-full border-2 border-secondary px-1" />
        </div>
      )}
    </header>
  )
}

export default Header;