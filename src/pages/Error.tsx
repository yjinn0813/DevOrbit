/* API, 서버 에러 등 */

import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import Starfield from '../components/common/Starfield';

interface ErrorProps {
  onRetry?: () => void;
  title?: string;
  message: string;
}

const Error = ({ onRetry, title, message }: ErrorProps) => {
  useTitle('Error');
  const messageLines = message.split('\n');

  return (
    <div className="relative my-auto flex flex-col items-center justify-center text-center">
      <Starfield />

      <div className="relative z-10">
        <h1 className="text-7xl font-bold text-primary">Error</h1>

        <p className="mt-4 text-2xl font-semibold dark:text-foreground">
          {title}
        </p>

        <p className="mt-3 dark:text-muted-foreground whitespace-pre-line">
          {messageLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < messageLines.length - 1 && <br />}
            </span>
          ))}
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="cursor-pointer rounded-md bg-primary px-5 py-3 text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Try Again
            </button>
          )}

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