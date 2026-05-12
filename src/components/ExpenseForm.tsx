import React, { useState } from 'react';
import { useGlobalState } from '../state/globalState';
import { validateAmount } from '../utils/validation';
import { Expense } from '../types/finances';

const ExpenseForm: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const { addExpense } = useGlobalState();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      validateAmount(amount);
      const expense: Expense = {
        id: Date.now().toString(),
        description,
        amount,
      };
      addExpense(expense);
      setDescription('');
      setAmount(0);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;