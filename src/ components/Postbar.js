import React from 'react';
import { useDarkMode } from './DarkModeContext';
import '../assets/css/index.scss';


function Postbar() {

  const { isDarkMode } = useDarkMode();

  return (
    <React.Fragment key={isDarkMode}>
      <div className={`postbar m-0 me-lg-1 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>

      </div>
    </React.Fragment>
  );
}

export default Postbar;

