import { useEffect, useState } from 'react';

const useTheme = () => {
  const toggleButton = document.querySelector('.toggle-button');

  const [theme, setTheme] = useState('light');

  const themeHandler = () => {
    toggleButton.addEventListener('click', () => {
      const toggleTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(toggleTheme);
    });
  };

  useEffect(() => {
    themeHandler();
  }, [theme]);

  return theme;
};
export default useTheme;
