import { useBudgets } from "../context/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
    const { expenses, budgets } = useBudgets();
    const amount = expenses.reduce(
        (totalAmount, expense) => totalAmount + expense.amount,
        0
    );

    let max = budgets.reduce(
        (totalBudgets, budgets) => totalBudgets + +budgets.max,
        0
    );
    if (max === 0 && amount === 0) return null
    return <BudgetCard name='Total' amount={amount} max={max} hideButtons />;
}
