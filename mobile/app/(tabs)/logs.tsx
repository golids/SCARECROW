// app/(tabs)/logs.tsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// Reusing the ScarecrowIcon component from home
function ScarecrowIcon({ size = 36 }: { size?: number }) {
  const s = size / 60;
  return (
    <View style={{ width: size, height: size * 1.1, alignItems: "center" }}>
      {/* Hat brim */}
      <View style={{ width: 44 * s, height: 5 * s, backgroundColor: "#2d6e10", borderRadius: 3, marginTop: 2 * s }} />
      {/* Hat top */}
      <View style={{ width: 6 * s, height: 8 * s, backgroundColor: "#1a4a08", borderRadius: 2 }} />
      {/* Head */}
      <View style={{ width: 18 * s, height: 22 * s, backgroundColor: "#2d6e10", borderRadius: 4, alignItems: "center", justifyContent: "center" }}>
        {/* Eyes */}
        <View style={{ flexDirection: "row", gap: 5 * s }}>
          <View style={{ width: 4 * s, height: 4 * s, backgroundColor: "#c8f078", borderRadius: 2 }} />
          <View style={{ width: 4 * s, height: 4 * s, backgroundColor: "#c8f078", borderRadius: 2 }} />
        </View>
      </View>
      {/* Arms */}
      <View style={{ width: 52 * s, height: 5 * s, backgroundColor: "#2d6e10", borderRadius: 3, marginTop: -14 * s }} />
      {/* Legs */}
      <View style={{ flexDirection: "row", gap: 6 * s, marginTop: 1 * s }}>
        <View style={{ width: 6 * s, height: 14 * s, backgroundColor: "#2d6e10", borderRadius: 2 }} />
        <View style={{ width: 6 * s, height: 14 * s, backgroundColor: "#2d6e10", borderRadius: 2 }} />
      </View>
    </View>
  );
}

// Sample log data
const DEVICE_LOGS = [
  {
    id: 1,
    device: "Field Scarecrow #1",
    event: "Camera Motion Detected",
    time: "10:15 AM",
    date: "Today",
    type: "motion",
    icon: "videocam",
  },
  {
    id: 2,
    device: "Field Scarecrow #2",
    event: "Device Offline",
    time: "9:30 AM",
    date: "Today",
    type: "offline",
    icon: "wifi-off",
  },
  {
    id: 3,
    device: "Field Scarecrow #1",
    event: "Birds Detected (5)",
    time: "8:45 AM",
    date: "Today",
    type: "bird",
    icon: "bug",
  },
  {
    id: 4,
    device: "Field Scarecrow #1",
    event: "Battery Low (15%)",
    time: "11:20 PM",
    date: "Yesterday",
    type: "battery",
    icon: "battery-dead",
  },
  {
    id: 5,
    device: "Field Scarecrow #2",
    event: "Device Reconnected",
    time: "10:05 PM",
    date: "Yesterday",
    type: "online",
    icon: "wifi",
  },
  {
    id: 6,
    device: "Field Scarecrow #1",
    event: "System Update Installed",
    time: "3:30 PM",
    date: "Yesterday",
    type: "system",
    icon: "cloud-done",
  },
  {
    id: 7,
    device: "Field Scarecrow #2",
    event: "Camera Snapshot Captured",
    time: "2:15 PM",
    date: "Yesterday",
    type: "camera",
    icon: "camera",
  },
  {
    id: 8,
    device: "Field Scarecrow #1",
    event: "Connection Interrupted",
    time: "8:20 AM",
    date: "Yesterday",
    type: "offline",
    icon: "wifi-off",
  },
];

// Filter chips data
const FILTERS = ["All", "Today", "Yesterday", "Device", "Alerts"];

