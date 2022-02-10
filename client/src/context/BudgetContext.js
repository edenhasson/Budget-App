import { createContext, useContext } from "react"
import { v4 } from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetContext = createContext()

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export function useBudgets() {
    return useContext(BudgetContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage('budgets', []);
    const [expenses, setExpenses] = useLocalStorage('expenses', []);

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    };

    function addExpense({ description, amount, budgetId }) {
        console.log(amount, budgetId);
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: v4(), description, amount, budgetId }]
        })
    };

    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name))
                return prevBudgets
            return [...prevBudgets, { id: v4(), name, max }]
        })
    };

    function changeBudget(id, budgetId) {
        setExpenses(prevExpenses => prevExpenses.map(exp => {
            if (exp.id !== id) {
                // console.log(exp)
                return exp
            }
            return { ...exp, budgetId }
        }))
    }

    function deleteBudget({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.map(exp => {
                if (exp.budgetId !== id) return exp
                return { ...exp, budgetId: UNCATEGORIZED_BUDGET_ID }
            })
        })
        setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id))
    };

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id))

    };

    return <BudgetContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
        changeBudget
    }}>{children}</BudgetContext.Provider>
}