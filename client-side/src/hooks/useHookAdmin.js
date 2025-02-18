import axios from "axios";

import React from 'react'

export default function useHookAdmin() {
    const url_api = 'http://localhost:4000'

    const login = async (form) => {
        try {
            const { data } = await axios({
                method: 'POST',
                url: `${url_api}/admins/login`,
                data: form
            })
            localStorage.setItem('access_token', data.access_token)
        } catch (error) {
            throw error
        }
    }
    return { login }
}
