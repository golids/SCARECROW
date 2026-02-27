import { View, Text, StyleSheet } from "react-native";
export default function SettingsScreen() {
  return <View style={styles.c}><Text>Settings</Text></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, justifyContent: "center", alignItems: "center" } });