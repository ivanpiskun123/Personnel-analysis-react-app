import axios from "axios";

export default class AuthService {

    static async athenticate(email, password){
        const response =  axios.post('http://localhost:3003/users/sign_in', {
            user: {
                email: email,
                password: password
            }
        })
        return response
    }

}
