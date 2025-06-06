
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700 dark:text-gray-300">Dark mode</span>
      <Switch checked={isDark} onCheckedChange={toggleDarkMode} />
    </div>
  );
}
