import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

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
      {/* Home Tab (Dashboard) */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={22} color={color} />
          ),
        }}
      />

      {/* Search Tab */}
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={22} color={color} />
          ),
        }}
      />

      {/* Calendar Tab */}
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" size={22} color={color} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    elevation: 0,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#080647',
  },
  tabBarItem: {
    paddingVertical: 8,
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    marginTop: 2,
  },
});