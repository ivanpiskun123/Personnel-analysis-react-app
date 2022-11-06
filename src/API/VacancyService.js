import axios from "axios";

export default class VacancyService {

    static async updateStatusVacancy(vacancy_id, status, candidate_id){
        const response =  axios.put(`http://localhost:3003/vacancies/${vacancy_id}`,
            {
                status: status,
                candidate_id: candidate_id
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

    static async getAll(){
        const response =  axios.get('http://localhost:3003/vacancies', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            }
        });
        return response
    }

    static async createVacancy(vacancy){
        const response =  axios.post(`http://localhost:3003/vacancies`,
            {
                vacancy
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
