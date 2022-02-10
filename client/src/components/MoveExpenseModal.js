import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../context/BudgetContext';

export default function MoveExpenseModal({ show, handleClose, expense }) {
    const { budgets, changeBudget } = useBudgets();
    const budgetIdRef = useRef();
    return <Modal show={show} onHide={handleClose}>
        <Form>
            <Modal.Header closeButton>
                <Modal.Title>Select Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="budgetId">
                    <Form.Label>Budget</Form.Label>
                    <Form.Select ref={budgetIdRef}>
                        <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                        {budgets.map(budget => (<option key={budget.id} value={budget.id}>{budget.name}</option>))}
                    </Form.Select>
                    <Button onClick={() => {
                        changeBudget(expense.id, budgetIdRef.current.value)
                        handleClose()
                    }}>Add to this Budget</Button>
                </Form.Group>
            </Modal.Body>
        </Form>
    </Modal>;
}
