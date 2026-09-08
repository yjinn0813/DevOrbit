import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "./../ui/button";

const DarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
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
      className='bg-zinc-800 border-0 dark:bg-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700'
    >
      {isDark ? <FiSun className="text-orange-600" /> : <FiMoon className="text-yellow-500" />}
    </Button>
  );
};

export default DarkMode;