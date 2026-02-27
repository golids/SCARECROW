// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: () => (
          <View style={styles.tabBarBackground} />
        ),
        tabBarActiveTintColor: "#004E00",
        tabBarInactiveTintColor: "#808080",
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: "Live",
          tabBarIcon: ({ color }) => (
            <Ionicons name="videocam" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="logs"
        options={{
          title: "Logs",
          tabBarIcon: ({ color }) => (
            <Ionicons name="newspaper" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 60, // Changed from implicit to explicit - increase/decrease this value
    width: width * 1, // 90% of screen width
    alignSelf: "center", // Centers the tab bar when width is set
    borderRadius: 20, // Increased to match new height (height/2 for pill shape)
    backgroundColor: "transparent",
    elevation: 0,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  tabBarBackground: {
    position: "absolute",
    top: 0,
    left: 15,
    right: 15,
    bottom: 0,
    backgroundColor: "rgba(249, 255, 161, 1)",
    borderRadius: 20, // Match tabBar borderRadius
    borderWidth: 1.5,
    borderColor: "#080647",
  },
  tabBarItem: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginLeft: 10,
    marginRight: 10,
    // You can also adjust item spacing here


  },
  tabBarLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 11,
    marginTop: 2,
  },
});