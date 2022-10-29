import React from 'react';

import ColourModeProvider, { ColourModeContext } from './ColourModeProvider';
import { ToggleButton, Checkbox } from './ThemeButton.styled';

export function ColorModeToggleButton() {
  const getSavedColorModePreference = () => {
    const savedMode = window.localStorage.getItem('color-mode');
    if (savedMode === 'dark') return true;
    return false;
  };

  return (
    <ColourModeProvider>
      <ColourModeContext.Consumer>
        {(context: any) => (
          <ToggleButton>
            <Checkbox type="checkbox" onClick={context.cycleToggleMode} defaultChecked={getSavedColorModePreference()} />
            <span />
          </ToggleButton>
        )}
      </ColourModeContext.Consumer>
    </ColourModeProvider>
  );
}

export default ColorModeToggleButton;
