/* API, 서버 에러 등 */

import { Link } from 'react-router-dom';
import Starfield from '../components/common/Starfield';

const Error = () => {
  return (
    <div className="relative my-auto flex flex-col items-center justify-center text-center">
      <Starfield />

      <div className="relative z-10">
        <h1 className="text-7xl font-bold text-primary">Error</h1>

        <p className="mt-4 text-2xl font-semibold dark:text-foreground">
          Something went wrong
        </p>

        <p className="mt-3 dark:text-muted-foreground">
          We couldn't load the data.
          <br />
          Please try again later.
        </p>

        <div className="mt-6 flex gap-4">
          <button
            type="button"
            className="cursor-pointer rounded-md bg-primary px-5 py-3 text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Try Again
          </button>

          <Link
            to="/"
            className="rounded-md bg-secondary px-5 py-3 text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;