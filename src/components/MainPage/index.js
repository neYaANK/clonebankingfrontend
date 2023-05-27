import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";//
import styles from './MainPage.module.css';
import AuthService from "../services/auth.service";
import dateFormat from 'dateformat';
import apps__icon from '../images/apps__icon.svg';
import credits__icon from '../images/credits__icon.svg';
import payment__icon from '../images/payment__icon.svg';
import recharge__icon from '../images/recharge__icon.svg';
import transfer__icon from '../images/transfer__icon.svg';
import card__icon from '../images/card__icon.svg';
import MainPageHeader from '../MainPageComponents/MainPageHeader';
import MainPageFooter from '../MainPageComponents/MainPageFooter';

const MainPage = () => { 

    const [currentUser, setConstUser] = useState(AuthService.getUserFullInfo())
    const [cards, setCards] = useState(Array.from(AuthService.getUserAllCards().cards))
    const [selectedCard, setSelectedCard] = useState(AuthService.getSelectedCardInfo())

    const navigate = useNavigate();//
     
    useEffect(()=>{// re-rending if selectedCard changed
     console.log("main page did mount");
     console.log(cards);
     console.log("SELECTED CARD");
     console.log(AuthService.getSelectedCardInfo());
    }, [selectedCard])
    
    function handleCardClick (id) {
     AuthService.setSelectedCardInfo(id);
     setSelectedCard(AuthService.getSelectedCardInfo());
    }
    function handleCreditsButton(){//
        navigate("/allCredits");//
    }//

    const renderCards = cards.map(card => <div className={styles.card} key={card.id} onClick={() => handleCardClick(card.id)}>
            <div className="card__view__blok">
                {currentUser.name} {currentUser.surname}
                <p>$ {card.balance}</p>
                <p>Номер карти</p>
                <p>{card.cardNumber}</p>
            </div>
            <div className="card__view__blok">
                <img src={card__icon} className="card__icon" alt="card__icon" />
                <p>Дата {dateFormat(card.expireDate, "mm/yy")}</p>
            </div>
        </div>)

        return (
            <>
                <div className={styles.container}>

                    <MainPageHeader/>

                    <div className={styles.body}>

                        <div className={styles.upperLine}>
                            <span className={styles.span}>Гаманець</span>
                            <Link to='/addCard' className={styles.addCard}>+</Link>
                            <button><img src={payment__icon} className="payment__icon" alt="payment__icon" />Платежі</button>
                            <button><img src={recharge__icon} className="recharge__icon" alt="recharge__icon" />Поповнення</button>
                            <button><img src={transfer__icon} className="transfer__icon" alt="transfer__icon" />Переказ коштів</button>
                            <button onClick={handleCreditsButton}><img src={credits__icon} className="credits__icon" alt="credits__icon" />Кредити</button>
                            <button><img src={apps__icon} className="apps__icon" alt="apps__icon" />Усі послуги</button>
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
                                        <div className="card__view__blok">
                                            {currentUser.name} {currentUser.surname}
                                            <p>$ {selectedCard.balance}</p>
                                            <p>Номер карти</p>
                                            <p>{selectedCard.cardNumber}</p>
                                        </div>
                                        <div className="card__view__blok">
                                            <img src={card__icon} className="card__icon" alt="card__icon" />
                                            <p>Дата {dateFormat(selectedCard.expireDate, "mm/yy")}</p>
                                        </div>
                                    </div>
                                    <div className={styles.cardOperations}>Історія останніх операцій у розробці</div>
                                </div>
                                <div className={styles.statisticsTextHeader}>Статистика витрат</div>
                                <div className={styles.statistics}>Діаграма у розробці</div>
                            </div>
                        </div>

                    </div>

                    <MainPageFooter/>

                </div>
            </>

        );
    }

export default MainPage;
