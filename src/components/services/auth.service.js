import axios from 'axios';

const API_URL_AUTH = "http://localhost:8080/auth/";
const API_URL_USERS = "http://localhost:8080/users/";
const API_URL_CARDS = "http://localhost:8080/cards/";
const API_URL_CREDIT = "http://localhost:8080/credit/";
const API_URL_PAYMENT = "http://localhost:8080/payment/";
const API_URL_CURRENCY = "http://localhost:8080/public/exchange/";

class AuthService {

    // authentification methods

    // login(phoneNumber, password) {
    //     console.log("login start");

    //     axios
    //     .post(API_URL_AUTH + 'signin', {
    //         phoneNumber,
    //         password
    //     })
    //     .then((response)=> {                           //put first token to localStorage
    //         const user = JSON.stringify(response.data)
    //         localStorage.setItem("firstToken", JSON.parse(user).token) 
    //         console.log(user);
    //         console.log(localStorage.getItem("firstToken"));       
    //     } )
    //     .catch((error) => console.log(error));

    //     console.log("FIRST_TOKEN : ");
    //     console.log(localStorage.getItem("firstToken"));
    //     console.log("login end");
    // }

    login(phoneNumber, password) {
        console.log("login start");

        return axios
            .post(API_URL_AUTH + 'signin', {
                phoneNumber,
                password
            })
            .then((response) => {                           //put first token to localStorage
                const user = JSON.stringify(response.data)
                localStorage.setItem("firstToken", JSON.parse(user).token)
                console.log(user);
                console.log(localStorage.getItem("firstToken"));
            })
            .catch((error) => console.log(error));
    }


