import {configureStore} from '@reduxjs/toolkit'
import budgetReducer from './slices/BudgetSlice'

const store = configureStore({
    reducer: {
        budget: budgetReducer,
    }
});

export default store;