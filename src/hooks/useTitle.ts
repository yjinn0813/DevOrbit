/* 페이지 제목 동적 렌더링 */

import { useEffect } from 'react';

const DEFAULT_TITLE = 'DevOrbit';

const useTitle = (title?: string) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${DEFAULT_TITLE}`;
    } else {
      document.title = DEFAULT_TITLE;
    }

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
};

export default useTitle;