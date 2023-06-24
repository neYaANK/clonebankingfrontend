// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Profile.module.css';
// import './Profile.module.css';
// import AuthService from '../services/auth.service';
// import MainPageHeader from '../MainPageComponents/MainPageHeader';


// class Profile extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { currentUser: {}, image: "" }
//     }

//     componentDidMount() {
//         console.log("profile did mount");
//         const user = AuthService.getUserFullInfo();
//         this.setState({ currentUser: user });

//         const image = AuthService.getUserImage();
//         this.setState({ image: image });

//         console.log("saved in localStorage image " + image);
//         console.log("this.state image " + this.state.image);
//     }

//     render() {

//         return (
//             <>
//                 <div className={styles.container}>
//                     <MainPageHeader />
//                     <div className={styles.profile__title}>
//                         <Link className={styles.button__main__page} to="/main">На головну</Link>
//                         <h2>Налаштування профілю</h2>
//                     </div>
//                     <div className={styles.profile}>
//                         <div className={styles.profile__blok}>
//                             <h4>Загальна інформація</h4>
//                             <div>Фото профілю</div>
//                             <div className={styles.block}>
//                                 <img className={styles.img} src={`data:;base64,${this.state.image}`} alt='avatar'></img>
//                                 <Link className={styles.link} to="/uploadIcon">Редагувати</Link>
//                             </div>
//                         </div>
//                         <div className={styles.profile__blok}>
//                             <div className={styles.profile__blok__info}>
//                                 <label>Прізвище:</label>
//                                 <div className={styles.profile__blok__info__column}>{this.state.currentUser.surname}</div>
//                             </div>
//                             <div className={styles.profile__blok__info}>
//                                 <label>Ім'я:</label>
//                                 <div className={styles.profile__blok__info__column}>{this.state.currentUser.name}</div>
//                             </div>
//                             <div className={styles.profile__blok__info}>
//                                 <label>По-батькові:</label>
//                                 <div className={styles.profile__blok__info__column}>{this.state.currentUser.thirdName}</div>
//                             </div>
//                             <div className={styles.profile__blok__info}>
//                                 <label>Дата народження:</label>
//                                 <div className={styles.profile__blok__info__column}>{this.state.currentUser.birthday}</div>
//                             </div>
//                         </div>
//                         <div className={styles.profile__blok}>
//                             <div className={styles.profile__blok__info__chang}>
//                                 <div>
//                                     <label>Фінансовий номер:</label>
//                                     <div className={styles.profile__blok__info__column}>{this.state.currentUser.phoneNumber}</div>
//                                 </div>
//                                 <Link className={styles.profile__blok__link} to="/changeUserPhone">Змінити</Link>
//                             </div>
//                             <div className={styles.profile__blok__info__chang}>
//                                 <div>
//                                     <label>Фінансовий email:</label>
//                                     <div className={styles.profile__blok__info__column}>{this.state.currentUser.email}</div>
//                                 </div>
//                                 <Link className={styles.profile__blok__link} to="/changeUserEmail">Змінити</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </>

//         );
//     }
// }

// export default Profile;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';
import './Profile.module.css';
import AuthService from '../services/auth.service';
import MainPageHeader from '../MainPageComponents/MainPageHeader';
import black__arrow__down__icon from '../images/black__arrow__down__icon.svg';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { currentUser: {}, image: "" }
    }

    componentDidMount() {
        console.log("profile did mount");
        const user = AuthService.getUserFullInfo();
        this.setState({ currentUser: user });

        const image = AuthService.getUserImage();
        this.setState({ image: image });

        console.log("saved in localStorage image " + image);
        console.log("this.state image " + this.state.image);
    }

    render() {

        return (
            <>
                <div className={styles.container}>
                    <MainPageHeader />
                    <div className={styles.profile__title}>
                        <Link className={styles.button__main__page} to="/main">На головну сторіну</Link>
                        <h2>Налаштування профілю</h2>
                    </div>
                    <div className={styles.profile}>
                        <div className={styles.profile__blok__left}>
                            <h4>Загальна інформація</h4>
                            <div>Фото профілю</div>
                            <div className={styles.block}>
                                <img className={styles.img} src={`data:;base64,${this.state.image}`} alt='avatar'></img>
                                <Link className={styles.link} to="/uploadIcon">Редагувати</Link>
                            </div>
                        </div>
                        <div className={styles.profile__blok}>
                            <div className={styles.profile__blok__info}>
                                <label>Мова:</label>
                                <div className={styles.language}>Українська</div>
                            </div>
                            <div className={styles.profile__blok__info}>
                                <label>Прізвище:</label>
                                <div className={styles.profile__blok__info__column}>{this.state.currentUser.surname}</div>
                            </div>
                            <div className={styles.profile__blok__info}>
                                <label>Ім'я:</label>
                                <div className={styles.profile__blok__info__column}>{this.state.currentUser.name}</div>
                            </div>
                            <div className={styles.profile__blok__info}>
                                <label>По батькові:</label>
                                <div className={styles.profile__blok__info__column}>{this.state.currentUser.thirdName}</div>
                            </div>
                            <div className={styles.profile__blok__info}>
                                <label>Дата народження:</label>
                                <div className={styles.profile__blok__info__column}>{this.state.currentUser.birthday}</div>
                            </div>
                        </div>
                        <div className={styles.profile__blok}>
                            <div className={styles.profile__blok__info__chang}>
                                <div>
                                    <div className={styles.profile__blok__info__column__title}>Контактні дані</div>
                                </div>
                            </div>
                            <div className={styles.profile__blok__info__chang}>
                                <div>
                                    <label>E-mail:</label>
                                    <div className={styles.profile__blok__info__column}>{this.state.currentUser.email}</div>
                                </div>
                                <Link className={styles.profile__blok__link} to="/changeUserEmail">Змінити</Link>
                            </div>
                            <div className={styles.profile__blok__info__chang}>
                                <div>
                                    <label>Номер телефону:</label>
                                    <div className={styles.profile__blok__info__column}>{this.state.currentUser.phoneNumber}</div>
                                </div>
                                <Link className={styles.profile__blok__link} to="/changeUserPhone">Змінити</Link>
                            </div>
                            <div className={styles.profile__blok__info__chang}>
                                <div>
                                    <div className={styles.profile__blok__info__column__contact}>
                                        + Додати контакт
                                        <img src={black__arrow__down__icon} className={styles.black__arrow__down__icon} alt="black__arrow__down__icon" />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.profile__blok__info__chang}>
                                <div>
                                    <div className={styles.profile__blok__info__column__security}>Безпека</div>
                                </div>
                            </div>
                            <div className={styles.profile__blok__info__chang}>
                                <div>
                                    <label>Пароль</label>
                                    <div className={styles.profile__blok__info__column}>**************</div>
                                </div>
                                <Link className={styles.profile__blok__link} to="/changeUserPhone">Змінити</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        );
    }
}

export default Profile;