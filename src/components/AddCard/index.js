import React,{ useState } from 'react';
//import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './AddCard.module.css';
import AuthService from "../services/auth.service";

const AddCard = () => {
    const [currencySelected, setCurrencySelected] = useState("UAH")
    const [typeSelected, setTypeSelected] = useState("CREDIT")
    const [paymentSystemSelected, setPaymentSystemSelected] = useState("VISA")

    //const navigate = useNavigate();

    function addCardHandler(event){
        event.preventDefault();
        event.target.reset();

        AuthService.addCard(currencySelected, typeSelected, paymentSystemSelected);
        AuthService.setUserAllCards();
        alert("Картка успішно додана до гаманця");
        //navigate("/main"); // main page do not re-render in this way
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
        
                <form onSubmit={addCardHandler} className={styles.form__addCard} >
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
                        <Link to="/main">На головну</Link>
                    </div>
                </form>
        );
    }

export default AddCard;