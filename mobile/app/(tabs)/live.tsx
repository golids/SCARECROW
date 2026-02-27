import { View, Text, StyleSheet } from "react-native";
export default function LiveScreen() {
  return <View style={styles.c}><Text>Live</Text></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, justifyContent: "center", alignItems: "center" } });