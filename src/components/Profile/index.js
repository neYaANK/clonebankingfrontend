import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';
import AuthService from '../services/auth.service';


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
                    <hr></hr>

                    <div className={styles.details}>
                        <div className={styles.block}>
                            <img className={styles.img} src={`data:;base64,${this.state.image}`} alt='avatar'></img>
                            <Link className={styles.link} to="/uploadIcon">Змінити</Link>
                        </div>
                        <div className={styles.block}>
                            <label>Прізвище:</label>
                            <label>Ім'я:</label>
                            <label>По-батькові:</label>
                            <label>Дата народження:</label>
                        </div>
                        <div>
                            <div>{this.state.currentUser.surname}</div>
                            <div>{this.state.currentUser.name}</div>
                            <div>{this.state.currentUser.thirdName}</div>
                            <div>{this.state.currentUser.birthday}</div>
                        </div>
                    </div>

                    <hr></hr>

                    <div className={styles.contacts}>
                        <div className={styles.block}>
                            <label>Фінансовий номер:</label>
                            <label>Фінансовий email:</label>
                        </div>
                        <div className={styles.block}>
                            <div>{this.state.currentUser.phoneNumber}</div>
                            <div>{this.state.currentUser.email}</div>
                        </div>
                        <div className={styles.block}>
                            <Link className={styles.link} to="/changeUserPhone">Змінити</Link>
                            <Link className={styles.link} to="/changeUserEmail">Змінити</Link>
                        </div>
                    </div>

                    <hr></hr>

                </div>

            </>

        );
    }
}

export default Profile;