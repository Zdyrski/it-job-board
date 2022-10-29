import React, {
  useEffect, useState, createContext,
} from 'react';
import { theme as defaultTheme, darkTheme } from '../../stitches.config';

type ColourMode = string;
type MediaTheme = string;
type ColourModeProviderType = {colorMode: ColourMode, cycleToggleMode: () => void};

export const ColourModeContext = createContext<ColourModeProviderType>(
  {} as ColourModeProviderType,
);

const availableThemes: Record<string, string> = {
  dark: darkTheme.className,
  light: defaultTheme.toString(), // how to be consistent?
};

const saveColorMode = (newMode: ColourMode) => {
  try {
    if (typeof newMode === 'string') { window.localStorage.setItem('color-mode', newMode); }
  } catch (e) {
    console.warn(e);
  }
};

const getMediaTheme = (): MediaTheme => {
  // If they haven't been explicitly set, let's check the media query
  const mql = matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  if (hasMediaQueryPreference) return mql.matches ? 'dark' : 'light';
  return 'dark';
};

const getSavedColorModePreference = (): ColourMode => {
  try {
    const savedMode = window.localStorage.getItem('color-mode');
    // If the user has explicitly chosen a colour mode,
    // let's use it. Otherwise, this value will be null.
    if (typeof savedMode === 'string') return savedMode;
  } catch (e) {
    // When Chrome in incognito, localStorage cannot be accessed
    console.warn(e);
    return 'dark';
  }
  return 'dark';
};

const useColorMode = (): ColourModeProviderType => {
  const [colorMode, setColorMode] = useState('');
  const html = document.documentElement;

  // Set color mode in localStorage, as well as in the html tag
  const applyColorMode = (newMode: ColourMode) => {
    html.classList.remove(availableThemes[colorMode]);
    html.classList.add(availableThemes[newMode]);
    setColorMode(newMode);
  };

  let savedColorMode = getSavedColorModePreference();
  if (savedColorMode == null) {
    // If no localStorage exists, use the user's OS setting
    savedColorMode = getMediaTheme();
  }
  // html.setAttribute("data-color-mode", savedColorMode);
  html.classList.add(availableThemes[savedColorMode]);
  // Set initial state
  useEffect(() => {
    setColorMode(savedColorMode);
  }, [savedColorMode]);

  // Listen out for if a user changes operating system mode,
  // but don't save the change in local storage.
  // The only two options here are dark or light.
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      applyColorMode(e.matches ? 'dark' : 'light');
    });

  window
    .matchMedia('(prefers-color-scheme: light)')
    .addEventListener('change', (e) => {
      applyColorMode(e.matches ? 'light' : 'dark');
    });

  const cycleToggleMode = (): void => {
    const keys = Object.keys(availableThemes);
    let index = keys.indexOf(colorMode);
    if (index === keys.length - 1) {
      index = 0;
    } else if (index >= 0) {
      index += 1;
    }
    const newMode = keys[index];
    applyColorMode(newMode);
    saveColorMode(newMode);
  };

  return { colorMode, cycleToggleMode };
};

type ColourModeProviderProps = {
  children: any;
};

function ColourModeProvider({ children }: ColourModeProviderProps) {
  const { colorMode, cycleToggleMode } = useColorMode();
  // const value = useMemo(() => ({ colorMode, cycleToggleMode }), []);
  return (
    <ColourModeContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        colorMode,
        cycleToggleMode,
      }}
    >
      {children}
    </ColourModeContext.Provider>
  );
}

export default ColourModeProvider;
