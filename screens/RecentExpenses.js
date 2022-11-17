import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expense-context";
import { getDateMinusDate } from "../util/date";
import { fetchExpense } from "../util/http";

const RecentExpenses = () => {
  const [isFetching, setFetching] = useState(true);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setFetching(true);
      try {
        const expenses = await fetchExpense();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("could not fetch expenses");
      }
      setFetching(false);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDate(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return <ExpensesOutput expensePeriod="Last 7 days" expenses={recentExpenses} fallBackText="No expenses registered for the last 7 days" />;
};

export default RecentExpenses;
