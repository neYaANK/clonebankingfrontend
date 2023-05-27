import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import styles from './ChangeUserEmail.module.css';


class ChangeUserEmail extends Component {   
    constructor(props) {
        super(props);
        this.state = { email: null }
    }

    componentDidMount(){
        const email = AuthService.getUserFullInfo().email;
        console.log(AuthService.getUserFullInfo().email);
        this.setState({email : email});
    }
    handleForm = (event) => {
        event.preventDefault();
        //event.target.reset();
          
        AuthService.changeUserEmail(event.target.email.value);
        console.log("handleForm end");
    }
   
    render() {
        return (
            <form className={styles.block} onSubmit={this.handleForm}>
                <label className={styles.label}> Введіть нову електронну пошту:</label>
                <input name="email"
                    type="email"
                    placeholder="Email"
                />
                <input 
                    type="submit"
                    value="Підтвердити"
                />
            </form>   
        );
    }
}

export default ChangeUserEmail;
