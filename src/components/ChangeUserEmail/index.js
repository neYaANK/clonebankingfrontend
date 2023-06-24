import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import styles from './ChangeUserEmail.module.css';
import { useNavigate, Link } from "react-router-dom";
import ModalCreditOpen from '../Credits/ModalCreditOpen';
import MainPageHeader from '../MainPageComponents/MainPageHeader';
import MainPageFooter from '../MainPageComponents/MainPageFooter';
import go_back_arrow_icon from '../images/go_back_arrow_icon.png';
import success_icon from '../images/success_icon.png';

const ChangeUserEmail =()=> {   
    const[email, setEmail] = useState(AuthService.getUserFullInfo().email);
    const navigate = useNavigate();

    const[modalActive, setModalActive] = useState(false)

    const demoMessage = "Функція недоступна у демоверсії";

    const handleForm =(event)=> {
        event.preventDefault();
        //event.target.reset();
          
        AuthService.changeUserEmail(event.target.email.value)
        .then(()=>AuthService.setUserFullInfo())
        .then(()=>setModalActive(true))
        //.then(()=>navigate('/profile'))
    }

        return (
            <> <MainPageHeader/>
            <div className='upper__line'>
                <div className='upper__line__combo_'>
                    <div>
                    <Link onClick={() => navigate(-1)}>
                    <img className='upper__line__go__back__img' src={go_back_arrow_icon}></img>
                </Link>
                    </div>
                </div>
                <div className='get__consult'>
                    <button className='get__consult__button' onClick={() => alert(demoMessage)}>Отримати консультацію</button>
                </div>
            </div>

            <form className={styles.block} onSubmit={handleForm}>
                <label className={styles.label}> Введіть нову електронну пошту:</label>
                <input className={styles.input_} name="email"
                    type="email"
                    placeholder="Email"
                />
                <input className={styles.submit__change__button}
                    type="submit"
                    value="Підтвердити"
                />
            </form>  
            <MainPageFooter/> 

                <ModalCreditOpen active={modalActive} setActive={setModalActive}>
      <div className='modal__credits'>
            <div className='modal__credits__congrats'>
                <img className='modal__credits__img' src={success_icon}></img>
                <div className='modal__credits__text'>Вітаємо!</div>
                <div className='modal__credits__text'>Адресу електронної пошти</div>
                <div className='modal__credits__text'>успішно змінено</div>
            </div>
            <div className='modal__credits__buttons'>
                <button className='modal__credits__button__to__main' onClick={() => navigate('/profile')}>У профіль</button>
            </div>
      </div>
        </ModalCreditOpen> 
            </>
           
        );
    }


export default ChangeUserEmail;
