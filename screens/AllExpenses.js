import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expense-context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expensePeriod="Total"
      expenses={expensesCtx.expenses}
      fallBackText="No registered expenses found"
    />
  );
};

export default AllExpenses;
