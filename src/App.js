import {Link, NavLink, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import StartPageLogInForm from './components/StartPageLogInForm';
import StartPageCodeForm from './components/StartPageCodeForm';
import MainPage from './components/MainPage';
import Menu from './components/Menu';
import Profile from './components/Profile';
import ChangeUserPhone from './components/ChangeUserPhone';
import ChangeUserEmail from './components/ChangeUserEmail';
import UploadIcon from './components/UploadIcon';
import AddCard from './components/AddCard';
import SecurityPage from './components/StaticPages/SecurityPage';
import RulesAndTermsPage from './components/StaticPages/RulesAndTermsPage';
import SecurityPageOutOfLogin from './components/StaticPages/SecurityPageOutOfLogin';
import RulesAndTermsPageOutOfLogin from './components/StaticPages/RulesAndTermsPageOutOfLogin';
import MoreAboutCashCreditPage from './components/StaticPages/MoreAboutCashCreditPage';
import AllCreditsPage from './components/Credits/AllCreditsPage';
import OpenCreditPage from './components/Credits/OpenCreditPage';
import SpecifyCreditPage from './components/Credits/SpecifyCreditPage';
import CheckCreditPage from './components/Credits/CheckCreditPage';
import MoneyTransferPage from './components/MoneyTransferPage';

function App() {
  const [menuActive, setMenuActive] = useState(false)
  return (
    <Routes>
    <Route path='/' element = {<StartPageLogInForm/>}/>
    <Route path='/codeForm' element = {<StartPageCodeForm/>}/>
    <Route path='/main' element = {<MainPage/>}/>
    <Route path='/menu' element = {<Menu active={menuActive}/>}/>
    <Route path='/profile' element = {<Profile/>}/>
    <Route path='/changeUserPhone' element = {<ChangeUserPhone/>}/>
    <Route path='/changeUserEmail' element = {<ChangeUserEmail/>}/>
    <Route path='/uploadIcon' element = {<UploadIcon/>}/>
    
    <Route path='/addCard' element = {<AddCard/>}/>

    <Route path='/allCredits' element = {<AllCreditsPage/>}/>
    <Route path='/openCredit' element = {<OpenCreditPage/>}/> 
    <Route path='/specifyCredit' element = {<SpecifyCreditPage/>}/> 
    <Route path='/checkCredit' element = {<CheckCreditPage/>}/> 

    <Route path='/moneyTransfer' element = {<MoneyTransferPage/>}/>

    <Route path='/security' element = {<SecurityPage/>}/>
    <Route path='/rules&terms' element = {<RulesAndTermsPage/>}/>
    <Route path='/securityOutOfLogin' element = {<SecurityPageOutOfLogin/>}/>
    <Route path='/rules&termsOutOfLogin' element = {<RulesAndTermsPageOutOfLogin/>}/>
    <Route path='/moreAboutCashCredit' element = {<MoreAboutCashCreditPage/>}></Route>
  </Routes>

  );
}

export default App;