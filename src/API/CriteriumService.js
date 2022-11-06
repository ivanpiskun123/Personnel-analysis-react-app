import axios from "axios";

export default class CriteriumService {

    static async getAll(){
        const response =  axios.get('http://localhost:3003/criteria', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }

}