export default function LogsScreen() {
  const [selectedFilter, setSelectedFilter] = React.useState("All");

  // Function to get icon color based on event type
  const getEventColor = (type: string) => {
    switch(type) {
      case "offline": return "#D32F2F";
      case "online": return "#004E00";
      case "bird": return "#FFA000";
      case "battery": return "#FF6B00";
      case "motion": return "#1976D2";
      default: return "#004E00";
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/tabs-bg.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Activity Logs</Text>
              <Text style={styles.headerSubtitle}>Device history and events</Text>
            </View>
            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="filter" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Stats Summary Card */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Total Events</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>Alerts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Offline Events</Text>
            </View>
          </View>

          {/* Filter Chips */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            <View style={styles.filterContainer}>
              {FILTERS.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterChip,
                    selectedFilter === filter && styles.filterChipActive
                  ]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text style={[
                    styles.filterChipText,
                    selectedFilter === filter && styles.filterChipTextActive
                  ]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Today's Logs Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today</Text>
              <TouchableOpacity>
                <Text style={styles.sectionLink}>Clear &gt;</Text>
              </TouchableOpacity>
            </View>

            {DEVICE_LOGS.filter(log => log.date === "Today").map((log) => (
              <TouchableOpacity key={log.id} style={styles.logRow}>
                <View style={[styles.logIconWrap, { backgroundColor: getEventColor(log.type) + "20" }]}>
                  <Ionicons 
                    name={log.icon as any} 
                    size={20} 
                    color={getEventColor(log.type)} 
                  />
                </View>
                <View style={styles.logContent}>
                  <View style={styles.logHeader}>
                    <Text style={styles.logDevice}>{log.device}</Text>
                    <Text style={styles.logTime}>{log.time}</Text>
                  </View>
                  <Text style={styles.logEvent}>{log.event}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#004E00" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Yesterday's Logs Section */}
          <View style={[styles.section, { marginBottom: 100 }]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Yesterday</Text>
              <TouchableOpacity>
                <Text style={styles.sectionLink}>View All &gt;</Text>
              </TouchableOpacity>
            </View>

            {DEVICE_LOGS.filter(log => log.date === "Yesterday").map((log) => (
              <TouchableOpacity key={log.id} style={styles.logRow}>
                <View style={[styles.logIconWrap, { backgroundColor: getEventColor(log.type) + "20" }]}>
                  <Ionicons 
                    name={log.icon as any}
                    size={20} 
                    color={getEventColor(log.type)} 
                  />
                </View>
                <View style={styles.logContent}>
                  <View style={styles.logHeader}>
                    <Text style={styles.logDevice}>{log.device}</Text>
                    <Text style={styles.logTime}>{log.time}</Text>
                  </View>
                  <Text style={styles.logEvent}>{log.event}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#004E00" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Export Button */}
          <TouchableOpacity style={styles.exportButton}>
            <Ionicons name="download-outline" size={20} color="#fff" />
            <Text style={styles.exportText}>Export Logs</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { 
    flex: 1, 
    width: "100%", 
    height: "100%" 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(200,230,160,0.18)",
  },
  safe: { 
    flex: 1 
  },
  scroll: { 
    flex: 1 
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#1a3a0d",
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#808080",
    marginTop: 2,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#004E00",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#080647",
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "rgba(249, 255, 161, .8)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: "rgba(249, 255, 161, 1)",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#004E00",
  },
  statLabel: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#808080",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(0,78,0,0.2)",
  },
  filterScroll: {
    marginBottom: 14,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(249, 255, 161, 0.5)",
    borderWidth: 1,
    borderColor: "#c8e890",
  },
  filterChipActive: {
    backgroundColor: "#004E00",
    borderColor: "#004E00",
  },
  filterChipText: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    color: "#1a3a0d",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  section: {
    backgroundColor: "rgba(249, 255, 161, 0.8)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: "#c8e890",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { 
    fontSize: 14, 
    fontFamily: "Poppins-SemiBold", 
    color: "#1a3a0d" 
  },
  sectionLink: { 
    fontSize: 12, 
    fontFamily: "Poppins-Medium", 
    color: "#004E00" 
  },
  logRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(200,232,144,0.3)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#b8dc88",
  },
  logIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logContent: {
    flex: 1,
    marginLeft: 12,
  },
  logHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  logDevice: {
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
    color: "#1a3a0d",
  },
  logTime: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#808080",
  },
  logEvent: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#4a4a4a",
  },
  exportButton: {
    flexDirection: "row",
    backgroundColor: "#004E00",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#080647",
    marginBottom: 20,
    gap: 8,
  },
  exportText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});