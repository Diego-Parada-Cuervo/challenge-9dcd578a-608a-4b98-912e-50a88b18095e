interface GlobalState {
  expenses: Expense[];
  savings: Savings[];
  addExpense: (expense: Expense) => void;
  addSavings: (savings: Savings) => void;
  removeExpense: (id: string) => void;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [savings, setSavings] = useState<Savings[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const addSavings = (savings: Savings) => {
    setSavings((prev) => [...prev, savings]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id!== id));
  };

  return (
    <GlobalStateContext.Provider value={{ expenses, savings, addExpense, addSavings, removeExpense }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};