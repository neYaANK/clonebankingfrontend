import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LogInForm from './components/LogInForm';

//Hello by Artem Nersesian
//Hello by Olena



function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<LogInForm/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
