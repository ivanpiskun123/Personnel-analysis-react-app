import axios from "axios";

export default class PositionService {

    static async getAll(){
        const response =  axios.get('http://localhost:3003/positions', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }


}
