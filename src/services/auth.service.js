import axios from 'axios';

const API_URL = "http://localhost:8080/auth/";

class AuthService {

    login(phoneNumber, password) {
        console.log("login start");
       
        axios
        .post(API_URL + 'signin', {
            phoneNumber,
            password
        })
        .then((response)=> localStorage.setItem("user", JSON.stringify(response.data))) 
        .catch((error) => console.log(error));
  
        this.setUserFullInfo();
        this.setUserImage();

    }

    setUserFullInfo(){
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;

        axios
        .get("users/" + id, {                                 //shorter path by adding "proxy": "http://localhost:8080/" to package.json (to avoid CORS errors)
            headers: {
              "Authorization" : `Bearer ${token}`
            }})
        .then((response)=> localStorage.setItem("userFullInfo", JSON.stringify(response.data)))
        .catch((error) => console.log(error));
    }

    setUserImage(){
        console.log("setUserImage start");
        
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;

        axios.get("users/" + id + "/image", {
            headers: { 
                Authorization: `Bearer ${token}`
                    },
                    responseType: "arraybuffer"
                })
                .then((res) => {
                    const base64 = btoa(
                        new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte),'')
                        );
                        localStorage.setItem("userImage", base64);
                    })
                .catch((error) => console.log(error));

    }

    changeUserPhoneNumber(phoneNumber) {
        // отримати новий токен замість попереднього -> потрібен окремий запит ?
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;
        console.log("changePhoneNumber start");
        axios
        .post('users/' + id + '/phone', 
        {
            phoneNumber : phoneNumber
        },      
        {                                
            headers: {
              "Authorization" : `Bearer ${token}`
            }
        })
        .then((response)=> console.log("response status on changePhoneNumber(): " + response.status))
        .catch((error) => console.log(error));
    }

    changeUserEmail(email) {
        // отримати новий токен замість попереднього -> потрібен окремий запит ?
        const id = this.getCurrentUser().id;
        const token = this.getCurrentUser().token;
        console.log("changeEmail start");
        axios
        .post('users/' + id + '/email', 
        {
            email : email
        },      
        {                                
            headers: {
              "Authorization" : `Bearer ${token}`
            }
        })
        .then((response)=> console.log("response status on changeEmail(): " + response.status))
        .catch((error) => console.log(error));
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
    getUserFullInfo(){
        return JSON.parse(localStorage.getItem("userFullInfo"));
    }
    getUserImage(){
        return localStorage.getItem("userImage");
    }

}

export default new AuthService();

