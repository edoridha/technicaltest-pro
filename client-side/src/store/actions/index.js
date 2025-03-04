import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url_api = 'http://localhost:4000'

export const fetchMembers = createAsyncThunk('members/fetchMembers', async ({page, limit, sortBy, sortOrder, name}) => {
    try {
        const { data } = await axios({
            method: 'GET',
            url: `${url_api}/members/?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&name=${name}`,
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

export const getMemberById = createAsyncThunk('members/getMemberById', async (id) => {
    try {
        const { data } = await axios({
            method: 'GET',
            url: `${url_api}/members/${id}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        return data
    } catch (error) {
        throw error
    }
})