import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { useState } from "react";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
    title: defaultValues ? defaultValues.title : "",
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    let normalizedValue = enteredValue;
    if (inputIdentifier === "amount") {
      normalizedValue = enteredValue.replace(",", ".");
    }
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: normalizedValue,
      };
    });
  }
  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      title: inputValues.title,
    };
    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Title"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "title"),
          value: inputValues.title,
        }}
      />
      <View style={styles.button}>
        <Button style={styles.buttons} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.buttons} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
export default ExpenseForm;
const styles = StyleSheet.create({
  form: {
    marginTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 15,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
});
