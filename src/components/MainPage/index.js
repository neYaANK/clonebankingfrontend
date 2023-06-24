import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import styles from './MainPage.module.css';
import AuthService from "../services/auth.service";
import dateFormat from 'dateformat';
import apps__icon from '../images/apps__icon.svg';
import credits__icon from '../images/credits__icon.svg';
import payment__icon from '../images/payment__icon.svg';
import recharge__icon from '../images/recharge__icon.svg';
import transfer__icon from '../images/transfer__icon.svg';
import costs__icon from '../images/costs__icon.svg';
import card__icon from '../images/card__icon.svg';
import income__icon from '../images/income__icon.svg';
import history__title__icon from '../images/history__title__icon.svg';
import main__card__icon from '../images/main__card__icon.svg';
import MainPageHeader from '../MainPageComponents/MainPageHeader';
import MainPageFooter from '../MainPageComponents/MainPageFooter';

const MainPage = () => {

    const [currentUser, setCurrentUser] = useState(AuthService.getUserFullInfo())
    const [cards, setCards] = useState(AuthService.getUserAllCards().cards)
    const [selectedCard, setSelectedCard] = useState(AuthService.getSelectedCardInfo())
    const [active, setActive] = useState();
    const demoMessage = "Функція недоступна у демоверсії";
    const[cardOperations, setCardOperations] = useState(AuthService.getSelectedCardPayments())
    const[totalCosts, setTotalCosts] = useState(cardOperations.outgoingPayments.reduce((a,v) =>  a = a + v.outgoing , 0 ))
    const[totalIncome, setTotalIncome] = useState(cardOperations.incomingPayments.reduce((a,v) =>  a = a + v.incoming , 0 )) 

    const navigate = useNavigate();

    function findArrayElementById(array, id) {
        return array.find((element) => {
          return element.id === id;
        })
    }

    useEffect(() => {
        setActive(selectedCard.id)
        setSelectedCard((()=>findArrayElementById(AuthService.getUserAllCards().cards, selectedCard.id)))
        AuthService.setSelectedCardPayments(selectedCard.id)
    },[])

    function handleCardClick(id) {
        setActive(id)
        AuthService.setSelectedCardInfo(id)
        .then(()=> AuthService.setSelectedCardPayments(AuthService.getSelectedCardInfo().id))
        .then(()=>{
            setSelectedCard(AuthService.getSelectedCardInfo())
            setCardOperations(AuthService.getSelectedCardPayments())
            setTotalCosts(cardOperations.outgoingPayments.reduce((a,v) =>  a = a + v.outgoing , 0 ))
            setTotalIncome(cardOperations.incomingPayments.reduce((a,v) =>  a = a + v.incoming , 0 ))
        })
    
    }
    function handleCreditsButton() {
        navigate("/allCredits");
    }
    function handleMoneyTransferButton(){
        navigate("/moneyTransfer")
    }
//toFixed(2)
    const renderCards = cards.map(card => <div className={(active === card.id) ? styles.card__active : styles.card__unactive} key={card.id} onClick={() => handleCardClick(card.id)}>
        <div className={styles.card__view__blok}>
            {currentUser.name} {currentUser.surname}
            <p>$ {card.balance.toFixed(2)}</p>
            <p>Номер карти</p>
            <p>{card.cardNumber}</p>
        </div>
        <div className={styles.card__view__blok}>
            <img src={card__icon} className={styles.card__icon} alt="card__icon" />
            <div><p>Дата</p> <p>{dateFormat(card.expireDate, "mm/yy")}</p></div>
        </div>
    </div>)
const renderLastOperationsOutgoing = cardOperations.outgoingPayments.map(payment => <div className={styles.history__blok} key={payment.id} >
                                                <div className={styles.history__combo}>
                                                    <div className={styles.history__circle}></div>
                                                    <div className={styles.history__blok__value}>
                                                        <div className={styles.history__date}>{dateFormat(payment.issuedAt, "dd.mm.yy / hh:MM")}</div>
                                                        <div className={styles.history__type}>Вихідний платіж</div>
                                                    </div>
                                                </div>
                                                

                                                <div className={styles.history__price}>- {payment.outgoing.toFixed(2)} ₴</div>
                                        </div>)

const renderLastOperationsIncoming = cardOperations.incomingPayments.map(payment => <div className={styles.history__blok} key={payment.id} >
                                            <div className={styles.history__combo}>
                                                <div className={styles.history__circle__income}></div>
                                                <div className={styles.history__blok__value}>
                                                    <div className={styles.history__date}>{dateFormat(payment.issuedAt, "dd.mm.yy / hh:MM")}</div>
                                                    <div className={styles.history__type}>Вхідний платіж</div>
                                                </div>
                                            </div>
                                            
                                        <div className={styles.history__price}>+ {payment.incoming.toFixed(2)} ₴</div>
                                    </div>)                                   

    return (
        <>
            <div className={styles.container}>

                <MainPageHeader />

                <div className={styles.body}>

                    <div className={styles.upperLine}>
                        <span className={styles.span}>Картка</span>
                        <Link to='/addCard' className={styles.addCard}>+</Link>
                        <button onClick={() => alert(demoMessage)}><img src={payment__icon} className={styles.payment__icon} alt="payment__icon" /><b>Платежі</b></button>
                        <button onClick={() => alert(demoMessage)}><img src={recharge__icon} className={styles.recharge__icon} alt="recharge__icon" /><b>Зв’язок</b></button>
                        <button onClick={handleMoneyTransferButton}><img src={transfer__icon} className={styles.transfer__icon} alt="transfer__icon" /><b>Переказ коштів</b></button>
                        <button onClick={handleCreditsButton}><img src={credits__icon} className={styles.credits__icon} alt="credits__icon" /><b>Кредити</b></button>
                        <button onClick={() => alert(demoMessage)}><img src={apps__icon} className={styles.apps__icon} alt="apps__icon" /><b>Скарбничка</b></button>
                    </div>

                    <div className={styles.secondLine}>
                        <div className={styles.cardsList}>
                            <div className={styles.cards}>
                                {renderCards}
                            </div>
                        </div>

                        <div className={styles.mainArea}>
                            <div className={styles.cardInfo}>
                               
                                <div className={styles.selectedCard}>
                                    <div className={styles.card__view__blok}>
                                        {currentUser.name} {currentUser.surname}
                                        <p className={styles.balance}>$ {(selectedCard.balance).toFixed(2)}</p>
                                        <p className={styles.main__card__text}>Номер карти</p>
                                        <p className={styles.main__number__card}>{selectedCard.cardNumber}</p>
                                    </div>
                                    <div className={styles.card__view__blok__right}>
                                        <img src={main__card__icon} className={styles.main__card__icon} alt="main__card__icon" />
                                        <div><p>Дата</p> <p>{dateFormat(selectedCard.expireDate, "mm/yy")}</p></div>
                                    </div>
                                </div>
                                <div className={styles.cardOperations}>
                                    <div>
                                        <div className={styles.history__title}>
                                            <div>
                                                Історія останніх операцій
                                                <img src={history__title__icon} className={styles.history__title__icon} alt="history__title__icon" />
                                            </div>
                                            <div className={styles.history__all} onClick={() => alert(demoMessage)}>
                                                <div>
                                                    Переглянути <br></br> повністю
                                                </div>
                                                <div>
                                                    &#10095;
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.history__display__flex__container}>
                                            
                                             {renderLastOperationsOutgoing}
                                             {renderLastOperationsIncoming}
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className={styles.mainArea__footer}>
                                <div className={styles.mainArea__footer__title}>
                                    Статистика
                                </div>
                                <div className={styles.mainArea__blok}>
                                    <div className={styles.mainArea__blok__value}>
                                        <div className={styles.mainArea__blok__value__title}>
                                            <div className={styles.mainArea__blok__value__title__name}>
                                                <img src={costs__icon} className={styles.costs__icon} alt="costs__icon" />
                                                <div>Витрати</div>
                                            </div>
                                            <div>
                                                <b>- {totalCosts.toFixed(2)} ₴</b>
                                            </div>
                                        </div>
                                        <div>
                                            Виконаних транзакцій було {cardOperations.outgoingPayments.length}
                                        </div>
                                        <div className={styles.history__display__flex}>
                                       {renderLastOperationsOutgoing}
                                        </div>
                                    </div>
                                    <div className={styles.mainArea__blok__value}>
                                        <div className={styles.mainArea__blok__value__title}>
                                            <div className={styles.mainArea__blok__value__title__name}>
                                                <img src={income__icon} className={styles.income__icon} alt="income__icon" />
                                                <div>Надходження</div>
                                            </div>
                                            <div>
                                                <b>+ {totalIncome.toFixed(2)} ₴</b>
                                            </div>
                                        </div>
                                        <div>
                                            Виконаних транзакцій було {cardOperations.incomingPayments.length}
                                        </div>
                                        <div className={styles.history__display__flex}>
                                            {renderLastOperationsIncoming}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <MainPageFooter />

            </div>
        </>

    );
}

export default MainPage;
