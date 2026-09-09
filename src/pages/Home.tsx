import Logo from '../components/common/Logo';
import SearchBar from '../components/common/SearchBar';
import Starfield from '../components/common/Starfield';

const Home = () => {
  return (
    <div className="relative flex flex-col items-center">
      <Starfield />
      <div className="flex flex-col items-center justify-center mt-44 mb-10">
        <Logo className="text-6xl max-[420px]:text-5xl" />
        <p className="text-zinc-500 text-lg mt-2 dark:text-foreground max-[420px]:text-base">
          Explore the developer behind the code.
        </p>
      </div>
      <SearchBar className="min-w-72 h-12 px-2 border-secondary border-2" />
    </div>
  )
}

export default Home;