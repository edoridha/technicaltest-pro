import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url_api = 'http://localhost:4000'

export const fetchMembers = createAsyncThunk('members/fetchMembers', async () => {
    try {
        const { data } = await axios({
            method: 'GET',
            url: `${url_api}/members`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        return data
    } catch (error) {
        throw error
    }
})

export const fetchProfile = createAsyncThunk('members/fetchProfile', async () => {
    try {
        console.log('>>>>>>>>access_token:', localStorage.getItem('access_token'));
        
        const { data } = await axios({
            method: 'GET',
            url: `${url_api}/profile`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        return data
    } catch (error) {
        throw error
    }
})