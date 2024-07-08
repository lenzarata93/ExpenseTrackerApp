import { FlatList, Text } from "react-native";
function renderItem(data) {
  return <Text>{data.item.title}</Text>;
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
