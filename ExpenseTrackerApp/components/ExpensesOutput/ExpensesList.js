import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";
function renderItem(data) {
  return <ExpenseItem {...data.item} />;
}
function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}
export default ExpensesList;
