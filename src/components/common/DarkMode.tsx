import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "./../ui/button";

const DarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");

    if (savedTheme === null) {
      return true; // default: dark mode
    }

    return savedTheme === "true";
    // 저장된 테마 설정이 있으면 해당 값 적용
    // (localStorage는 값을 문자열로 저장함)
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("darkMode", String(isDark));
  }, [isDark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark((prev) => !prev)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className='bg-zinc-800 border-0 cursor-pointer dark:bg-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700'
    >
      {isDark ? <FiSun className="text-orange-600" /> : <FiMoon className="text-yellow-500" />}
    </Button>
  );
};

export default DarkMode;