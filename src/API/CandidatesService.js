import axios from "axios";

export default class CandidatesService {

    static async getAll(){
        const response =  axios.get('http://localhost:3003/candidates', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }

    static async createCandidate(candidate){
        const response =  axios.post(`http://localhost:3003/candidates`,
            {
                candidate
            },
            {
                headers:
                    {
                        'Content-Type': 'application/json',
                        'authorization': localStorage.getItem('token')
                    }
            });

        return response
    }
}
