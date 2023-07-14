import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
    name: 'budgets',
    initialState: {
        budgets: []
    },
    reducers: {
        addBudget: (state, action)=>{
            state.budgets.push({
                id: state.budgets.length,
                name: action.payload.name,
                plannedAmount: action.payload.planned,
                actualAmount: action.payload.actual
            })
        }
    }
})

export const { addBudget } = budgetSlice.actions
export default budgetSlice.reducer