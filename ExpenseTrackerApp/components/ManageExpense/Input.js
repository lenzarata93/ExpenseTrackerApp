import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, textInputConfig }) {
  let inputStyle = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyle} {...textInputConfig} />
    </View>
  );
}
export default Input;
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 7,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 6,
  },
  input: {
    color: GlobalStyles.colors.primary700,
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 8,
    borderRadius: 8,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
