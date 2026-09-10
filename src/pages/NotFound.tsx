/* 존재하지 않는 유저, 페이지 */

import {Link} from "react-router-dom";
import Starfield from '../components/common/Starfield';

const NotFound = () => {
  return (
    <div className="relative my-auto flex flex-col items-center justify-center text-center">
      <Starfield />

      <div className="relative z-10">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <p className="mt-4 text-2xl font-semibold dark:text-foreground">
          Page not found
        </p>
        <p className="mt-2 dark:text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-primary px-5 py-3 text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound;