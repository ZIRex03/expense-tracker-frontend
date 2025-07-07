import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: number,
    name: string
}

interface Notifications{
    name: string,
    price: number,
    date: Date | null,
    category: string
}

interface UserState{
    currentUser: User,
    formType: string,
    showForm: boolean,
    notificationsList: Notifications[],
    currentBudget: number,
    currentExpenses: number,
    categoriesOver: any[] | null
}

const initialState: UserState = {
    currentUser: {
        id: 1,
        name: 'Александр'
    },
    formType: 'signup',
    showForm: false,
    notificationsList: [],
    currentBudget: 0,
    currentExpenses: 0,
    categoriesOver: null
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        toggleForm: (state, {payload}) => {
            state.showForm = payload;
        },
        changeFormType: (state, {payload}) => {
            state.formType = payload;
        },
        addNotifications: (state, {payload}: {payload: Notifications}) => {
            state.notificationsList.push({
                name: payload.name,
                price: payload.price,
                category: payload.category,
                date: payload.date
            });
        },
        changeBudgetInfo: (state, {payload}) => {
            state.currentBudget = payload.currentBudget;
            state.currentExpenses = payload.currentExpenses;
        },
        categoryNotifications: (state, {payload}) => {
            state.categoriesOver = payload
        }
    },
    extraReducers:(builder) => {

    },
});

export default userSlice.reducer;

export const {
    toggleForm, 
    changeFormType, 
    addNotifications, 
    changeBudgetInfo,
    categoryNotifications
} = userSlice.actions;