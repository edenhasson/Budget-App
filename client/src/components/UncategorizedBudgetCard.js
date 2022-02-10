import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function UncategorizedBudgetCard(props) {
    const { getBudgetExpenses } = useBudgets();
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (totalAmount, expense) => totalAmount + expense.amount,
        0
    );
    if (amount === 0) return null
    return <BudgetCard name='Uncategorized' amount={amount} {...props} />;
}
