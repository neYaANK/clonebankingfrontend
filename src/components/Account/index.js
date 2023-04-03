import React, { Component } from 'react';
import styles from './Account.module.css';


class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(){}


    render() {
        const {currentUser} = this.props;
       
        return (
            <>
        <div className={styles.container}>    
            <div className={styles.details}>
                <div>
                    <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt='avatar'></img>
                </div>
                <div>
                    <label>Прізвище:</label>
                    <label>Ім'я:</label>
                    <label>По-батькові:</label>
                    <label>Дата народження:</label>
                </div>
                <div>
                    <div>{currentUser.surname}</div>
                    <div>{currentUser.name}</div>
                    <div>по-батькові</div>
                    <div>дата народження</div>
                </div>
            </div>

            <div className={styles.contacts}>
                <div>
                    <label>Фінансовий номер:</label>
                    <label>Фінансовий Email:</label>
                </div>
                <div>
                    <label>{currentUser.phoneNumber}</label>
                    <label>Email:</label>
                </div>
                <div>
                    <button>Змінити</button>
                    <button>Змінити</button>
                </div>
            </div>
            </div>
            
    

            </>
            

        );
    }
}

export default Account;