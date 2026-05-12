import React, { useState } from 'react';
import { useGlobalState } from '../state/globalState';
import { validateAmount } from '../utils/validation';
import { Savings } from '../types/finances';

const SavingsForm: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const { addSavings } = useGlobalState();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      validateAmount(amount);
      const savings: Savings = {
        id: Date.now().toString(),
        description,
        amount,
      };
      addSavings(savings);
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
      <button type="submit">Add Savings</button>
    </form>
  );
};

export default SavingsForm;