    verify(code) {
        console.log("verify start");
        const token = localStorage.getItem("firstToken");
        return axios
            .post(API_URL_AUTH + 'verify', {
                code: code
            },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data)) // put user (with second token which will be used in all next requests) to localStorage
                console.log("VERIFY - user with second token:  ")
                console.log(this.getCurrentUser())
            })
            .catch((error) => console.log(error));

    }

    //user info methods

    setUserFullInfo() {
        console.log("setUserFullInfo start");
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;

        return axios
            .get(API_URL_USERS + id, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("RESPONSE IN setUserFullInfo : ");
                console.log(JSON.stringify(response.data));
                localStorage.setItem("userFullInfo", JSON.stringify(response.data))
                console.log("Settled user full info in localStorage : ")
                console.log(this.getUserFullInfo())
            })
            .catch((error) => console.log(error));
    }


    setUserImage() {
        console.log("setUserImage start");

        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;

        return axios.get(API_URL_USERS + id + "/image", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: "arraybuffer"
        })
            .then((res) => {
                const base64 = btoa(
                    new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                localStorage.setItem("userImage", base64);
            })
            .catch((error) => console.log(error.response.data));

    }

    changeUserPhoneNumber(phoneNumber) {
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;
        console.log("changePhoneNumber start");
        return axios
            .post(API_URL_USERS + id + '/phone',
                {
                    phoneNumber: phoneNumber
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            .then((response) => console.log("response status on changePhoneNumber(): " + response.status))
            .catch((error) => console.log(error));
    }

    changeUserEmail(email) {
        // отримати новий токен замість попереднього -> потрібен окремий запит ?
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;
        console.log("changeEmail start");
        return axios
            .post(API_URL_USERS + id + '/email',
                {
                    email: email
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            .then((response) => console.log("response status on changeEmail(): " + response.status))
            .catch((error) => console.log(error));
    }

    changeUserImage(formData) {  //TODO - ask Artem
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;
        console.log(formData.get('image'))
        return axios({
            method: "post",
            url: API_URL_USERS + id + "/image",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },

        })
            .then(function (response) {
                console.log("response status on uploadIcon(): " + response.status)
            })
            .catch(function (error) {
                console.log(error.response.data)
            });
    }

    // cards methods

    setUserAllCards() {
        console.log("setUserAllCards start");
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;

        return axios
            .get(API_URL_CARDS + id, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("RESPONSE IN setUserAllCards : ")
                console.log(JSON.stringify(response.data))
                localStorage.setItem("userAllCards", JSON.stringify(response.data))
                console.log("Settled user all cards in localStorage : ")
                console.log(this.getUserAllCards())
            })
            .catch((error) => console.log(error));
    }

    setSelectedCardInfo(cardId) {
        console.log("setSelectedCardInfo start");
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;

        return axios
            .get(API_URL_CARDS + id + "/" + cardId, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("RESPONSE IN setSelectedCardInfo : ")
                console.log(JSON.stringify(response.data))
                localStorage.setItem("selectedCardInfo", JSON.stringify(response.data))
                console.log("Settled user selected card in localStorage : ")
                console.log(this.getSelectedCardInfo())
            })
            .catch((error) => console.log(error));
    }

    setCurrencyInfo(currency) {
        console.log("setCurrencyInfo start")

        var currencyInfo = "";

        return axios
            .get(API_URL_CURRENCY + currency)
            .then((response) => {
                //console.log("RESPONSE IN getCurrencyInfo : ")
                //console.log(JSON.stringify(response.data))
                currencyInfo = JSON.stringify(response.data)
                localStorage.setItem(currency, JSON.stringify(response.data))
                //console.log("Settled currency in localStorage : ")
                //console.log(this.getSelectedCardInfo())
            })
            .catch((error) => console.log(error));

    }

    addCard(currency, type, paymentSystem) {
        console.log("addCard start");
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;

        return axios
            .post(API_URL_CARDS + id, {
                currency: currency,
                type: type,
                paymentSystem: paymentSystem
            },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            .then((response) => console.log("response status on addCard(): " + response.status))
            .then(console.log(this.getUserAllCards()))
            .catch((error) => console.log(error));
    }


    // payments methods
    setSelectedCardPayments(cardId) {
        console.log("setSelectedCardPayments start");
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;

        return axios
            .get(API_URL_PAYMENT + id + "/" + cardId, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("RESPONSE IN setSelectedCardOutgoingPayments : ")
                console.log(JSON.stringify(response.data))
                localStorage.setItem("selectedCardPayments", JSON.stringify(response.data))
                console.log("Settled SelectedCardPayments in localStorage : ")
                console.log(this.getSelectedCardPayments())
            })
            .catch((error) => console.log(error.response.data));
    }

    sendPayment(senderCardNumber, receiverCardNumber, balance) {
        console.log("sendPayment start");
        const token = this.getCurrentUser().token;
        console.log(token);
        return axios
            .post(API_URL_PAYMENT + 'sendPayment', {
                senderCardNumber: senderCardNumber,
                receiverCardNumber: receiverCardNumber,
                balance: balance
            }
                , {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            .then((response) => {
                console.log("response status on sendPayment(): " + response.status)
            })
            .catch((error) => console.log(error.response.data));
    }

    // credits methods

    setUserAllCredits() {
        console.log("setUserAllCredits start");
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;

        return axios
            .get(API_URL_CREDIT + id, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("RESPONSE IN setUserAllCredits : ")
                console.log(JSON.stringify(response.data))
                localStorage.setItem("userAllCredits", JSON.stringify(response.data))
                console.log("Settled user all credits in localStorage : ")
                console.log(this.getUserAllCredits())
            })
            .catch((error) => console.log(error));
    }

    addCredit(creditTypeId, value, cardNumber) {
        console.log("addCredit start");
        const token = this.getCurrentUser().token;

        return axios
            .post(API_URL_CREDIT + "request", {
                creditTypeId: creditTypeId,
                value: value,
                cardNumber: cardNumber,
            },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            .then((response) => {
                console.log("response status on addCredit(): " + response.status);
                console.log(this.getUserAllCredits())
            })
            .catch((error) => console.log(error.response.data));
    }

    repayCredit(creditId, value, cardNumber) {
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;

        return axios
            .post(API_URL_CREDIT + id + "/" + creditId + "/repay", {
                value: value,
                cardNumber: cardNumber,
            },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            .then((response) => {
                console.log("response status on repayCredit(): " + response.status);
                console.log(this.getUserAllCredits());
            })
            .catch((error) => console.log(error.response.data));
    }

    //all get methods

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
    getUserFullInfo() {
        return JSON.parse(localStorage.getItem("userFullInfo"));
    }
    getUserImage() {
        return localStorage.getItem("userImage");
    }
    getUserAllCards() {
        return JSON.parse(localStorage.getItem("userAllCards"));
    }
    getUserAllCredits() {
        return JSON.parse(localStorage.getItem("userAllCredits"));
    }
    getSelectedCardInfo() {
        return JSON.parse(localStorage.getItem("selectedCardInfo"));
    }
    getCurrencyInfo(currency) {
        return JSON.parse(localStorage.getItem(currency));
    }
    getSelectedCardPayments() {
        return JSON.parse(localStorage.getItem("selectedCardPayments"));
    }

    //all remove methods

    removeUserAllCards() {
        localStorage.removeItem("userAllCards");
    }
    removeSelectedCardInfo() {
        localStorage.removeItem("selectedCardInfo");
    }

    logOut() {
        localStorage.clear();
    }

}

export default new AuthService();
