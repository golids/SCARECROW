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

const BIRD_STATS = [
  { label: "Crows",   count: 13, pct: "52%",  icon: "🐦", sub: "Crow 52%"    },
  { label: "Pigeons", count: 11, pct: "144%", icon: "🕊️", sub: "Sparrow 20%" },
];

const ACTIVITY_LOG = [
  { time: "10:15AM", label: "5 Birds Detected", ago: "10 minutes ago" },
  { time: "7:38AM",  label: "3 Birds Detected", ago: "3 hours ago"    },
];

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/home-bg.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safe} edges={["top"]}>

        {/* Add button absolutely positioned top-right */}
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Text */}
          <Text style={styles.welcome}>Welcome back, John Doe</Text>

          {/* Connection Card */}
          <View style={styles.card}>
            <View style={styles.connectionLeft}>
              <MaterialIcons name="wifi" size={18} color="#004E00" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.connLabel}>Connected to</Text>
                <Text style={styles.connValue}>Farm WiFi-4567</Text>
              </View>
            </View>
            <View style={styles.dividerVert} />
            <View style={styles.connectionRight}>
              <Ionicons name="location-outline" size={16} color="#004E00" />
              <View style={{ marginLeft: 4 }}>
                <Text style={styles.connLabel}>Farm Size</Text>
                <Text style={styles.connValueLarge}>150 acres</Text>
              </View>
            </View>
          </View>

          {/* Device Overview Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Device Overview</Text>
              <TouchableOpacity>
                <Text style={styles.sectionLink}>Manage &gt;</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.deviceRow}>
              <View style={styles.deviceIconWrap}>
                <ScarecrowIcon size={36} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.deviceName}>Field Scarecrow #1</Text>
                <Text style={styles.deviceStatus}>Active</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#004E00" />
            </TouchableOpacity>

            <View style={styles.birdBanner}>
              <View style={styles.birdBannerLeft}>
                <Text style={styles.birdEmoji}>🐦</Text>
                <Text style={styles.birdBannerText}>
                  <Text style={styles.birdCount}>5 Birds</Text> Today
                </Text>
              </View>
              <Text style={styles.birdBannerTotal}>
                <Text style={styles.birdCount}>29</Text> Total This Week
              </Text>
            </View>

            <View style={styles.speciesRow}>
              {BIRD_STATS.map((b) => (
                <View key={b.label} style={styles.speciesCard}>
                  <Text style={styles.speciesEmoji}>{b.icon}</Text>
                  <View style={{ marginTop: 4 }}>
                    <Text style={styles.speciesCount}>{b.count} {b.label}</Text>
                    <Text style={styles.speciesPct}>▲{b.pct}</Text>
                    <Text style={styles.speciesSub}>{b.sub}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Activity Log Section */}
          <View style={[styles.section, { marginBottom: 100 }]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity Log</Text>
              <TouchableOpacity>
                <Text style={styles.sectionLink}>View All &gt;</Text>
              </TouchableOpacity>
            </View>

            {ACTIVITY_LOG.map((log, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.logRow, i < ACTIVITY_LOG.length - 1 && { marginBottom: 8 }]}
              >
                <View style={styles.logIconWrap}>
                  <Text style={{ fontSize: 22 }}>🐦</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <Text style={styles.logTime}>{log.time}</Text>
                    <Text style={styles.logLabel}>{log.label}</Text>
                  </View>
                  <Text style={styles.logAgo}>{log.ago}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#004E00" />
              </TouchableOpacity>
            ))}
          </View>

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
  addBtn: {
    position: "absolute",
    top: 70,
    right: 16,
    zIndex: 10,
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#004E00",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#080647",
  },
  scroll: { 
    flex: 1 
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 260, // Adjust this value based on your background image
  },
  welcome: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#1a3a0d",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(249, 255, 161, .8)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: "rgba(249, 255, 161, 1)",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  connectionLeft: { 
    flex: 1, 
    flexDirection: "row", 
    alignItems: "center" 
  },
  connectionRight: { 
    flex: 1, 
    flexDirection: "row", 
    alignItems: "center", 
    paddingLeft: 12 
  },
  dividerVert: { 
    width: 1.5, 
    height: 36, 
    backgroundColor: "#rgba(249, 255, 161, .8)" ,
  },
  connLabel: { 
    fontSize: 10, 
    fontFamily: "Poppins-Regular", 
    color: "#808080" 
  },
  connValue: { 
    fontSize: 13, 
    fontFamily: "Poppins-SemiBold", 
    color: "#1a3a0d" 
  },
  connValueLarge: { 
    fontSize: 18, 
    fontFamily: "Poppins-Bold", 
    color: "#004E00" 
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
    marginBottom: 10,
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
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(200,232,144,0.3)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#b8dc88",
  },
  deviceIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(200,232,144,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  deviceName: { 
    fontSize: 13, 
    fontFamily: "Poppins-SemiBold", 
    color: "#1a3a0d" 
  },
  deviceStatus: { 
    fontSize: 11, 
    fontFamily: "Poppins-Regular", 
    color: "#4a9a2e" 
  },
  birdBanner: {
    flexDirection: "row",
    backgroundColor: "rgba(180,220,100,0.35)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#b8dc88",
  },
  birdBannerLeft: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 6 
  },
  birdEmoji: { 
    fontSize: 20 
  },
  birdBannerText: { 
    fontSize: 13, 
    fontFamily: "Poppins-Regular", 
    color: "#1a3a0d" 
  },
  birdBannerTotal: { 
    fontSize: 13, 
    fontFamily: "Poppins-Regular", 
    color: "#1a3a0d" 
  },
  birdCount: { 
    fontFamily: "Poppins-Bold", 
    color: "#004E00" 
  },
  speciesRow: { 
    flexDirection: "row", 
    gap: 10 
  },
  speciesCard: {
    flex: 1,
    backgroundColor: "rgba(200,232,144,0.3)",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#b8dc88",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  speciesEmoji: { 
    fontSize: 28 
  },
  speciesCount: { 
    fontSize: 12, 
    fontFamily: "Poppins-SemiBold", 
    color: "#1a3a0d" 
  },
  speciesPct: { 
    fontSize: 11, 
    fontFamily: "Poppins-Regular", 
    color: "#e05a00" 
  },
  speciesSub: { 
    fontSize: 9, 
    fontFamily: "Poppins-Regular", 
    color: "#808080" 
  },
  logRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(200,232,144,0.3)",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#b8dc88",
  },
  logIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(180,220,100,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  logTime: { 
    fontSize: 11, 
    fontFamily: "Poppins-Regular", 
    color: "#808080" 
  },
  logLabel: { 
    fontSize: 13, 
    fontFamily: "Poppins-SemiBold", 
    color: "#1a3a0d" 
  },
  logAgo: { 
    fontSize: 10, 
    fontFamily: "Poppins-Regular", 
    color: "#808080", 
    marginTop: 2 
  },
});