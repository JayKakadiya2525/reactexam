import React from 'react';
import { useDarkMode } from './DarkModeContext';
import '../assets/css/index.scss';

function Friend() {

  const { isDarkMode } = useDarkMode();

  return (
    <React.Fragment>
      <div className={`friend m-0 me-lg-1 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>

      </div>
    </React.Fragment>
  );
}

export default Friend;
