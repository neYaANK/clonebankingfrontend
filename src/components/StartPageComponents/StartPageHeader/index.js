import React from 'react';
import './StartPageHeader.css';
import logo__two from '../../images/logo__two.svg';
import { useNavigate } from "react-router-dom";

const StartPageHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="App-header">
      <div className="header__flex">
        <div onClick={()=>navigate('/')} className="header__flex__logo">
          <img src={logo__two} className="body__flex__logo__imeg" alt="logo__two"/>
        </div>
        <div className="header__flex__text__blok">
        </div>
      </div>
    </header >
  );
}

export default StartPageHeader;
