
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon } from 'lucide-react';

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
      <div className="relative">
        <Switch checked={isDark} onCheckedChange={toggleDarkMode} className="data-[state=checked]:bg-slate-700 data-[state=unchecked]:bg-yellow-400" />
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className={`ml-1 transition-all duration-300 ${isDark ? 'opacity-0 translate-x-5' : 'opacity-100 translate-x-0'}`}>
            <Sun className="h-4 w-4 text-yellow-600" />
          </div>
          <div className={`ml-1 transition-all duration-300 ${isDark ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
            <Moon className="h-4 w-4 text-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
