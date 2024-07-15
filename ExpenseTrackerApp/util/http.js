import axios from 'axios'

export function storeExpense(expenseData){
axios.post('https://react-native-expense-tra-d7d7e-default-rtdb.europe-west1.firebasedatabase.app/expenses.json',
    expenseData
)
}