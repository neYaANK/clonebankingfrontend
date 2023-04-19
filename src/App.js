import {NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import LogInForm from './components/LogInForm';
import Profile from './components/Profile';
import ChangeUserPhone from './components/ChangeUserPhone';
import ChangeUserEmail from './components/ChangeUserEmail';
import UploadIcon from './components/UploadIcon';

//Hello by Artem Nersesian
//Hello by Olena



function App() {
  
  return (
    <>
    <header>
      some header
      <p></p>
      <NavLink to='/profile'>Profile</NavLink>
    </header>
    
    <Routes>
      <Route path='/' element = {<LogInForm/>}/>
      <Route path='/profile' element = {<Profile/>}/>
      <Route path='/changeUserPhone' element = {<ChangeUserPhone/>}/>
      <Route path='/changeUserEmail' element = {<ChangeUserEmail/>}/>
      <Route path='/uploadIcon' element = {<UploadIcon/>}/>
    </Routes>

    <footer>
      some footer
    </footer>
    </>
   
   
  );
}

export default App;
