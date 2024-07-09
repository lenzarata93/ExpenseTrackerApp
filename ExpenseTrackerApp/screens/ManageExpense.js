import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/iconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expneses-context";
function ManageExpenses({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    if (editedExpenseId) {
      expenseCtx.updateExpense(editedExpenseId, {
        title: "TEst!!!",
        amount: 23.0,
        date: new Date("2024-09-07"),
      });
    } else {
      expenseCtx.addExpense({
        title: "TEst",
        amount: 123.0,
        date: new Date("2024-07-07"),
      });
    }
    navigation.goBack(); //затваря модала
  }
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button style={styles.buttons} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.buttons} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={28}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}
export default ManageExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
