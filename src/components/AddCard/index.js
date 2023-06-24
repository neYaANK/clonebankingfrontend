import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './AddCard.module.css';
import AuthService from "../services/auth.service";
import MainPageHeader from '../MainPageComponents/MainPageHeader';
import MainPageFooter from '../MainPageComponents/MainPageFooter';
import ModalCreditOpen from '../Credits/ModalCreditOpen';
import go_back_arrow_icon from '../images/go_back_arrow_icon.png';
import success_icon from '../images/success_icon.png';

const AddCard = () => {
    const [currencySelected, setCurrencySelected] = useState("UAH")
    const [typeSelected, setTypeSelected] = useState("CREDIT")
    const [paymentSystemSelected, setPaymentSystemSelected] = useState("VISA")

    const[modalActive, setModalActive] = useState(false)

    const demoMessage = "Функція недоступна у демоверсії";

    const navigate = useNavigate();

    function addCardHandler(event){
        event.preventDefault();
        event.target.reset();

        AuthService.addCard(currencySelected, typeSelected, paymentSystemSelected)
        .then(()=>AuthService.setUserAllCards())
        .then(()=>setModalActive(true))
        //.then(()=>navigate(-1)); //
    }

    function setType (event) {
        setTypeSelected(event.target.value)
    }

    function setCurrency (event) {
        setCurrencySelected(event.target.value)
    }

    function setPaymentSystem (event) {
        setPaymentSystemSelected(event.target.value)
        console.log(paymentSystemSelected);
    }

        return (
            <>
            <MainPageHeader/>
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

                <form onSubmit={addCardHandler} className={styles.form__addCard} >
                    <div className='upper__line__title'>Оберіть тип картки:</div>
                    <select className={styles.form__addCard__select}  value={typeSelected} onChange={setType}>
                        <option value="CREDIT">Кредитна</option>
                        <option value="DEBIT">Дебетова</option>
                    </select>

                    <select className={styles.form__addCard__select} value={paymentSystemSelected} onChange={setPaymentSystem}>
                        <option value="VISA">VISA</option>
                        <option value="MASTERCARD">MASTERCARD</option>
                    </select>

                    <select className={styles.form__addCard__select} value={currencySelected} onChange={setCurrency}>
                        <option value="UAH">UAH</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                    
                    <div>
                        <button type="submit" className={styles.form__addCard__button}>Додати карту</button>
        
                    </div>
                </form>
                <MainPageFooter/> 

                <ModalCreditOpen active={modalActive} setActive={setModalActive}>
      <div className='modal__credits'>
            <div className='modal__credits__congrats'>
                <img className='modal__credits__img' src={success_icon}></img>
                <div className='modal__credits__text'>Вітаємо!</div>
                <div className='modal__credits__text'>Картка успішно додана до гаманця</div>
            </div>
            <div className='modal__credits__buttons'>
                <button className='modal__credits__button__to__main' onClick={() => navigate('/main')}>На головну</button>
            </div>
      </div>
        </ModalCreditOpen>
            </>
            
        );
    }

export default AddCard;