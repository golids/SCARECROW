import { View, Text, StyleSheet } from "react-native";
export default function LogsScreen() {
  return <View style={styles.c}><Text>Logs</Text></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, justifyContent: "center", alignItems: "center" } });