import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo__card from '../images/logo__card.svg';
import AuthService from "../services/auth.service";
import './CodeForm.css';
import StartPageFooter from '../StartPageComponents/StartPageFooter';
import StartPageHeader from '../StartPageComponents/StartPageHeader';

const StartPageCodeForm = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  
  const handleForm = (event) => {
      event.preventDefault();
      event.target.reset();

      AuthService.verify(code);

      const fullInfo = AuthService.getUserFullInfo();
      console.log("user full info after VERIFY : ");
      console.log(fullInfo);

      const user = AuthService.getCurrentUser();
      alert(user.id +'\n' + user.name + '\n'+user.surname + '\n' + user.phoneNumber + '\n' + user.token);
      
      const token = AuthService.getCurrentUser().token;
      if (token !== null){
          navigate("/main");
      }
      else{
          alert("Некоректний код. Спробуйте ще раз");
      }
  }

  const handleInput = () => ({ target }) => {
    setCode(target.value);
}

    return (
      <div className="App">
        <StartPageHeader/>

        <div className="body">
          <div className="body__flex">
            <div className="body__flex__login__form">
              <div className="body__flex__login__form__title">Введіть код</div>
              <form className="body__flex__login__form__container" onSubmit={handleForm}>
                <div className="body__flex__login__form__container__input">
                  <input type="text"
                    placeholder="Код:" name="code"
                    required
                    value={code}
                    onChange={handleInput()}>
                  </input>
                </div>
                <button className="body__flex__login__form__container__button__exit" type='submit'>Вхід</button>
              </form>
            </div>
            <div className="body__flex__imeg">
              <img src={logo__card} className="body__flex__imeg__logo" alt="logo__card" />
            </div>
          </div>
        </div>

       <StartPageFooter/>
      </div >
    );
  }

export default StartPageCodeForm;
