import axios from 'axios';

export default function useHookUser() {
    const url_api = 'http://localhost:4000'

    const login = async (form) => {
        try {
            const { data } = await axios({
                method: 'POST',
                url: `${url_api}/members/login`,
                data: form
            })
            localStorage.setItem('access_token', data.access_token)
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    const createMember = async (form) => {
        try {
            await axios({
                method: 'POST',
                url: `${url_api}/members`,
                data: form
            })
        } catch (error) {
            console.log(error);
            throw error
        }
    }
return { login, createMember }
}
