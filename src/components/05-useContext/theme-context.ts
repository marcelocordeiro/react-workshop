import { createContext } from 'react';
import type { PaletteMode } from '@mui/material';

interface ThemeContextType {
  toggleTheme: () => void;
  mode: PaletteMode;
}

export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: 'dark',
});
