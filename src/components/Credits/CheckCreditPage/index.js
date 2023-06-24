import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./CheckCreditPage.css";
import MainPageHeader from '../../MainPageComponents/MainPageHeader';
import MainPageFooter from '../../MainPageComponents/MainPageFooter';
import dateFormat from 'dateformat';
import AuthService from "../../services/auth.service";
import go_back_arrow_icon from '../../images/go_back_arrow_icon.png';
import media_social_icon from '../../images/media_social_icon.png';
import credits_icon from '../../images/credits_icon.png';
import ModalCreditOpen from '../ModalCreditOpen';

const CheckCreditPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const demoMessage = "Функція недоступна у демоверсії";

    const typeId = location.state.typeId;
    const creditSum = location.state.creditSum;
    const creditTerm = location.state.creditTerm;
    const pageTitle = location.state.pageTitle;
    const icon = location.state.icon;
    const rate = location.state.rate;

    const [currentUser, setCurrentUser] = useState(AuthService.getUserFullInfo())
    const [cards, setCards] = useState(Array.from(AuthService.getUserAllCards().cards))
    const [selectedCard, setSelectedCard] = useState(AuthService.getSelectedCardInfo())

    const[modalActive, setModalActive] = useState(false)
    
    const [active, setActive] = useState();

    useEffect(() => {
       setActive(selectedCard.id)
      },[]);

    function handleCardClick(id) {
        setActive(id)
        AuthService.setSelectedCardInfo(id)
        .then(()=>setSelectedCard(AuthService.getSelectedCardInfo()))
    }
    
    const renderCards = cards.map(card => <div className={(active === card.id) ? 'card__active' : 'card__unactive'}  key={card.id} onClick={() => handleCardClick(card.id)}>
    <div >
        
        <p className='card__balance'>{card.balance} ГРН</p> 
        <p className='card__number'>{card.cardNumber}</p>
       
    </div>
    <img className='card__sign' src={media_social_icon}/>
    </div>)

    function handleOpenCreditButton(){
        AuthService.addCredit(typeId, creditSum, selectedCard.cardNumber)
        .then(()=>AuthService.setUserAllCredits())
        .then(()=>console.log(AuthService.getUserAllCredits()))
        .then(()=>AuthService.setUserAllCards())
    }

    return (
        <>
        <MainPageHeader/>
        <div className='upper__line'>
            <div className='upper__line__combo__1'>
                <Link onClick={() => navigate(-1)}>
                    <img className='upper__line__go__back__img' src={go_back_arrow_icon}></img>
                </Link>
                <img className='upper__line__img' src={icon}></img>
                <div className='upper__line__title'>{pageTitle}</div>
            </div>
            <div className='get__consult'>
                <button className='get__consult__button' onClick={() => alert(demoMessage)}>Отримати консультацію</button>
            </div>
        </div>
         <div className='credits__container__check'>
         <div className='credits__title'>Перевірте дані</div>
         
         <div  className='credits__types__check'>
                    <div className='credit__result'>
                            <div className='credit__result__text2'>Сума</div>
                            <div className='credit__result__text1'>{creditSum} грн</div>
                            <div className='credit__result__text2'>Щомісячний платіж</div>
                            <div className='credit__result__text1'>{(creditSum/creditTerm+100).toFixed(2)} грн</div>
                            <div className='credit__result__text2'>Реальна відсоткова ставка</div>
                            <div className='credit__result__text1'>{rate}%</div>
                            <div className='credit__result__text2'>Реальні витрати за кредитом</div>
                            <div className='credit__result__text1'>{((creditSum/creditTerm+100)*creditTerm).toFixed(2)} грн</div>
                            <div className='credit__result__text2'>Загальна вартість кредиту</div>
                            <div className='credit__result__text1'>{((creditSum/creditTerm+100)*creditTerm).toFixed(2)} грн</div>
                            <div className='credit__result__text2'>Строк договору</div>
                            <div className='credit__result__text1'>{creditTerm} міс.</div>
                            <div className='credit__result__text2'>Автопоповнення</div>
                            <div className='credit__result__text1'>Так</div>
                    </div>
                    
                    <div className='credit__additional__info'>
                        <div className='credits__title'>Куди надіслати договір:</div>
                        <p className='credit__result__text2'>Отримати договір на електронну пошту</p>
                        <input className='credit__result__email__input' name="email"
                                type="email"
                                placeholder="Email"
                            />
                        <div className='credits__title'>Оберіть спосіб внесення коштів</div>
                         
                        <div className='cardsList'>
                            <div className='cards__check'>
                                {renderCards}
                            </div>
                                <div className='selectedCard'>
                                        <div className='selectedCard__main__info__'>
                                            <div className='selectedCard__username'>{currentUser.name} {currentUser.surname}</div>
                                            <div className='selectedCard__balance'>$ {selectedCard.balance}</div>
                                            <p>Номер карти</p>
                                            <div className='selectedCard__number'>{selectedCard.cardNumber}</div>
                                        </div>
                                        <div className='selectedCard__date'>
                                        <img className='card__sign__white' src={media_social_icon}/>
                                        <div>
                                            <span>Дата</span>
                                            <p className='selectedCard__date__value'> {dateFormat(selectedCard.expireDate, "mm/yy")}</p>
                                        </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                            
            </div>
            
         </div>
         <div className='credit__buttons__wrap'>
                        <div className='credit__info__buttons'>
                            <button className='credit__info__button__1' onClick={() => alert(demoMessage)}>Паспорт кредиту </button>
                            <button className='credit__info__button__2' onClick={() => alert(demoMessage)}>Переглянути договір </button>
                            <Link to='/addCard'>+ Додати іншу картку</Link>
                        </div>
                        
                        <button className='button__open__credit' onClick={()=>{handleOpenCreditButton(); setModalActive(true)} }>Відкрити кредит</button>

                    </div>
          
        <MainPageFooter/>   
        </div>

        <ModalCreditOpen active={modalActive} setActive={setModalActive}>
      <div className='modal__credits'>
            <div className='modal__credits__congrats'>
                <img className='modal__credits__img' src={credits_icon}></img>
                <div className='modal__credits__text'>Вітаємо!</div>
                <div className='modal__credits__text'>Ви успішно відкрили кредит</div>
            </div>
            <div className='modal__credits__buttons'>
                <button className='modal__credits__button__contract' onClick={() => navigate("/allCredits")}>Мої кредити</button>
                <button className='modal__credits__button__to__main' onClick={() => navigate('/main')}>На головну</button>
            </div>
      </div>
        </ModalCreditOpen>
        </>
       
    );
}

export default CheckCreditPage;
