import { configureStore } from '@reduxjs/toolkit';
import memberSlice from './reducers/memberSlice';

export const store = configureStore({
    reducer: {
        memberList: memberSlice
    }
});