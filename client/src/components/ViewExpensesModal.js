import { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
import { currencyFormatter } from "../utils";
import MoveExpenseModal from "./MoveExpenseModal";

export default function ViewExpensesModal({ budgetId, handleClose }) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();
    const [moveModal, setMoveModal] = useState(false);

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? { name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID } :
        budgets.find(b => b.id === budgetId);


    const expenses = getBudgetExpenses(budgetId);


    return (
        <>
            <Modal show={budgetId != null} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction="horizontal">
                            <div>Expenses - {budget?.name}</div>
                            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                <Button variant="outline-danger" onClick={() => {
                                    deleteBudget(budget)
                                    handleClose()
                                }}>Delete</Button>
                            )}
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction="vertical" gap='3'>
                        {expenses.map(expense => (
                            <Stack direction="horizontal" key={expense.id} gap='3'>
                                <div className="me-auto fs-4">{expense.description}</div>
                                <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                                <Button size='sm' variant="outline-danger"
                                    onClick={() => deleteExpense(expense)}>&times;</Button>
                                <Button size='sm' variant="outline-success"
                                    onClick={() => setMoveModal(true)}>Move</Button>
                                <MoveExpenseModal show={moveModal} handleClose={() => setMoveModal(false)} expense={expense}></MoveExpenseModal>
                            </Stack>
                        ))}
                    </Stack>
                </Modal.Body>
            </Modal>
        </>
    )
}
