import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import SavingsForm from '../components/SavingsForm';
import { useGlobalState } from '../state/globalState';
import { Expense, Savings } from '../types/finances';

const FinancesPage: React.FC = () => {
  const { expenses, savings, removeExpense } = useGlobalState();

  return (
    <div>
      <h1>Finances</h1>
      <ExpenseForm />
      <SavingsForm />
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount}
            <button onClick={() => removeExpense(expense.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Savings</h2>
      <ul>
        {savings.map((saving) => (
          <li key={saving.id}>
            {saving.description} - ${saving.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancesPage;