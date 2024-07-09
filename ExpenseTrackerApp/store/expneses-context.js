import { createContext, useReducer, useState } from "react";
const dummy_expenses = [
  {
    id: "e1",
    title: "Outside with friends",
    amount: 99.99,
    date: new Date("2024-07-04"),
    imgUrl:
      "https://media.licdn.com/dms/image/C5112AQH8q6Y5iCW0jQ/article-cover_image-shrink_600_2000/0/1520249077038?e=2147483647&v=beta&t=dgALZq_km2YNwfSN8PkGwqVuBRafo9Lm3ttlmcftDLU",
  },
  {
    id: "e2",
    title: "Buying a clothes",
    amount: 359.82,
    date: new Date("2024-07-09"),
    imgUrl:
      "https://publish.purewow.net/wp-content/uploads/sites/2/2019/08/woman-shopping-for-clothes.png",
  },
  {
    id: "e3",
    title: "Repair my car",
    amount: 340,
    date: new Date("2024-06-04"),
    imgUrl:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.autonationmobileservice.com%2Fi%2Fblog%2Fhow-long-should-a-mechanic-have-your-car%2F&psig=AOvVaw2zu_f2hy2ON5eqQcvysVnQ&ust=1720532193897000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCGyITIl4cDFQAAAAAdAAAAABAE",
  },
  {
    id: "e4",
    title: "Paid my rent",
    amount: 290,
    date: new Date("2024-06-12"),
    imgUrl:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.otssolicitors.co.uk%2Fnews%2Flandlords-and-advance-rent-payments%2F&psig=AOvVaw1kxwUYeZGm1sc56wfL8pvN&ust=1720532227343000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCzo5TIl4cDFQAAAAAdAAAAABAJ",
  },
  {
    id: "e5",
    title: "Buy a car",
    amount: 22000,
    date: new Date("2024-06-12"),
    imgUrl:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fbg%2Fimages%2Fsearch%2Fbmw%2520f30%2F&psig=AOvVaw3ZhUJzeL-O7Cx9Dx1WrorI&ust=1720533972724000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCchdTOl4cDFQAAAAAdAAAAABAE",
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ title, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpnese: (id, { title, amount, date }) => {},
});
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
        return state.filter((expense)=>expense.id !== action.payload)
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, dummy_expenses);
  function addExpense(expensesData) {
    dispatch({ type: "ADD", payload: expensesData });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({
      type: "UPDATE",
      payload: {
        id: id,
        data: expenseData,
      },
    });
  }
  return <ExpensesContext.Provider>{children}</ExpensesContext.Provider>;
}
export default ExpensesContextProvider;
