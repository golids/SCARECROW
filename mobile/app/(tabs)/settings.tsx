import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";

export default function SettingsScreen() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              const { error } = await supabase.auth.signOut();
              if (error) {
                Alert.alert("Error", error.message);
              } else {
                router.replace("/screens/LoginScreen");
              }
            } catch (error) {
              Alert.alert("Error", "Something went wrong. Please try again.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/images/tabs-bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* ── Settings Options ── */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.settingRow}>
            <Ionicons name="person-outline" size={20} color="#004E00" />
            <Text style={styles.settingText}>Account</Text>
            <Ionicons name="chevron-forward" size={18} color="#808080" style={styles.chevron} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingRow}>
            <Ionicons name="notifications-outline" size={20} color="#004E00" />
            <Text style={styles.settingText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={18} color="#808080" style={styles.chevron} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingRow}>
            <Ionicons name="lock-closed-outline" size={20} color="#004E00" />
            <Text style={styles.settingText}>Privacy</Text>
            <Ionicons name="chevron-forward" size={18} color="#808080" style={styles.chevron} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingRow}>
            <Ionicons name="help-circle-outline" size={20} color="#004E00" />
            <Text style={styles.settingText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={18} color="#808080" style={styles.chevron} />
          </TouchableOpacity>
        </View>

        {/* ── Logout Button ── */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={[styles.logoutButton, loading && styles.logoutButtonDisabled]}
            onPress={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#1a3a0d" size="small" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={30} color="#1a3a0d" style={{ marginRight: 8 }} />
                <Text style={styles.logoutText}>Log Out</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0edd0",
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Optional: semi-transparent header background
    backdropFilter: "blur(5px)", // Optional: blur effect (may not work in React Native)
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#1a3a0d",
  },
  section: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: "rgba(249, 255, 161, 0.8)", // Semi-transparent white for readability
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#c8e890",
    overflow: "hidden",
    // Optional: add backdrop blur effect
    // backdropFilter: "blur(10px)",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#1a3a0d",
  },
  chevron: {
    marginLeft: "auto",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(249, 255, 161, 1)",
    marginHorizontal: 16,
  },
  logoutContainer: {
    position: "absolute",
    bottom: 100,
    left: 16,
    right: 16,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "rgba(249, 255, 161, 0.8)", 
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
    height: 55,
    width: "85%",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#004E00",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonDisabled: {
    opacity: 0.7,
  },
  logoutText: {
    color: "#1a3a0d",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 0.5,
  },
});