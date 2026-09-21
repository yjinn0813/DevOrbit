/* scroll to top btn */

import { useState, useEffect } from 'react';

const TopBtn = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(false);

  // 스크롤시 등장 타이밍 제어
  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = window.innerHeight / 2;
      setIsShow(window.scrollY > triggerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 푸터 감지
  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <button className={`
        fixed right-4 bottom-4.5 z-100 px-2.5 py-1
        rounded-full bg-primary cursor-pointer
        text-lg font-bold text-foreground
        transition-all duration-250 ease-in-out
        ${isShow
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-5 opacity-0 pointer-events-none'}
        max-sm:right-3 max-sm:bottom-3 max-sm:text-[15px]
        ${isFooterVisible ? 'bottom-25' : ''}
      `} 
      onClick={handleTop}
    >↑</button>
  )
}

export default TopBtn;